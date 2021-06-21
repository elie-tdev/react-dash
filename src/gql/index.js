import { gql } from '@apollo/client';

export const queries = {
  InitializeUser: gql`
    query InitializeUser($contact_id: String!) {
      Contacts_Get(contact_id: $contact_id) {
        payload {
          data {
            Firstname1
            Lastname1
          }
        }
      }
      Contacts_GetLoans(contact_id: $contact_id) {
        payload {
          data {
            Acctrefno
            Loan_Number
            Current_Payoff_Balance
            Total_Current_Due_Balance
            Loan_Type
          }
        }
      }
    }
  `,
  UpdateBankAccounts: gql`
    mutation UpdateBankAccounts($payload: String!) {
      NlsCore_ImportXml(payload: $payload) {
        payload {
          data
        }
      }
    }
  `,
  BankAccounts: gql`
    query BankAccountsGet($contact_id: String!) {
      Contacts_GetFinancials(contact_id: $contact_id) {
        payload {
          data {
            BankAccounts
          }
        }
      }
      Contacts_Get(contact_id: $contact_id) {
        payload {
          data {
            Cifnumber
          }
        }
      }
    }
  `,
  UpdateAddress: gql`
    mutation UpdateAddress($payload: String!) {
      NlsCore_ImportXml(payload: $payload) {
        payload {
          data
        }
      }
    }
  `,
  ChangeAddress: gql`
    query ChangeAddressGet($contact_id: String!) {
      Contacts_Get(contact_id: $contact_id) {
        payload {
          data {
            Cifnumber
            Cifno
            Street_Address1
            Street_Address2
            City
            State
            Zip
            Entity
          }
        }
      }
    }
  `,
  SubmitOneTimePayment: gql`
    mutation SubmitOneTimePayment($payload: String!) {
      NlsCore_ImportXml(payload: $payload) {
        payload {
          data
        }
      }
    }
  `,
  CancelAutopayPayment: gql`
    mutation CancelAutopayPayment($payload: String!) {
      NlsCore_ImportXml(payload: $payload) {
        payload {
          data
        }
      }
    }
  `,
  LoanOverview: gql`
    query LoanGet($loan_id: String!) {
      Loans_Get(loan_id: $loan_id) {
        payload {
          data {
            Acctrefno
            Loan_Number
            Current_Payoff_Balance
            Original_Note_Amount
            Total_Current_Due_Balance
            Total_Past_Due_Balance
            Days_Past_Due
            Current_Principal_Balance
            Current_Interest_Balance
            Current_Interest_Rate
            Current_Late_Charge_Balance
            Current_Fees_Balance
          }
        }
      }
      Loans_GetPaymentInfo(loan_id: $loan_id) {
        payload {
          data {
            Amortized_Payment_Amount
            Current_Principal_Payment_Date
            Next_Principal_Payment_Date
          }
        }
      }
    }
  `,
  Balance: gql`
    query LoanGet($loan_id: String!) {
      Loans_Get(loan_id: $loan_id) {
        payload {
          data {
            Acctrefno
            Loan_Number
            Current_Payoff_Balance
            Original_Note_Amount
            Total_Current_Due_Balance
            Total_Past_Due_Balance
            Current_Principal_Balance
            Current_Interest_Balance
            Current_Interest_Rate
            Current_Fees_Balance
            Current_Late_Charge_Balance
            Open_Date
            Open_Maturity_Date
            Days_Past_Due
          }
        }
      }
      Loans_GetPaymentInfo(loan_id: $loan_id) {
        payload {
          data {
            Total_Payments
            Amortized_Payment_Amount
            Last_Payment_Date
            Last_Payment_Amount
            Current_Principal_Payment_Date
            Next_Principal_Payment_Date
          }
        }
      }
      Loans_GetSetup(loan_id: $loan_id) {
        payload {
          data {
            Principal_Period
          }
        }
      }
    }
  `,
  payoffDetails: gql`
    query LoanGetPayoffDetails($loan_id: String!, $payoffDate: String!) {
      Loans_GetPayoffDetails(loan_id: $loan_id, payoffDate: $payoffDate) {
        payload {
          data {
            Payoount
          }
        }
      }
    }
  `,
  PaymentHistory: gql`
    query LoanGet($loan_id: String!) {
      Loans_GetPaymentInfo(loan_id: $loan_id) {
        payload {
          data {
            Amortized_Payment_Amount
            Current_Principal_Payment_Date
            Next_Principal_Payment_Date
          }
        }
      }
      Loans_GetPaymentHistory(loan_id: $loan_id) {
        payload {
          data {
            Row_Id
            Payment_Reference_No
            Date_Paid
            Payment_Amount
            Payment_Type
            Payment_Description
            Nsf_Flag
            Transaction_Reference_No
            Account_Number
          }
        }
      }
    }
  `,
  useLoanState: gql`
    query LoanGet($loan_id: String!) {
      Loans_GetAutomatedPayments(loan_id: $loan_id) {
        payload {
          data {
            Row_Id
            Payment_Type
            Status
            Billing_Type
          }
        }
      }
      Loans_GetPaymentHistory(loan_id: $loan_id) {
        payload {
          data {
            Payment_Type
            Date_Paid
          }
        }
      }
      Loans_GetPaymentInfo(loan_id: $loan_id) {
        payload {
          data {
            Amortized_Payment_Amount
            Current_Principal_Payment_Date
            Next_Principal_Payment_Date
          }
        }
      }
      Loans_GetSetup(loan_id: $loan_id) {
        payload {
          data {
            Principal_Period
          }
        }
      }
      Loans_GetPaymentsDue(loan_id: $loan_id) {
        payload {
          data {
            Row_Id
            Transaction_Code
            Date_Due
            Payment_Amount
          }
        }
      }
      Loans_Get(loan_id: $loan_id) {
        payload {
          data {
            Days_Past_Due
            Current_Payoff_Balance
            Total_Current_Due_Balance
            Total_Past_Due_Balance
            Original_Note_Amount
            Loan_Number
          }
        }
      }
      Loans_GetDetail2(loan_id: $loan_id) {
        payload {
          data {
            ACHCompanyID
          }
        }
      }
    }
  `,
  GetAutomatedPaymentsByRowId: gql`
    query getAutomatedPaymentsByRowId($row_id: String!) {
      AutomatedPayments_Get(row_id: $row_id) {
        payload {
          data {
            Row_Id
            Billing_Period
            Amount_Fixed
            Billing_Next_Date
            Account_Number
            Account_Type
            Payment_Type
            Status
            Billing_Type
            Billing_Start_Date
            Billing_Next_Date
            Aba_Number
            AutomatedPaymentCompanyID
          }
        }
      }
    }
  `,
  CurrentState: gql`
    query getCurrentUser($loan_id: String!) {
      Loans_Get(loan_id: $loan_id) {
        payload {
          data {
            Days_Past_Due
          }
        }
      }
    }
  `,
  Statements: gql`
    query getStatements($loan_id: String!) {
      Loans_GetStatements(loan_id: $loan_id) {
        payload {
          data {
            Statement_Row_Id
            Statement_Date
            Statement_Due_Date
            Current_Rate
            Total_Past_Due_Balance
            Total_Current_Due_Balance
            Current_Payoff_Balance
          }
        }
      }
    }
  `,
  StatementFile: gql`
    query getStatementFile($statement_id: String!) {
      LoanStatements_GetFile(statement_id: $statement_id) {
        payload {
          data {
            File
          }
        }
      }
    }
  `,
  ContactUs: gql`
    query LoanGet($loan_id: String!) {
      Loans_Get(loan_id: $loan_id) {
        payload {
          data {
            Portfolio_Code_Id
          }
        }
      }
    }
  `,
};
