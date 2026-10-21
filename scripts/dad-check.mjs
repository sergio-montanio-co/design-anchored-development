#!/usr/bin/env node
// DAD consistency check.
// Usage: node scripts/dad-check.mjs [--dad <dir>] [--tests <dir>]
//
// Checks:
//  1. invariants.yaml and policies.yaml match their JSON Schemas
//  2. IDs are unique
//  3. every error.graphql_type exists in schema.graphql and implements Error
//  4. every policy action is a real Query/Mutation field
//  5. every mutation result union only contains declared error types
//  6. every .graphql operation under contracts/operations validates against the schema
//  7. (with --tests) every INV-* and POL-* id appears in at least one test file
//  Warnings: error types in the schema that no rule references.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import {
  buildSchema, parse, validate, isObjectType, isUnionType,
} from 'graphql';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const dadDir = resolve(arg('--dad', 'dad'));
const testsDir = arg('--tests', null) && resolve(arg('--tests'));

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const walk = (dir, ext) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'node_modules' ? [] : walk(p, ext);
    return ext.some((e) => p.endsWith(e)) ? [p] : [];
  });
};

const loadYaml = (file) => {
  const p = join(dadDir, file);
  if (!existsSync(p)) { fail(`missing ${file}`); return []; }
  return YAML.parse(readFileSync(p, 'utf8')) ?? [];
};

// 1. JSON Schema validation
const ajv = new Ajv2020({ allErrors: true });
const schemaFor = (name) => JSON.parse(readFileSync(join(here, '..', 'schemas', name), 'utf8'));
const invariants = loadYaml('domain/invariants.yaml');
const policies = loadYaml('domain/policies.yaml');
for (const [file, data, schema] of [
  ['invariants.yaml', invariants, 'invariants.schema.json'],
  ['policies.yaml', policies, 'policies.schema.json'],
]) {
  const v = ajv.compile(schemaFor(schema));
  if (!v(data)) {
    for (const e of v.errors) fail(`${file}${e.instancePath}: ${e.message}`);
  }
}

// 2. Unique IDs
const rules = [...invariants, ...policies];
const seen = new Set();
for (const r of rules) {
  if (seen.has(r.id)) fail(`duplicate id ${r.id}`);
  seen.add(r.id);
}

// GraphQL schema
const schemaPath = join(dadDir, 'contracts/schema.graphql');
let schema = null;
if (!existsSync(schemaPath)) {
  fail('missing contracts/schema.graphql');
} else {
  try {
    schema = buildSchema(readFileSync(schemaPath, 'utf8'));
  } catch (e) {
    fail(`schema.graphql does not parse: ${e.message}`);
  }
}

if (schema) {
  const errorIface = schema.getType('Error');
  const errorTypes = errorIface
    ? schema.getPossibleTypes(errorIface).map((t) => t.name)
    : [];
  if (!errorIface) fail('schema.graphql must declare `interface Error`');

  // 3. Rule error types exist and implement Error
  const referenced = new Set();
  for (const r of rules) {
    const t = r.error?.graphql_type;
    if (!t) continue;
    referenced.add(t);
    if (!schema.getType(t)) fail(`${r.id}: error type ${t} is not in schema.graphql`);
    else if (!errorTypes.includes(t)) fail(`${r.id}: ${t} must implement Error`);
  }

  // 4. Policy actions are real root fields
  const roots = { query: schema.getQueryType(), mutation: schema.getMutationType() };
  for (const p of policies) {
    const [kind, field] = (p.action ?? '').split('.');
    if (!roots[kind]?.getFields()[field]) fail(`${p.id}: ${p.action} is not a field of the schema`);
  }

  // 5. Mutation result unions only contain entities or declared errors
  const mutation = roots.mutation;
  if (mutation) {
    for (const f of Object.values(mutation.getFields())) {
      let t = f.type;
      while (t.ofType) t = t.ofType;
      if (!isUnionType(t)) {
        fail(`mutation ${f.name} must return a result union (see rules.md)`);
        continue;
      }
      for (const m of t.getTypes()) {
        const isErr = m.getInterfaces().some((i) => i.name === 'Error');
        if (isErr && !referenced.has(m.name) && m.name !== 'NotAuthorized') {
          fail(`mutation ${f.name} returns ${m.name}, but no invariant or policy declares it`);
        }
      }
    }
  }

  // Warning: error types nobody references
  for (const t of errorTypes) {
    if (!referenced.has(t)) warn(`error type ${t} is not referenced by any invariant or policy`);
  }

  // 6. Operations validate against the schema
  for (const file of walk(join(dadDir, 'contracts/operations'), ['.graphql', '.gql'])) {
    try {
      const errs = validate(schema, parse(readFileSync(file, 'utf8')));
      for (const e of errs) fail(`${relative(dadDir, file)}: ${e.message}`);
    } catch (e) {
      fail(`${relative(dadDir, file)}: ${e.message}`);
    }
  }
}

// 7. Every rule has a test
if (testsDir) {
  const corpus = walk(testsDir, ['.ts', '.js', '.mjs', '.tsx', '.py', '.go', '.kt', '.swift', '.dart'])
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n');
  for (const r of rules) {
    if (r.id && !corpus.includes(r.id)) fail(`${r.id} has no test in ${relative(process.cwd(), testsDir)}`);
  }
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`error ${e}`);
console.log(
  `\nDAD check: ${invariants.length} invariants, ${policies.length} policies, ` +
  `${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
