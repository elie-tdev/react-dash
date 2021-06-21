import React from 'react';

import LoanOverview from '@/screens/loanOverview/LoanOverview';
import { render, cleanup, fireEvent } from '@/utils/custom-render';
import {
  MOCK_DATA_USELOANSTATE_HOOK_PASTDUE,
  MOCK_DATA_ONETIMEPAYMENTS_HOOK,
  MOCK_BANK_ACCOUNTS,
  MOCK_DATA_LOAN_OVERVIEW,
  MOCK_DATA_LOAN_STATE_CURRENT,
  MOCK_DATA_USELOANSTATE_BILLED_HOOK,
} from '@/fixtures/test_data';
import { queries } from '@/gql';

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

jest.mock('@/customHooks/useLoanState', () => () => MOCK_DATA_USELOANSTATE_HOOK_PASTDUE);
jest.mock('@/customHooks/useOneTimePayments', () => () => MOCK_DATA_ONETIMEPAYMENTS_HOOK);
jest.mock('@/customHooks/useBankAccounts', () => () => MOCK_BANK_ACCOUNTS);

const loanOverviewQueryMock = {
  request: {
    query: queries.LoanOverview,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: MOCK_DATA_LOAN_OVERVIEW,
  },
};

const initializeUserMock = {
  request: {
    query: queries.InitializeUser,
    variables: {
      contact_id: '206048',
    },
  },
  result: {
    data: {
      Contacts_Get: {
        payload: {
          data: {
            Firstname1: 'RICK',
            Lastname1: 'SANCHEZ',
          },
        },
      },
      Contacts_GetLoans: {
        payload: {
          data: [
            {
              Loan_Type: 0,
              Acctrefno: '337720',
              Loan_Number: 'CP0478838',
              Current_Payoff_Balance: 32451.9277222252,
              Total_Current_Due_Balance: 471.11,
            },
          ],
        },
      },
    },
  },
};

describe('LoanOverview Screen', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders LoanOverview screen in a loading state', async () => {
    const { container } = render(<LoanOverview />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(container).toMatchSnapshot();

    expect(container.innerHTML).toContain('Loan Overview');
  });

  test('renders LoanOverview with a current user', async () => {
    jest.mock('@/customHooks', () => ({
      useLoanState: () => {
        return MOCK_DATA_LOAN_STATE_CURRENT;
      },
    }));
    const { container, findByText } = render(<LoanOverview />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Loan Overview')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  test('renders LoanOverview with a user who is past due', async () => {
    jest.mock('@/customHooks', () => ({
      ...jest.requireActual('@/customHooks'),
      useLoanState: () => {
        return MOCK_DATA_USELOANSTATE_HOOK_PASTDUE;
      },
    }));
    const { container, findByText } = render(<LoanOverview />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Loan Overview')).toBeVisible();
    expect(await findByText('Past Due')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  test('redirects to Balance screen when click on View Balance Details', async () => {
    jest.mock('react', setPaymentStatus => ({
      ...jest.requireActual('react'),
      useState: (paymentStatus = 'pending') => [paymentStatus, setPaymentStatus],
    }));

    const setIsSubmitPaymentOpen = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isSubmitPaymentOpen = true) => [
      isSubmitPaymentOpen,
      setIsSubmitPaymentOpen,
    ]);
    const { container, getAllByTestId } = render(<LoanOverview onClick={handleClick()} />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(10);
    fireEvent.click(await getAllByTestId(/SecondaryButton/i)[0]);
    expect(setIsSubmitPaymentOpen).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('redirects to Balance screen when click on View Details', async () => {
    jest.mock('react', setPaymentStatus => ({
      ...jest.requireActual('react'),
      useState: (paymentStatus = 'pending') => [paymentStatus, setPaymentStatus],
    }));

    const setIsSubmitPaymentOpen = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isSubmitPaymentOpen = true) => [
      isSubmitPaymentOpen,
      setIsSubmitPaymentOpen,
    ]);
    const { container, getAllByTestId } = render(<LoanOverview onClick={handleClick()} />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(10);
    fireEvent.click(await getAllByTestId(/SecondaryButton/i)[1]);
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/statements');
    expect(container).toMatchSnapshot();
  });

  test('redirects to Balance screen when click on Manage Payments', async () => {
    jest.mock('react', setPaymentStatus => ({
      ...jest.requireActual('react'),
      useState: (paymentStatus = 'pending') => [paymentStatus, setPaymentStatus],
    }));

    const setIsSubmitPaymentOpen = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isSubmitPaymentOpen = true) => [
      isSubmitPaymentOpen,
      setIsSubmitPaymentOpen,
    ]);
    const { container, getAllByTestId } = render(<LoanOverview onClick={handleClick()} />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(10);
    fireEvent.click(await getAllByTestId(/SecondaryButton/i)[2]);
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/payments');
    expect(container).toMatchSnapshot();
  });

  test('redirects to Balance screen when click on Balance Overview card', async () => {
    jest.mock('react', setPaymentStatus => ({
      ...jest.requireActual('react'),
      useState: (paymentStatus = 'pending') => [paymentStatus, setPaymentStatus],
    }));

    jest.mock('@/customHooks/useLoanState', () => () => MOCK_DATA_USELOANSTATE_BILLED_HOOK);

    const setIsSubmitPaymentOpen = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isSubmitPaymentOpen = true) => [
      isSubmitPaymentOpen,
      setIsSubmitPaymentOpen,
    ]);
    const { container, getAllByTestId } = render(<LoanOverview onClick={handleClick()} />, {
      mocks: [initializeUserMock, loanOverviewQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(10);
    fireEvent.click(await getAllByTestId(/SecondaryButton/i)[2]);
    await expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/payments');
    await expect(container).toMatchSnapshot();
  });
});
