import React from 'react';
import dateformat from 'dateformat';

import { BalanceScreen } from '@/screens';
import { render, cleanup, fireEvent } from '@/utils/custom-render';
import {
  payoffQueryErrorMock,
  loanQueryErrorMock,
  MOCK_DATA_LOAN_BALANCE,
  MOCK_DATA_PAYOFF_DETAILS,
  MOCK_DATA_LOAN_BALANCE_PASTDUE,
  MOCK_DATA_USELOANSTATE_HOOK,
  MOCK_DATA_ONETIMEPAYMENTS_HOOK,
  MOCK_BANK_ACCOUNTS,
} from '@/fixtures/test_data';
import { queries } from '@/gql';
import { formatLongDateString } from '@/properties';

jest.mock('@/customHooks/useLoanState', () => () => MOCK_DATA_USELOANSTATE_HOOK);
jest.mock('@/customHooks/useOneTimePayments', () => () => MOCK_DATA_ONETIMEPAYMENTS_HOOK);
jest.mock('@/customHooks/useBankAccounts', () => () => MOCK_BANK_ACCOUNTS);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const payoffDate = new Date();
payoffDate.setDate(payoffDate.getDate() + 10);
const pdate = dateformat(payoffDate, formatLongDateString);

const loanBalanceQueryMockCurrent = {
  request: {
    query: queries.Balance,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: MOCK_DATA_LOAN_BALANCE,
  },
};

const loanBalanceQueryMockPastDue = {
  request: {
    query: queries.Balance,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: MOCK_DATA_LOAN_BALANCE_PASTDUE,
  },
};

const payoffQueryMock = {
  request: {
    query: queries.payoffDetails,
    variables: {
      loan_id: '337720',
      payoffDate: pdate,
    },
  },
  result: {
    data: MOCK_DATA_PAYOFF_DETAILS,
  },
};

describe('Balance Screen', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders Balance screen', () => {
    const { container } = render(<BalanceScreen />);
    expect(container).toMatchSnapshot();
  });

  test('renders Past Due component if pastDueDays > 0', () => {
    const { container } = render(<BalanceScreen pastDueDays={1} />);
    expect(container).toMatchSnapshot();
  });

  test('renders for the data for Loan and payoff Query', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockCurrent, payoffQueryMock],
    });

    expect(await findByText('Principal')).toBeVisible();
    expect(await findByText('Interest')).toBeVisible();
  });

  test('renders for the data', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockCurrent, payoffQueryErrorMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Balance Detail')).toBeVisible();
    expect(await findByText('That loan could not be found')).toBeVisible();
  });

  test('renders for the data for Loan Query Error', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockCurrent, loanQueryErrorMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Balance Detail')).toBeVisible();
    expect(await findByText('That loan could not be found')).toBeVisible();
  });

  test('renders for the data for Loan and payoff Query for PastDue user', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockPastDue, payoffQueryMock],
    });

    expect(await findByText('Paid Off')).toBeVisible();
  });

  test('renders Payment screen on click of Manage Payments button', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockCurrent, payoffQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Paid Off')).toBeVisible();
    fireEvent.click(await findByText('Manage payments'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/payments');
  });

  test('renders Payment screen on click of Contact Us button', async () => {
    const { findByText } = render(<BalanceScreen />, {
      mocks: [loanBalanceQueryMockCurrent, payoffQueryMock],
    });

    fireEvent.click(await findByText('contact us'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/helpCenter');
  });
});
