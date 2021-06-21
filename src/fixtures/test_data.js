import dateformat from 'dateformat';

import { queries } from '@/gql';
import { formatLongDateString } from '@/properties';

const payoffDate = new Date();
payoffDate.setDate(payoffDate.getDate() + 10);
const pdate = dateformat(payoffDate, formatLongDateString);

const LOANS_GET = {
  Loans_Get: {
    payload: {
      data: {
        Acctrefno: '367713',
        Current_Fees_Balance: 0,
        Current_Interest_Balance: 202.3377222252,
        Current_Interest_Rate: 22.9,
        Current_Late_Charge_Balance: 22.9,
        Current_Payoff_Balance: 32451.9277222252,
        Current_Principal_Balance: 32249.59,
        Days_Past_Due: 23.9,
        Loan_Number: 'CP0478838',
        Open_Date: '2020-11-18T00:00:00',
        Open_Maturity_Date: '2025-02-28T00:00:00',
        Original_Note_Amount: 33802.23,
        Total_Current_Due_Balance: 471.11,
        Total_Past_Due_Balance: 0,
      },
    },
  },
};

const LOANS_GET_PAYMENT_INFO = {
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 471.11,
        Current_Principal_Payment_Date: '2021-04-30T00:00:00',
        Last_Payment_Amount: 471.11,
        Next_Payment_Total_Amount: 472.12,
        Last_Payment_Date: '2021-04-14T00:00:00',
        Next_Principal_Payment_Date: '2021-05-14T00:00:00',
        Total_Payments: 114,
      },
    },
  },
};

const Loans_GETSETUP = {
  Loans_GetSetup: {
    payload: {
      data: {
        Principal_Period: 'BW',
      },
    },
  },
};

const LOANS_GETAUTOMATEDPAYMENTS = {
  Loans_GetAutomatedPayments: {
    payload: {
      data: [
        {
          Billing_Type: 2,
          Payment_Type: 0,
          Row_Id: '1189594',
          Status: 0,
        },
        {
          Billing_Type: 1,
          Payment_Type: 0,
          Row_Id: '1190005',
          Status: 0,
        },
        {
          Billing_Type: 1,
          Payment_Type: 0,
          Row_Id: '1190006',
          Status: 0,
        },
        {
          Billing_Type: 1,
          Payment_Type: 0,
          Row_Id: '1190007',
          Status: 0,
        },
        {
          Billing_Type: 1,
          Payment_Type: 0,
          Row_Id: '1190009',
          Status: 0,
        },
      ],
    },
  },
};

const LOANS_GETPAYMENTSDUE = {
  Loans_GetPaymentsDue: {
    paylaod: {
      data: [
        {
          Date_Due: '2021-04-16T00:00:00',
          Payment_Amount: 225.06,
          Row_Id: '15595643',
          Transaction_Code: 124,
        },
        {
          Date_Due: '2021-04-16T00:00:00',
          Payment_Amount: 225.06,
          Row_Id: '15595645',
          Transaction_Code: 0,
        },
      ],
    },
  },
};

export const MOCK_DATA_LOAN = {
  ...LOANS_GET,
  ...LOANS_GET_PAYMENT_INFO,
};

export const MOCK_DATA_PAYOFF_DETAILS = {
  Loans_GetPayoffDetails: {
    payload: {
      data: {
        Payoount: 36683.89,
      },
    },
  },
};

export const MOCK_DATA_LOAN_OVERVIEW = {
  Loans_Get: {
    payload: {
      data: {
        Acctrefno: '337720',
        Loan_Number: 'CP0478838',
        Current_Payoff_Balance: 32451.9277222252,
        Original_Note_Amount: 33802.23,
        Total_Current_Due_Balance: 471.11,
        Total_Past_Due_Balance: 0,
        Days_Past_Due: 0,
        Current_Principal_Balance: 32249.59,
        Current_Interest_Balance: 202.3377222252,
        Current_Interest_Rate: 22.9,
        Current_Late_Charge_Balance: 0,
        Current_Fees_Balance: 0,
      },
    },
  },
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 471.11,
        Current_Principal_Payment_Date: '2021-03-19T00:00:00',
        Next_Principal_Payment_Date: '2021-04-02T00:00:00',
      },
    },
  },
};

export const MOCK_DATA_LOAN_BALANCE = {
  ...LOANS_GET,
  ...LOANS_GET_PAYMENT_INFO,
  Loans_GetSetup: {
    payload: {
      data: {
        Principal_Period: 'BW',
      },
    },
  },
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const days2FromNow = new Date(today);
days2FromNow.setDate(days2FromNow.getDate() + 2);

const days5FromNow = new Date(today);
days5FromNow.setDate(days2FromNow.getDate() + 5);

const days7FromNow = new Date(today);
days7FromNow.setDate(days7FromNow.getDate() + 7);

const days9FromNow = new Date(today);
days9FromNow.setDate(days9FromNow.getDate() + 9);

const days12FromNow = new Date(today);
days12FromNow.setDate(days12FromNow.getDate() + 12);

export const MOCK_DATA_LOAN_STATE_CURRENT = {
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
        Last_Payment_Date: tomorrow.toISOString(),
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
          Date_Due: tomorrow.toISOString(),
          Payment_Amount: 531.75,
        },
        {
          Row_Id: '15551650',
          Transaction_Code: 0,
          Date_Due: tomorrow.toISOString(),
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

export const MOCK_DATA_LOAN_BALANCE_PASTDUE = {
  Loans_Get: {
    payload: {
      data: {
        Acctrefno: '555915',
        Current_Fees_Balance: 99.5,
        Current_Interest_Balance: 2648.3787849692,
        Current_Interest_Rate: 22.9,
        Current_Late_Charge_Balance: 20.1,
        Current_Payoff_Balance: 36450.6087849692,
        Current_Principal_Balance: 33802.23,
        Days_Past_Due: 115,
        Loan_Number: 'CP0478838',
        Open_Date: '2020-11-18T00:00:00',
        Open_Maturity_Date: '2025-03-28T00:00:00',
        Original_Note_Amount: 33802.23,
        Total_Current_Due_Balance: 4711.1,
        Total_Past_Due_Balance: 4239.99,
      },
    },
  },
  ...LOANS_GET_PAYMENT_INFO,
  ...Loans_GETSETUP,
};

export const MOCK_DATA_LOAN_STATE_PASTDUE = {
  Loans_Get: {
    payload: {
      data: {
        Days_Past_Due: 115,
      },
    },
  },
  Loans_GetAutomatedPayments: {
    payload: {
      data: [
        {
          Billing_Type: 2,
          Payment_Type: 0,
          Row_Id: '1189607',
          Status: 0,
        },
      ],
    },
  },
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 471.11,
      },
    },
  },
  Loans_GetPaymentsDue: {
    payload: {
      data: [
        {
          Row_Id: '14006181',
          Transaction_Code: 124,
        },
        {
          Row_Id: '14006182',
          Transaction_Code: 0,
        },
        {
          Row_Id: '14048524',
          Transaction_Code: 124,
        },
        {
          Row_Id: '14048525',
          Transaction_Code: 0,
        },
      ],
    },
  },
  Loans_GetSetup: {
    payload: {
      data: {
        Principal_Period: 'BW',
      },
    },
  },
};

