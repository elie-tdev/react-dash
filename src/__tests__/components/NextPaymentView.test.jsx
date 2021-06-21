import React from 'react';

import { render, cleanup } from '@/utils/custom-render';
import { NextPaymentView } from '@/components/PaymentView';
import {
  MOCK_DATA_USELOANSTATE_HOOK_NEXT_PAYMENT,
  MOCK_DATA_ONETIMEPAYMENTS_HOOK,
  MOCK_DATA_NEXT_PAYMENT_HISTORY,
  MOCK_BANK_ACCOUNTS,
} from '@/fixtures/test_data';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '555901',
  }),
  useLocation: () => {
    return {
      hash: '',
      pathname: '/dashboard/loans/555901/balance',
      state: undefined,
    };
  },
}));

jest.mock('@/customHooks/useLoanState', () => () => MOCK_DATA_USELOANSTATE_HOOK_NEXT_PAYMENT);
jest.mock('@/customHooks/useOneTimePayments', () => () => MOCK_DATA_ONETIMEPAYMENTS_HOOK);
jest.mock('@/customHooks/useBankAccounts', () => () => MOCK_BANK_ACCOUNTS);

describe('NextPaymentView Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders NextPaymentView ', async () => {
    const { container } = render(
      <NextPaymentView
        loanNumberProp={{ loanNumber: '555901' }}
        loanDataNextPayment={MOCK_DATA_NEXT_PAYMENT_HISTORY}
        isPaymentHistory={true}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container).toMatchSnapshot();
  });

  test('check for Payment Amount on NextPaymentView', async () => {
    const { findAllByText } = render(
      <NextPaymentView
        loanNumberProp={{ loanNumber: '555901' }}
        loanDataNextPayment={MOCK_DATA_NEXT_PAYMENT_HISTORY}
        isPaymentHistory={true}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findAllByText('Payment Amount')).toHaveLength(6);
  });
});
