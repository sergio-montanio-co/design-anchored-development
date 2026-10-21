// Phase 5 · one test per rule ID.
// These start as todos generated from invariants.yaml and policies.yaml;
// the backend is implemented until each one is a passing test.
import { describe, it } from 'vitest';

describe('Invariants', () => {
  it.todo('INV-LOAN-001: rejects a principal outside 1,000.00 to 200,000.00 MXN');
  it.todo('INV-LOAN-002: rejects a payment while the loan is not disbursed');
  it.todo('INV-LOAN-003: rejects liquidation with pending balance');
  it.todo('INV-LOAN-004: rejects transitions outside the state machine');
  it.todo('INV-LOAN-005: rejects a rejection without a reason');
  it.todo('INV-PAYMENT-001: rejects a payment above the pending balance');
});

describe('Policies', () => {
  it.todo('POL-LOAN-001: only borrowers can request a loan');
  it.todo('POL-LOAN-002: only ops analysts and managers can approve');
  it.todo('POL-LOAN-003: only ops analysts and managers can reject');
  it.todo('POL-LOAN-004: only ops managers can disburse');
  it.todo('POL-LOAN-005: borrowers only see their own loans');
  it.todo('POL-LOAN-006: borrowers can only liquidate their own loans');
  it.todo('POL-PAYMENT-001: borrowers can only pay their own loans');
});