export const initializeUserMock = {
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

export const MOCK_DATA_LOAN_PAYMENT_HISTORY = {
  Loans_GetPaymentHistory: {
    payload: {
      data: [
        {
          Acctrefno: '337720',
          Row_Id: '10354280',
          Payment_Reference_No: 0,
          Transaction_Reference_No: 0,
          Date_Paid: days12FromNow.toISOString(),
          Payment_Amount: 650,
          Payment_Type: 'ZZ',
          Late_Fee_Code: 0,
          Nsf_Flag: false,
          Nsf_Date: null,
          Payment_Description: 'P+I Principal Payment',
          Account_Number: 'CHECKING (****5214)',
        },
        {
          Acctrefno: '337720',
          Row_Id: '10354281',
          Payment_Reference_No: 0,
          Transaction_Reference_No: 0,
          Date_Paid: '2019-05-22T00:00:00',
          Payment_Amount: 291.34,
          Payment_Type: 'I',
          Late_Fee_Code: 0,
          Nsf_Flag: false,
          Nsf_Date: null,
          Payment_Description: 'P+I Interest Payment',
          Account_Number: 'CHECKING (****5214)',
        },
        {
          Acctrefno: '337720',
          Row_Id: '10354282',
          Payment_Reference_No: 0,
          Transaction_Reference_No: 0,
          Date_Paid: '2019-05-22T00:00:00',
          Payment_Amount: 358.66,
          Payment_Type: 'P',
          Late_Fee_Code: 0,
          Nsf_Flag: false,
          Nsf_Date: null,
          Payment_Description: 'P+I Principal Payment',
          Account_Number: 'CHECKING (****5214)',
        },
      ],
    },
  },
};

export const loanStateQueryMock = {
  request: {
    query: queries.useLoanState,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    loading: false,
    data: MOCK_DATA_LOAN_STATE_CURRENT,
    error: undefined,
  },
};

export const loanStateQueryPastDueUserMock = {
  request: {
    query: queries.useLoanState,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: MOCK_DATA_LOAN_STATE_PASTDUE,
  },
};

export const loanOverviewQueryMock = {
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

export const payoffQueryMock = {
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

export const loanBalanceQueryMockCurrent = {
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
export const paymentHistoryQueryMockCurrent = {
  request: {
    query: queries.PaymentHistory,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: { ...MOCK_DATA_LOAN_BALANCE, ...MOCK_DATA_LOAN_PAYMENT_HISTORY },
  },
};

export const payoffQueryErrorMock = {
  request: {
    query: queries.payoffDetails,
    variables: {
      loan_id: '337720',
      payoffDate: pdate,
    },
  },
  error: new Error('Ohh Ohh!'),
};

export const loanQueryErrorMock = {
  request: {
    query: queries.Balance,
    variables: {
      loan_id: '337720',
    },
  },
  error: new Error('Ohh Ohh!'),
};

export const MOCK_DATA_STATEMENTS = {
  Loans_GetStatements: {
    payload: {
      data: [
        {
          Statement_Row_Id: 2105799,
          Statement_Date: '2018-07-22T00:00:00',
          Statement_Due_Date: '2018-08-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 20297.2,
        },
        {
          Statement_Row_Id: 2213422,
          Statement_Date: '2018-08-22T00:00:00',
          Statement_Due_Date: '2018-09-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 19818.09,
        },
        {
          Statement_Row_Id: 2320675,
          Statement_Date: '2018-09-21T00:00:00',
          Statement_Due_Date: '2018-10-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 19329.34,
        },
        {
          Statement_Row_Id: 2435395,
          Statement_Date: '2018-10-22T00:00:00',
          Statement_Due_Date: '2018-11-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 18842.35,
        },
        {
          Statement_Row_Id: 2551636,
          Statement_Date: '2018-11-21T00:00:00',
          Statement_Due_Date: '2018-12-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 18346.95,
        },
        {
          Statement_Row_Id: 2671246,
          Statement_Date: '2018-12-22T00:00:00',
          Statement_Due_Date: '2019-01-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 17852.0,
        },
        {
          Statement_Row_Id: 2797969,
          Statement_Date: '2019-01-22T00:00:00',
          Statement_Due_Date: '2019-02-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 17352.6,
        },
        {
          Statement_Row_Id: 2926266,
          Statement_Date: '2019-02-19T00:00:00',
          Statement_Due_Date: '2019-03-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 16834.88,
        },
        {
          Statement_Row_Id: 3059805,
          Statement_Date: '2019-03-22T00:00:00',
          Statement_Due_Date: '2019-04-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 16325.71,
        },
        {
          Statement_Row_Id: 3197229,
          Statement_Date: '2019-04-21T00:00:00',
          Statement_Due_Date: '2019-05-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 15807.01,
        },
        {
          Statement_Row_Id: 3354003,
          Statement_Date: '2019-05-22T00:00:00',
          Statement_Due_Date: '2019-06-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 15289.49,
        },
        {
          Statement_Row_Id: 3500886,
          Statement_Date: '2019-06-21T00:00:00',
          Statement_Due_Date: '2019-07-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 14764.84,
        },
        {
          Statement_Row_Id: 3655348,
          Statement_Date: '2019-07-22T00:00:00',
          Statement_Due_Date: '2019-08-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 14238.45194,
        },
        {
          Statement_Row_Id: 3815417,
          Statement_Date: '2019-08-22T00:00:00',
          Statement_Due_Date: '2019-09-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 13706.92,
        },
        {
          Statement_Row_Id: 3988217,
          Statement_Date: '2019-09-21T00:00:00',
          Statement_Due_Date: '2019-10-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 13166.38,
        },
        {
          Statement_Row_Id: 4159468,
          Statement_Date: '2019-10-22T00:00:00',
          Statement_Due_Date: '2019-11-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 12625.62,
        },
        {
          Statement_Row_Id: 4329550,
          Statement_Date: '2019-11-21T00:00:00',
          Statement_Due_Date: '2019-12-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 12075.08,
        },
        {
          Statement_Row_Id: 4503378,
          Statement_Date: '2019-12-22T00:00:00',
          Statement_Due_Date: '2020-01-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 11522.71,
        },
        {
          Statement_Row_Id: 4686119,
          Statement_Date: '2020-01-22T00:00:00',
          Statement_Due_Date: '2020-02-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 10967.7,
        },
        {
          Statement_Row_Id: 4865987,
          Statement_Date: '2020-02-20T00:00:00',
          Statement_Due_Date: '2020-03-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 10402.58,
        },
        {
          Statement_Row_Id: 5050296,
          Statement_Date: '2020-03-22T00:00:00',
          Statement_Due_Date: '2020-04-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 9837.2,
        },
        {
          Statement_Row_Id: 5238587,
          Statement_Date: '2020-04-21T00:00:00',
          Statement_Due_Date: '2020-05-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 9263.52,
        },
        {
          Statement_Row_Id: 5421609,
          Statement_Date: '2020-05-22T00:00:00',
          Statement_Due_Date: '2020-06-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 8687.25,
        },
        {
          Statement_Row_Id: 5605767,
          Statement_Date: '2020-06-21T00:00:00',
          Statement_Due_Date: '2020-07-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 8103.15,
        },
        {
          Statement_Row_Id: 5796635,
          Statement_Date: '2020-07-22T00:00:00',
          Statement_Due_Date: '2020-08-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 7518.63,
        },
        {
          Statement_Row_Id: 5980680,
          Statement_Date: '2020-08-22T00:00:00',
          Statement_Due_Date: '2020-09-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 6929.53,
        },
        {
          Statement_Row_Id: 6164834,
          Statement_Date: '2020-09-21T00:00:00',
          Statement_Due_Date: '2020-10-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 6333.2,
        },
        {
          Statement_Row_Id: 6351561,
          Statement_Date: '2020-10-22T00:00:00',
          Statement_Due_Date: '2020-11-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 5733.27,
        },
        {
          Statement_Row_Id: 6532614,
          Statement_Date: '2020-11-21T00:00:00',
          Statement_Due_Date: '2020-12-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 5127.37,
        },
      ],
    },
  },
};

export const MOCK_DATA_STATEMENT_CURRENT = {
  Loans_GetStatements: {
    payload: {
      data: [
        {
          Statement_Row_Id: 6532614,
          Statement_Date: '2020-11-21T00:00:00',
          Statement_Due_Date: '2020-12-09T00:00:00',
          Current_Rate: 10.24,
          Total_Past_Due_Balance: 0.0,
          Total_Current_Due_Balance: 652.46,
          Current_Payoff_Balance: 5127.37,
        },
      ],
    },
  },
};

export const MOCK_DATA_STATEMENT = {
  Statement_Row_Id: 2105799,
  Statement_Date: '2018-07-22T00:00:00',
  Statement_Due_Date: '2018-08-09T00:00:00',
  Current_Rate: 10.24,
  Total_Past_Due_Balance: 0.0,
  Total_Current_Due_Balance: 652.46,
  Current_Payoff_Balance: 20297.2,
};

export const MOCK_BANK_ACCOUNTS = {
  Contacts_Get: {
    payload: {
      data: {
        Cifnumber: 'BORROWER-0207795',
      },
    },
  },
  Contacts_GetFinancials: {
    payload: {
      data: {
        BankAccounts:
          "{'bankAccounts':[{'routingNumber':'12341234','accountNumber':'123412341234','accountType':'Checking','isPrimary':true}]}",
      },
    },
  },
};

export const MOCK_DATA_CHANGE_ADDRESS = {
  Contacts_Get: {
    payload: {
      data: {
        Cifno: '412981',
        Cifnumber: 'BORROWER-0557659',
        City: 'INWOOD',
        State: 'VT',
        Street_Address1: '107 COMMERCE ST',
        Street_Address2: '180 SMOKE TREE AVENUE',
        Zip: '32703-9360',
      },
    },
  },
};

export const MOCK_DATA_NEXT_PAYMENT_HISTORY = {
  Loans_GetPaymentInfo: {
    payload: {
      data: {
        Amortized_Payment_Amount: 225.06,
        Current_Principal_Payment_Date: '2021-04-30T00:00:00',
        Next_Principal_Payment_Date: days2FromNow.toISOString(),
      },
    },
  },
  Loans_GetPaymentHistory: {
    payload: {
      data: [
        {
          Row_Id: '20478626',
          Payment_Reference_No: 0,
          Date_Paid: '2020-11-18T00:00:00',
          Payment_Amount: 424,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20478627',
          Payment_Reference_No: 0,
          Date_Paid: '2020-11-18T00:00:00',
          Payment_Amount: 424,
          Payment_Type: 'I',
          Payment_Description: 'Interest Reduction',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20628888',
          Payment_Reference_No: 19612326,
          Date_Paid: '2020-11-27T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20628892',
          Payment_Reference_No: 19612326,
          Date_Paid: '2020-11-27T00:00:00',
          Payment_Amount: 90.11,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20628895',
          Payment_Reference_No: 19612326,
          Date_Paid: '2020-11-27T00:00:00',
          Payment_Amount: 134.95,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20843967',
          Payment_Reference_No: 19672869,
          Date_Paid: '2020-12-11T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20843968',
          Payment_Reference_No: 19672869,
          Date_Paid: '2020-12-11T00:00:00',
          Payment_Amount: 138.99,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '20843972',
          Payment_Reference_No: 19672869,
          Date_Paid: '2020-12-11T00:00:00',
          Payment_Amount: 86.07,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21006969',
          Payment_Reference_No: 19884981,
          Date_Paid: '2020-12-25T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21006970',
          Payment_Reference_No: 19884981,
          Date_Paid: '2020-12-25T00:00:00',
          Payment_Amount: 138.24,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21006976',
          Payment_Reference_No: 19884981,
          Date_Paid: '2020-12-25T00:00:00',
          Payment_Amount: 86.82,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21149840',
          Payment_Reference_No: 20052045,
          Date_Paid: '2021-01-08T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21149843',
          Payment_Reference_No: 20052045,
          Date_Paid: '2021-01-08T00:00:00',
          Payment_Amount: 137.66,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21149844',
          Payment_Reference_No: 20052045,
          Date_Paid: '2021-01-08T00:00:00',
          Payment_Amount: 87.4,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21303810',
          Payment_Reference_No: 20215681,
          Date_Paid: '2021-01-22T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21303811',
          Payment_Reference_No: 20215681,
          Date_Paid: '2021-01-22T00:00:00',
          Payment_Amount: 137.09,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21303814',
          Payment_Reference_No: 20215681,
          Date_Paid: '2021-01-22T00:00:00',
          Payment_Amount: 87.97,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21452739',
          Payment_Reference_No: 20372629,
          Date_Paid: '2021-02-05T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21452740',
          Payment_Reference_No: 20372629,
          Date_Paid: '2021-02-05T00:00:00',
          Payment_Amount: 136.31,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21452743',
          Payment_Reference_No: 20372629,
          Date_Paid: '2021-02-05T00:00:00',
          Payment_Amount: 88.75,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21592929',
          Payment_Reference_No: 20529161,
          Date_Paid: '2021-02-19T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21592930',
          Payment_Reference_No: 20529161,
          Date_Paid: '2021-02-19T00:00:00',
          Payment_Amount: 135.53,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21592934',
          Payment_Reference_No: 20529161,
          Date_Paid: '2021-02-19T00:00:00',
          Payment_Amount: 89.53,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21776151',
          Payment_Reference_No: 20703825,
          Date_Paid: '2021-03-05T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21776152',
          Payment_Reference_No: 20703825,
          Date_Paid: '2021-03-05T00:00:00',
          Payment_Amount: 134.75,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21776154',
          Payment_Reference_No: 20703825,
          Date_Paid: '2021-03-05T00:00:00',
          Payment_Amount: 90.31,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21908152',
          Payment_Reference_No: 20889269,
          Date_Paid: '2021-03-19T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21908153',
          Payment_Reference_No: 20889269,
          Date_Paid: '2021-03-19T00:00:00',
          Payment_Amount: 133.95,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '21908156',
          Payment_Reference_No: 20889269,
          Date_Paid: '2021-03-19T00:00:00',
          Payment_Amount: 91.11,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '22059370',
          Payment_Reference_No: 21059916,
          Date_Paid: '2021-04-02T00:00:00',
          Payment_Amount: 225.06,
          Payment_Type: 'ZZ',
          Payment_Description: 'PAYMENT',
          Nsf_Flag: false,
        },
        {
          Row_Id: '22059372',
          Payment_Reference_No: 21059916,
          Date_Paid: '2021-04-02T00:00:00',
          Payment_Amount: 133.16,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Interest Payment',
          Nsf_Flag: false,
        },
        {
          Row_Id: '22059375',
          Payment_Reference_No: 21059916,
          Date_Paid: '2021-04-02T00:00:00',
          Payment_Amount: 91.9,
          Payment_Type: 'PI',
          Payment_Description: 'P+I Principal Payment',
          Nsf_Flag: false,
        },
      ],
    },
  },
};

export const MOCK_DATA_STATEMENT_FILE = {
  LoanStatements_GetFile: {
    payload: {
      data: {
        File:
          'JVBERi0xLjMKJbe+raoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgNCAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovUHJvZHVjZXIgKEhhcnVcMDQwRnJlZVwwNDBQREZcMDQwTGlicmFyeVwwNDAyLjEuMCkKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgNSAwIFIgXQovQ291bnQgMQovUGFyZW50IDIgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL0NvbnRlbnRzIDYgMCBSCi9SZXNvdXJjZXMgPDwKL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KL1hPYmplY3QgPDwKL1gxIDggMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKL0YyIDExIDAgUgo+Pgo+PgovUGFyZW50IDQgMCBSCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9MZW5ndGggNyAwIFIKPj4Kc3RyZWFtDQowIDAgMCByZwoxIDEgMSByZwowIDAgMCBSRwpxCjU0IDAgMCAxOCAzMDkuNjAwMDEgNzU0Ljc5OTk5IGNtCi9YMSBEbwpRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDE0IFRmCkJUCjIwLjAzNCBUTAozMDkuNjAwMDEgNzgxLjI2Mzk4IFRkCjE1NC4yNDE5NyAwIFRkCihQYXltZW50XDA0ME5vdGljZSkgJwotMTU0LjI0MTk3IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo1Ny42IDc4Mi45MTYwMiBUZAooRlJFRURPTVwwNDBQTFVTKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNTcuNiA3NzAuOTE2MDIgVGQKKFBPXDA0MEJPWFwwNDAyMzQwKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNTcuNiA3NTguOTE2MDIgVGQKKFBIT0VOSVhcMDQwQVpcMDQwODUwMDItMjM0MCkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjU3LjYgNzQ2LjkxNjAyIFRkCig4MDAyOTc1ODc5KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNTcuNiA2MzguOTE2MDIgVGQKKEpBU09OXDA0MEJVQ0tMRVkpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo1Ny42IDYyNi45MTYwMiBUZAooNDUxMVwwNDBTSURFUkVBTFwwNDBEUklWRSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjU3LjYgNjE0LjkxNjAyIFRkCihBVVNUSU5cMDQwVFhcMDQwXDA0MDc4NzI3XDA0MFVOSVRFRFwwNDBTVEFURVMpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozOTYgNzYwLjM4Mzk3IFRkCihTdGF0ZW1lbnRcMDQwRGF0ZTopICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo0OTYuNzk5OTkgNzU5LjkxNjAyIFRkCjI2Ljk4MiAwIFRkCigwOFwwNTcxMlwwNTcyMDE5KSAnCi0yNi45ODIgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKMTIuODc5IFRMCjM5NiA3NDkuMzgzOTcgVGQKKER1ZVwwNDBEYXRlOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjQ5Ni43OTk5OSA3NDguOTE2MDIgVGQKMjYuOTgyIDAgVGQKKDA4XDA1NzMwXDA1NzIwMTkpICcKLTI2Ljk4MiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzk2IDczOC4zODM5NyBUZAooQWNjb3VudFwwNDBOdW1iZXI6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNDc1LjIwMDAxIDczNy45MTYwMiBUZAozMi41ODg5NyAwIFRkCihBUFAtMDUwMzI0MzcpICcKLTMyLjU4ODk3IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozOTYgNzI3LjM4Mzk3IFRkCihOYW1lOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjQzMiA3MjYuOTE2MDIgVGQKNjIuMzUxOTkgMCBUZAooSkFTT05cMDQwQlVDS0xFWSkgJwotNjIuMzUxOTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKMTIuODc5IFRMCjM5NiA3MTYuMzgzOTcgVGQKKE1hdHVyaXR5XDA0MERhdGU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNDk2Ljc5OTk5IDcxNS45MTYwMiBUZAoyNi45ODIgMCBUZAooMDdcMDU3MzBcMDU3MjAyMykgJwotMjYuOTgyIDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozOTYgNzA1LjM4Mzk3IFRkCihDdXJyZW50XDA0MFJhdGU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNDk2Ljc5OTk5IDcwNC45MTYwMiBUZAo0MS40OSAwIFRkCigyNi40OVwwNDUpICcKLTQxLjQ5IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozOTYgNjk0LjM4Mzk3IFRkCihDdXJyZW50XDA0MFByaW5jaXBhbDopICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo0OTYuNzk5OTkgNjkzLjkxNjAyIFRkCjMxLjk4NiAwIFRkCigyOSw5OTkuMDApICcKLTMxLjk4NiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzk2IDY4My4zODM5NyBUZAooQ3VycmVudFwwNDBJbnRlcmVzdDopICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo0OTYuNzk5OTkgNjgyLjkxNjAyIFRkCjQ0LjQ4NyAwIFRkCig0NzguOTgpICcKLTQ0LjQ4NyAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzk2IDY3Mi4zODM5NyBUZAooQ3VycmVudFwwNDBJbXBvdW5kOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjQ5Ni43OTk5OSA2NzEuOTE2MDIgVGQKNTQuNDk1IDAgVGQKKDAuMDApICcKLTU0LjQ5NSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzk2IDY2MS4zODM5NyBUZAooVG90YWxcMDQwUGFzdFwwNDBEdWU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNDk2Ljc5OTk5IDY2MC45MTYwMiBUZAo1NC40OTUgMCBUZAooMC4wMCkgJwotNTQuNDk1IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozOTYgNjUwLjM4Mzk3IFRkCihUb3RhbFwwNDBDdXJyZW50XDA0MER1ZTopICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAo0OTYuNzk5OTkgNjQ5LjkxNjAyIFRkCjM2Ljk5IDAgVGQKKDEsMDE5Ljc3KSAnCi0zNi45OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCkVUClEKcQowLjUwMTk2IDAuNTAxOTYgMC41MDE5NiBSRwowLjUgdwoyMS42IDU0MC43NSBtCjU5MC40MDAwMiA1NDAuNzUgbApCClEKcQowLjkwOTggMSAwLjkwOTggcmcKMC41IHcKMzYgNTI4LjA0OTk5IDU0MCAtMjMuMjUgcmUKQgpRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjQzLjIgNTQyLjAwOCBUZAooVHJhbnNhY3Rpb25zOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjQzLjIgNTMwLjAwOCBUZAoxNC4zMTYgMCBUZAooVHJhbnMpICcKLTE0LjMxNiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKNDMuMiA1MTguMDA4IFRkCjE2LjUzMiAwIFRkCihEYXRlKSAnCi0xNi41MzIgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjE0NCA1MzAuMDA4IFRkCjE5LjQ5NiAwIFRkCihUcmFuc2FjdGlvbikgJwotMTkuNDk2IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAoxNDQgNTE4LjAwOCBUZAozNC42MDggMCBUZAooQW1vdW50KSAnCi0zNC42MDggMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjIxNiA1MTguMDA4IFRkCihEZXNjcmlwdGlvbikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjMwOS42MDAwMSA1MTguMDA4IFRkCjMxLjA1NTk5IDAgVGQKKFByaW5jaXBhbCkgJwotMzEuMDU1OTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjM3NC4zOTk5OSA1MTguMDA4IFRkCjM1LjkyMDAyIDAgVGQKKEludGVyZXN0KSAnCi0zNS45MjAwMiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKNDM5LjIwMDAxIDUxOC4wMDggVGQKNDMuNDc5OTkgMCBUZAooT3RoZXIpICcKLTQzLjQ3OTk5IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAo1MDQgNTMwLjAwOCBUZAozMS4wNTU5OSAwIFRkCihQcmluY2lwYWwpICcKLTMxLjA1NTk5IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAo1MDQgNTE4LjAwOCBUZAozNC4xMzU5OSAwIFRkCihCYWxhbmNlKSAnCi0zNC4xMzU5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVAoxMC45MDQgVEwKNDMuMiA1MDUuNTkyMDEgVGQKNS4xOTIgMCBUZAooMDdcMDU3MjBcMDU3MjAxOSkgJwotNS4xOTIgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA4IFRmCkJUCjEwLjkwNCBUTAoyMTYgNTA1LjU5MjAxIFRkCihCZWdpbm5pbmdcMDQwQmFsYW5jZSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKMCAwIDAgcmcKMCAwIDAgcmcKL0YyIDggVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA4IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKMTAuOTA0IFRMCjUwNCA1MDUuNTkyMDEgVGQKNDkuMjM5OTkgMCBUZAooMC4wMCkgJwotNDkuMjM5OTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKMTAuOTA0IFRMCjQzLjIgNDkzLjU5MjAxIFRkCjUuMTkyIDAgVGQKKDA4XDA1NzEyXDA1NzIwMTkpICcKLTUuMTkyIDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA4IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVAoxMC45MDQgVEwKMjE2IDQ5My41OTIwMSBUZAooRW5kaW5nXDA0MEJhbGFuY2UpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCjAgMCAwIHJnCjAgMCAwIHJnCi9GMiA4IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA4IFRmCkJUCjEwLjkwNCBUTAo1MDQgNDkzLjU5MjAxIFRkCjI5LjIzMTk5IDAgVGQKKDI5LDk5OS4wMCkgJwotMjkuMjMxOTkgMCBUZApFVApRCnEKMC45MDk4IDEgMC45MDk4IHJnCjAuNSB3CjM2IDQ2OC4wNDk5OSA1NDAgLTIzLjI1IHJlCkIKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAo0My4yIDQ4Mi4wMDggVGQKKFBheW1lbnRzXDA0MER1ZTopICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAo0My4yIDQ3MC4wMDggVGQKMTcuNjQ4IDAgVGQKKER1ZSkgJwotMTcuNjQ4IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAo0My4yIDQ1OC4wMDggVGQKMTYuNTMyIDAgVGQKKERhdGUpICcKLTE2LjUzMiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKMTQ0IDQ3MC4wMDggVGQKMzEuNDcyIDAgVGQKKFBheW1lbnQpICcKLTMxLjQ3MiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKMTQ0IDQ1OC4wMDggVGQKMzQuNTkyIDAgVGQKKE51bWJlcikgJwotMzQuNTkyIDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAoyMTYgNDU4LjAwOCBUZAooRGVzY3JpcHRpb24pICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAozMDkuNjAwMDEgNDcwLjAwOCBUZAozMS40NzE5OSAwIFRkCihQYXltZW50KSAnCi0zMS40NzE5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKMzA5LjYwMDAxIDQ1OC4wMDggVGQKNDkuNjk1OTkgMCBUZAooRHVlKSAnCi00OS42OTU5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKMzc0LjM5OTk5IDQ3MC4wMDggVGQKMzQuNjA4MDIgMCBUZAooQW1vdW50KSAnCi0zNC42MDgwMiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKMzc0LjM5OTk5IDQ1OC4wMDggVGQKNDcuOTI4MDIgMCBUZAooUGFpZCkgJwotNDcuOTI4MDIgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjQzOS4yMDAwMSA0NzAuMDA4IFRkCjM0LjYwNzk5IDAgVGQKKEFtb3VudCkgJwotMzQuNjA3OTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjQzOS4yMDAwMSA0NTguMDA4IFRkCjIzLjk0Mzk5IDAgVGQKKFJlbWFpbmluZykgJwotMjMuOTQzOTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjUwNCA0NzAuMDA4IFRkCjQ1LjcxMTk5IDAgVGQKKFRvdGFsKSAnCi00NS43MTE5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKNTA0IDQ1OC4wMDggVGQKNDkuNjk1OTkgMCBUZAooRHVlKSAnCi00OS42OTU5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVAoxMC45MDQgVEwKNDMuMiA0NDUuNTkyMDEgVGQKNS4xOTIgMCBUZAooMDhcMDU3MzBcMDU3MjAxOSkgJwotNS4xOTIgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKMTAuOTA0IFRMCjE0NCA0NDUuNTkyMDEgVGQKNjAuMzUyMDEgMCBUZAooMSkgJwotNjAuMzUyMDEgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKMTAuOTA0IFRMCjIxNiA0NDUuNTkyMDEgVGQKKFByaW5jaXBhbFwwNDBhbmRcMDQwSW50ZXJlc3QpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCjAgMCAwIHJnCjAgMCAwIHJnCi9GMiA4IFRmCkJUCjEwLjkwNCBUTAozMDkuNjAwMDEgNDQ1LjU5MjAxIFRkCjMzLjY3OTk5IDAgVGQKKDEsMDE5Ljc3KSAnCi0zMy42Nzk5OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVAoxMC45MDQgVEwKMzc0LjM5OTk5IDQ0NS41OTIwMSBUZAo0OS4yNDAwMiAwIFRkCigwLjAwKSAnCi00OS4yNDAwMiAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOCBUZgpCVAoxMC45MDQgVEwKNDM5LjIwMDAxIDQ0NS41OTIwMSBUZAozMy42Nzk5OSAwIFRkCigxLDAxOS43NykgJwotMzMuNjc5OTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDggVGYKQlQKMTAuOTA0IFRMCjUwNCA0NDUuNTkyMDEgVGQKMzMuNjc5OTkgMCBUZAooMSwwMTkuNzcpICcKLTMzLjY3OTk5IDAgVGQKRVQKUQpxCjAuNSB3CjUwNCA0MzEuMzUwMDEgbQo1NjguNzk5OTkgNDMxLjM1MDAxIGwKQgpRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjIxNiA0MzQuMDA4IFRkCihUb3RhbFwwNDBBbW91bnRcMDQwRHVlKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOCBUZgpCVAoxMS40NDggVEwKNTA0IDQzNC4wMDggVGQKMzMuNjc5OTkgMCBUZAooMSwwMTkuNzcpICcKLTMzLjY3OTk5IDAgVGQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA4IFRmCkJUCjExLjQ0OCBUTAozNiA0MTEuMDU3OTggVGQKKFdlXDA0MG1heVwwNDByZXBvcnRcMDQwaW5mb3JtYXRpb25cMDQwYWJvdXRcMDQweW91clwwNDBhY2NvdW50XDA0MHRvXDA0MGNyZWRpdFwwNDBidXJlYXVzLlwwNDBMYXRlXDA0MHBheW1lbnRzLFwwNDBtaXNzZWRcMDQwcGF5bWVudHMsXDA0MG9yXDA0MG90aGVyXDA0MGRlZmF1bHRzXDA0MG9uXDA0MHlvdXJcMDQwYWNjb3VudFwwNDBtYXlcMDQwYmVcMDQwKSAnCihyZWZsZWN0ZWRcMDQwaW5cMDQweW91clwwNDBjcmVkaXRcMDQwcmVwb3J0LikgJwpFVApRCnEKMC41MDE5NiAwLjUwMTk2IDAuNTAxOTYgUkcKMC41IHcKMjEuNiAyNTEuMyBtCjU5MC40MDAwMiAyNTEuMyBsCkIKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCjAuNTAxOTYgMC41MDE5NiAwLjUwMTk2IHJnCjAuNTAxOTYgMC41MDE5NiAwLjUwMTk2IHJnCi9GMiA2IFRmCkJUCjguMTc4IFRMCjU3LjYgMjUxLjk0NCBUZAooMTA5MjMtMzE1Mi0xKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwowLjUwMTk2IDAuNTAxOTYgMC41MDE5NiByZwowLjUwMTk2IDAuNTAxOTYgMC41MDE5NiByZwovRjIgNiBUZgpCVAo4LjE3OCBUTAoyMzcuNjAwMDEgMjUxLjk0NCBUZAo1NS4wNTU5OSAwIFRkCigwODEzMjAxOSkgJwotNTUuMDU1OTkgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKMC41MDE5NiAwLjUwMTk2IDAuNTAxOTYgcmcKMC41MDE5NiAwLjUwMTk2IDAuNTAxOTYgcmcKL0YyIDYgVGYKQlQKOC4xNzggVEwKNDEwLjM5OTk5IDI1MS45NDQgVGQKNjIuMzIyMDMgMCBUZAooXDA0MDA1MTQyMDE4XDA0MExvYW5TdGF0ZW1lbnQyLmRsbCkgJwotNjIuMzIyMDMgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKMC41MDE5NiAwLjUwMTk2IDAuNTAxOTYgcmcKMC41MDE5NiAwLjUwMTk2IDAuNTAxOTYgcmcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjU3LjYgMjQyLjAwOCBUZAoyMDkuNzY4MDEgMCBUZAooUkVNSVRUQU5DRVwwNDBDT1BZKSAnCi0yMDkuNzY4MDEgMCBUZApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKMTIuODc5IFRMCjU3LjYgMTk1LjM4NCBUZAooU3RhdGVtZW50XDA0MERhdGU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKMTUxLjIgMTk0LjkxNiBUZAooMDhcMDU3MTJcMDU3MjAxOSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKMTIuODc5IFRMCjU3LjYgMTgzLjM4NCBUZAooRHVlXDA0MERhdGU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKMTUxLjIgMTgyLjkxNiBUZAooMDhcMDU3MzBcMDU3MjAxOSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDkgVGYKQlQKMTIuODc5IFRMCjU3LjYgMjA3LjM4NCBUZAooQWNjb3VudFwwNDBOdW1iZXI6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKMTUxLjIgMjA2LjkxNiBUZAooQVBQLTA1MDMyNDM3KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKNTcuNiAyMTkuMzg0IFRkCihOYW1lOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjE1MS4yIDIxOC45MTYgVGQKKEpBU09OXDA0MEJVQ0tMRVkpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMSA5IFRmCkJUCjEyLjg3OSBUTAozMzEuMjAwMDEgMjE5LjM4NCBUZAooVG90YWxcMDQwUGFzdFwwNDBEdWU6KSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKNDI0Ljc5OTk5IDIxOC45MTYgVGQKNTQuNDk1IDAgVGQKKDAuMDApICcKLTU0LjQ5NSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzMxLjIwMDAxIDE5NS4zODQgVGQKKFRvdGFsXDA0MEN1cnJlbnRcMDQwRHVlOikgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjQyNC43OTk5OSAxOTQuOTE2IFRkCjM2Ljk5IDAgVGQKKDEsMDE5Ljc3KSAnCi0zNi45OSAwIFRkCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjEgOSBUZgpCVAoxMi44NzkgVEwKMzMxLjIwMDAxIDE3MS4zODQgVGQKKEFtb3VudFwwNDBFbmNsb3NlZDopICcKRVQKUQpxCjAuNDExNzYgMC40MTE3NiAwLjQxMTc2IFJHCjAuNSB3CjQzMiAxNTYgbQo0OTYuNzk5OTkgMTU2IGwKQgpRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjU3LjYgMTIyLjkxNiBUZAooSkFTT05cMDQwQlVDS0xFWSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjU3LjYgMTEwLjkxNiBUZAooNDUxMVwwNDBTSURFUkVBTFwwNDBEUklWRSkgJwpFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKMTIuMjY3IFRMCjU3LjYgOTguOTE2IFRkCihBVVNUSU5cMDQwVFhcMDQwXDA0MDc4NzI3XDA0MFVOSVRFRFwwNDBTVEFURVMpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YyIDkgVGYKQlQKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAozMzEuMjAwMDEgOTguOTE2IFRkCihGUkVFRE9NXDA0MFBMVVMpICcKRVQKUQpxCjAgMCAwIHJnCjAgMCAwIHJnCjAgMCAwIFJHCi9GMiA5IFRmCkJUCjEyLjI2NyBUTAozMzEuMjAwMDEgODYuOTE2IFRkCihQT1wwNDBCT1hcMDQwMjA0NzkxKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVAoxMi4yNjcgVEwKMzMxLjIwMDAxIDc0LjkxNiBUZAooREFMTEFTXDA0MFRYXDA0MFwwNDA3NTMyMC00NzkxKSAnCkVUClEKcQowIDAgMCByZwowIDAgMCByZwowIDAgMCBSRwovRjIgOSBUZgpCVApFVApRCnEKMCAwIDAgcmcKMCAwIDAgcmcKMCAwIDAgUkcKL0YxIDggVGYKQlQKMTEuNDQ4IFRMCjU3LjYgMTQ3LjAwOCBUZAooSWZcMDQwYXV0b1wwNDBwYXltZW50XDA0MGlzXDA0MHNjaGVkdWxlZCxcMDQwcGxl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gMCAwIApdCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0FyaWFsTVQKL1N1YnR5cGUgL1RydWVUeXBlCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQovTWlzc2luZ1dpZHRoIDc1MAovRm9udERlc2NyaXB0b3IgMTMgMCBSCi9XaWR0aHMgWwoyNzcgMCAwIDAgMCA4ODkgMCAwIDAgMCAwIDAgMjc3IDMzMyAyNzcgMjc3IAo1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMCAwIDAgMCAwIDAgCjAgNjY2IDY2NiA3MjIgNzIyIDY2NiA2MTAgMCA3MjIgMjc3IDUwMCA2NjYgNTU2IDgzMyA3MjIgNzc3IAo2NjYgMCA3MjIgNjY2IDYxMCA3MjIgNjY2IDAgNjY2IDY2NiA2MTAgMCAwIDAgMCAwIAowIDU1NiAwIDUwMCA1NTYgNTU2IDAgNTU2IDAgMjIyIDAgMCAyMjIgODMzIDU1NiA1NTYgCjU1NiAwIDMzMyA1MDAgMjc3IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAKXQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Bc2NlbnQgOTA1Ci9EZXNjZW50IC0yMTEKL0ZsYWdzIDI2MjE3NgovRm9udEJCb3ggWyAtNjI3IC0zNzYgMjAwMCAxMDU1IF0KL0ZvbnROYW1lIC9BcmlhbC1Cb2xkTVQsQm9sZAovSXRhbGljQW5nbGUgMAovU3RlbVYgMAovWEhlaWdodCA1MTgKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9UeXBlIC9Gb250RGVzY3JpcHRvcgovQXNjZW50IDkwNQovRGVzY2VudCAtMjExCi9GbGFncyAzMgovRm9udEJCb3ggWyAtNjY0IC0zMjQgMjAwMCAxMDM5IF0KL0ZvbnROYW1lIC9BcmlhbE1UCi9JdGFsaWNBbmdsZSAwCi9TdGVtViAwCi9YSGVpZ2h0IDUxOAo+PgplbmRvYmoKeHJlZgowIDE0CjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMDAxNSAwMDAwMCBuDQowMDAwMDAwMDY0IDAwMDAwIG4NCjAwMDAwMDAxMjMgMDAwMDAgbg0KMDAwMDAwMDE5NiAwMDAwMCBuDQowMDAwMDAwMjY5IDAwMDAwIG4NCjAwMDAwMDA0ODIgMDAwMDAgbg0KMDAwMDAxMjY2MiAwMDAwMCBuDQowMDAwMDEyNjgzIDAwMDAwIG4NCjAwMDAwMTk5ODkgMDAwMDAgbg0KMDAwMDAyMDAwOSAwMDAwMCBuDQowMDAwMDIwNzQ3IDAwMDAwIG4NCjAwMDAwMjE0OTUgMDAwMDAgbg0KMDAwMDAyMTY3OSAwMDAwMCBuDQp0cmFpbGVyCjw8Ci9Sb290IDEgMCBSCi9JbmZvIDMgMCBSCi9TaXplIDE0Cj4+CnN0YXJ0eHJlZgoyMTg0OQolJUVPRgo=',
      },
    },
  },
};

export const MOCK_DATA_USELOANSTATE_HOOK = {
  isCurrent: true,
  isAutoPay: true,
  isBilled: false,
  nextPayment: {
    Date_Due: new Date('2021-04-16T00:00:00'),
    Payment_Amount: 225.06,
    Row_Id: '15595643',
    Transaction_Code: 124,
  },
};

export const MOCK_DATA_USELOANSTATE_HOOK_NEXT_PAYMENT = {
  isCurrent: true,
  isAutoPay: true,
  isBilled: false,
  nextPayment: {
    Date_Due: days2FromNow,
    Payment_Amount: 225.06,
    Row_Id: '15595643',
    Transaction_Code: 124,
  },
  hasOneTimePayment: true,
  oneTimePaymentRowIds: ['1190006', '1190007', '1190009', '1190010', '1190011', '1190012'],
};

export const MOCK_DATA_USELOANSTATE_HOOK_PASTDUE = {
  isCurrent: false,
  isAutoPay: true,
  isBilled: false,
  nextPayment: {
    Date_Due: new Date('2021-04-16T00:00:00'),
    Payment_Amount: 225.06,
    Row_Id: '15595643',
    Transaction_Code: 124,
  },
};

export const MOCK_DATA_USELOANSTATE_BILLED_HOOK = {
  isCurrent: true,
  isAutoPay: true,
  isBilled: true,
  nextPayment: {
    Date_Due: new Date('2021-04-16T00:00:00'),
    Payment_Amount: 225.06,
    Row_Id: '15595643',
    Transaction_Code: 124,
  },
};

export const MOCK_DATA_USELOANSTATE_AUTOPAY_HOOK = {
  isCurrent: true,
  isAutoPay: false,
  isBilled: true,
  nextPayment: {
    Date_Due: new Date('2021-04-16T00:00:00'),
    Payment_Amount: 225.06,
    Row_Id: '15595643',
    Transaction_Code: 124,
  },
};

export const MOCK_DATA_USEAUTOMATEDPAYMENTS_HOOK = {
  automatedPayments: {
    error: false,
    payments: [
      {
        accountNumber: '785236985214',
        amount: 225.06,
        billingNextDate: '2021-05-07T00:00:00',
        billingPeriod: 'NA',
        billingStartDate: '2021-05-07T00:00:00',
        billingType: 1,
        paymentType: 0,
        rowId: '1190009',
        scheduledDate: '2021-05-07T00:00:00',
        status: 0,
      },
      {
        accountNumber: '785236985214',
        amount: 225.06,
        billingNextDate: '2021-04-06T00:00:00',
        billingPeriod: 'NA',
        billingStartDate: '2021-04-06T00:00:00',
        billingType: 1,
        paymentType: 0,
        rowId: '1190007',
        scheduledDate: '2021-04-06T00:00:00',
        status: 0,
      },
    ],
  },
};

export const MOCK_DATA_ONETIMEPAYMENTS_HOOK = {
  oneTimePayments: {
    error: false,
    activePayments: [
      {
        accountNumber: '785236985214',
        amount: 225.06,
        billingPeriod: 'NA',
        rowId: '1190006',
        scheduledDate: days2FromNow.toISOString(),
      },
      {
        accountNumber: '785236985214',
        amount: 225.06,
        billingPeriod: 'NA',
        rowId: '1190007',
        scheduledDate: days5FromNow.toISOString(),
      },
      {
        accountNumber: '785236985214',
        amount: 500,
        billingPeriod: 'NA',
        rowId: '1190010',
        scheduledDate: days7FromNow.toISOString(),
      },
      {
        accountNumber: '785236985214',
        amount: 500,
        billingPeriod: 'NA',
        rowId: '1190011',
        scheduledDate: days9FromNow.toISOString(),
      },
      {
        accountNumber: '785236985214',
        amount: 500,
        billingPeriod: 'NA',
        rowId: '1190012',
        scheduledDate: days12FromNow.toISOString(),
      },
    ],
  },
};
