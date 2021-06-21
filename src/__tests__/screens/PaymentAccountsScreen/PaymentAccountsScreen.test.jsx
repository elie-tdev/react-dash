import React from 'react';

import { PaymentAccountsScreen } from '@/screens';
import { render, cleanup } from '@/utils/custom-render';
import { MOCK_BANK_ACCOUNTS } from '@/fixtures/test_data';

jest.mock('@/customHooks/useBankAccounts', () => () => MOCK_BANK_ACCOUNTS);
describe('PaymentAccountsScreen Screen', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test('renders PaymentAccountsScreen screen', () => {
    const { container } = render(<PaymentAccountsScreen />);
    expect(container).toMatchSnapshot();
  });
});
