import * as Apollo from '@apollo/client';

import { cleanup, render } from '@/utils/custom-render';
import { paymentHistoryQueryMockCurrent } from '@/fixtures/test_data';
import PaymentHistory from '@/screens/PaymentHistory';
import { queries } from '@/gql';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
}));

const MOCK_DATA_LOAN_STATE_CURRENT = {
  Loans_GetAutomatedPayments: {
    payload: {
      data: [
        {
          Row_Id: '576008',
          Payment_Type: 0,
          Status: 0,
          Billing_Type: 2,
        },
      ],
    },
  },
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 531.75,
        Last_Payment_Amount: 400.43,
        Last_Payment_Date: '2021-04-22T00:00:00',
      },
    },
  },
  Loans_GetSetup: {
    payload: {
      data: { Principal_Period: 'MO' },
    },
  },
  Loans_GetPaymentsDue: {
    payload: {
      data: [
        {
          Row_Id: '15551649',
          Transaction_Code: 124,
          Date_Due: '2021-04-30T00:00:00',
          Payment_Amount: 531.75,
        },
        {
          Row_Id: '15551650',
          Transaction_Code: 0,
          Date_Due: '2021-05-01T00:00:00',
          Payment_Amount: 531.75,
        },
      ],
    },
  },
  Loans_Get: {
    payload: {
      data: {
        Days_Past_Due: 0,
        Current_Payoff_Balance: 1087.6534129766,
        Total_Current_Due_Balance: 531.75,
        Total_Past_Due_Balance: 0,
        Original_Note_Amount: 11999,
      },
    },
  },
  Loans_GetDetail2: {
    payload: {
      data: {
        ACHCompanyID: '39',
      },
    },
  },
};

const MOCK_DATA_LOAN_STATE_PASTDUE = {
  Loans_GetAutomatedPayments: {
    payload: {
      data: [
        {
          Row_Id: '889923',
          Payment_Type: 0,
          Status: 0,
          Billing_Type: 2,
        },
      ],
    },
  },
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 849.6,
      },
    },
  },
  Loans_GetSetup: {
    payload: {
      data: {
        Principal_Period: 'MO',
      },
    },
  },
  Loans_GetPaymentsDue: {
    payload: {
      data: [
        {
          Row_Id: '14599106',
          Transaction_Code: 124,
          Date_Due: '2021-01-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '14599107',
          Transaction_Code: 0,
          Date_Due: '2021-01-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '14967325',
          Transaction_Code: 124,
          Date_Due: '2021-02-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '14967330',
          Transaction_Code: 0,
          Date_Due: '2021-02-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '15327823',
          Transaction_Code: 124,
          Date_Due: '2021-03-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '15327824',
          Transaction_Code: 0,
          Date_Due: '2021-03-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '15691309',
          Transaction_Code: 124,
          Date_Due: '2021-04-25T00:00:00',
          Payment_Amount: 849.6,
        },
        {
          Row_Id: '15691311',
          Transaction_Code: 0,
          Date_Due: '2021-04-25T00:00:00',
          Payment_Amount: 849.6,
        },
      ],
    },
  },
  Loans_Get: {
    payload: {
      data: {
        Days_Past_Due: 91,
        Current_Payoff_Balance: 27220.0795265757,
        Total_Current_Due_Balance: 3398.4,
        Total_Past_Due_Balance: 3398.4,
        Original_Note_Amount: 29372.02,
        Loan_Number: 'CP0311656',
      },
    },
  },
  Loans_GetDetail2: {
    payload: {
      data: {
        ACHCompanyID: '54',
      },
    },
  },
};

const loanStateQueryMock = {
  request: {
    query: queries.useLoanState,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    loading: false,
    data: MOCK_DATA_LOAN_STATE_CURRENT,
    error: false,
  },
};

const loanStateQueryMockPastDue = {
  request: {
    query: queries.useLoanState,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    loading: false,
    data: MOCK_DATA_LOAN_STATE_PASTDUE,
    error: false,
  },
};

const automatedAch = {
  rowId: '576008',
  billingPeriod: 'MO',
  amount: 266.81,
  scheduledDate: '2021-01-01T00:00:00',
  accountNumber: '785236985214',
  paymentType: 0,
  status: 0,
  billingType: 2,
  billingStartDate: '2015-01-01T00:00:00',
  billingNextDate: '2025-01-01T00:00:00',
};

const oneTimePayment = {
  request: {
    query: queries.GetAutomatedPaymentsByRowId,
    variables: {
      row_id: '576008',
    },
  },
  result: {
    data: automatedAch,
  },
};

const loanAch = {
  AutomatedPayments_Get: {
    payload: {
      data: {
        Row_Id: '1189607',
        Billing_Period: 'BW',
        Amount_Fixed: 471.11,
        Billing_Next_Date: '2021-04-16T00:00:00',
        Account_Number: '785236985214',
        Billing_Start_Date: '2020-11-27T00:00:00',
      },
    },
  },
};

describe('PaymentHistory Screen', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders PaymentHistory screen, isAutoPay, no extra one time payment', async () => {
    jest.spyOn(Apollo, 'useLazyQuery').mockImplementation(() => {
      return [
        jest.fn(),
        {
          data: loanAch,
          error: undefined,
          loading: false,
        },
      ];
    });
    const { container, getByText } = render(<PaymentHistory />, {
      mocks: [paymentHistoryQueryMockCurrent, loanStateQueryMock, oneTimePayment, oneTimePayment],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => setTimeout(resolve, 0));
    // expect(await getByText('$531.75')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders PaymentHistory screen, isAutoPay, pastdue payment', async () => {
    jest.spyOn(Apollo, 'useLazyQuery').mockImplementation(() => {
      return [
        jest.fn(),
        {
          data: loanAch,
          error: undefined,
          loading: false,
        },
      ];
    });

    const { container, getByText } = render(<PaymentHistory />, {
      mocks: [
        paymentHistoryQueryMockCurrent,
        loanStateQueryMockPastDue,
        oneTimePayment,
        oneTimePayment,
      ],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => setTimeout(resolve, 0));
    // expect(await getByText('$531.75')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
