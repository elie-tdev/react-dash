import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { queries } from '@/gql';

function useLoanState(loanNumber) {
  const [isAutoPay, setIsAutoPay] = useState(null);
  const [isCurrent, setIsCurrent] = useState(null);
  const [isBilled, setIsBilled] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState(null);
  const [dueAmount, setDueAmount] = useState(null);
  const [amortizedPaymentAmount, setAmortizedPaymentAmount] = useState(null);
  const [pastDueDays, setPastDueDays] = useState(null);
  const [pastDueAmount, setPastDueAmount] = useState(null);
  const [lastPaidAmount, setLastPaidAmount] = useState(null);
  const [nextPaidAmount, setNextPaidAmount] = useState(null);
  const [lastPayDate, setLastPayDate] = useState(null);
  const [originalLoanAmount, setOriginalLoanAmount] = useState(null);
  const [autoPayErrorState, setAutoPayErrorState] = useState(null);
  const [hasOneTimePayment, setHasOneTimePayment] = useState();
  const [oneTimePaymentRowIds, setOneTimePaymentRowIds] = useState([]);
  const [automatedPaymentRowIds, setAutomatedPaymentRowIds] = useState([]);
  const [nextPayment, setNextPayment] = useState({});
  const [recurringPaymentDate, setRecurringPaymentDate] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState(null);
  const [achCompanyID, setACHCompanyID] = useState(null);
  const [achLoanNumber, setACHLoanNumber] = useState(null);
  const [autoPayRecord, setAutoPayRecord] = useState(null);

  const { data, loading, _error } = useQuery(queries.useLoanState, {
    variables: { loan_id: loanNumber },
  });

  const loanAutomatedPaymentsPayload = data?.Loans_GetAutomatedPayments?.payload?.data;
  const loanSetupPayload = data?.Loans_GetSetup?.payload?.data;
  const loanPaymentInfoPayload = data?.Loans_GetPaymentInfo?.payload?.data;
  const loanPayloadData = data?.Loans_Get?.payload?.data;
  const loanPaymentsDuePayload = data?.Loans_GetPaymentsDue?.payload?.data;
  const loanPaymentHistoryload = data?.Loans_GetPaymentHistory?.payload?.data;
  const loanDetails2Payload = data?.Loans_GetDetail2?.payload?.data;

  const [
    getLoanAch,
    { data: loanAch, loading: loanAchLoading, error: _loanAchError },
  ] = useLazyQuery(queries.GetAutomatedPaymentsByRowId);

  const loanAchAutomatedPaymentsPayload = loanAch?.AutomatedPayments_Get?.payload?.data;

  useEffect(() => {
    if (loanAutomatedPaymentsPayload?.length) {
      setAutomatedPaymentRowIds(
        data.Loans_GetAutomatedPayments.payload.data.map(item => item.Row_Id).sort((a, b) => b - a),
      );
      const activeOneTimeAch = loanAutomatedPaymentsPayload
        .filter(item => item.Payment_Type === 0)
        .filter(item => item.Status === 0)
        .filter(item => item.Billing_Type === 1);
      if (activeOneTimeAch.length > 0) {
        setHasOneTimePayment(true);
        setOneTimePaymentRowIds(activeOneTimeAch.map(item => item.Row_Id).sort());
      }

      const activeRecurringAch = loanAutomatedPaymentsPayload
        .filter(item => item.Payment_Type === 0)
        .filter(item => item.Status === 0)
        .filter(item => item.Billing_Type === 2);
      if (activeRecurringAch.length !== 1) {
        return;
      } else {
        getLoanAch({
          variables: {
            row_id: activeRecurringAch[0].Row_Id,
          },
        });
      }
    }
  }, [data]);

  useEffect(() => {
    const principalPeriod = loanSetupPayload && loanSetupPayload?.Principal_Period;
    setBillingPeriod(principalPeriod);

    const companyID = loanDetails2Payload && loanDetails2Payload?.ACHCompanyID;
    setACHCompanyID(companyID);

    const achLoan = loanPayloadData && loanPayloadData?.Loan_Number;
    setACHLoanNumber(achLoan);
  }, [data, loanSetupPayload, loanDetails2Payload, loanPayloadData]);

  useEffect(() => {
    if (
      [loanAchAutomatedPaymentsPayload, loanSetupPayload, loanPaymentInfoPayload].every(
        payload => payload !== undefined,
      ) &&
      loanAchAutomatedPaymentsPayload.Billing_Period === loanSetupPayload.Principal_Period &&
      loanAchAutomatedPaymentsPayload.Amount_Fixed ===
        loanPaymentInfoPayload.Amortized_Payment_Amount
    ) {
      setIsAutoPay(true);
      setAutoPayRecord(loanAchAutomatedPaymentsPayload);
    }
    if (
      (loanAutomatedPaymentsPayload?.length &&
        loanAutomatedPaymentsPayload.filter(row => {
          return row.Status === 0 && row.Billing_Type === 2;
        }).length > 1) ||
      (loanAchAutomatedPaymentsPayload &&
        loanSetupPayload &&
        loanPaymentInfoPayload &&
        (loanAchAutomatedPaymentsPayload.Billing_Period !== loanSetupPayload.Principal_Period ||
          loanAchAutomatedPaymentsPayload.Amount_Fixed !==
            loanPaymentInfoPayload.Amortized_Payment_Amount))
    ) {
      setAutoPayErrorState(true);
    }
    if (loanPaymentInfoPayload) {
      setNextPaidAmount(loanPaymentInfoPayload.Next_Payment_Total_Amount);
      setLastPaidAmount(loanPaymentInfoPayload.Last_Payment_Amount);
    }
    if (loanPaymentHistoryload) {
      const filtered = loanPaymentHistoryload.filter(function (e) {
        return e.Payment_Type === 'ZZ';
      });
      setLastPayDate(filtered[filtered.length - 1].Date_Paid);
    }
  }, [data, loanAch, automatedPaymentRowIds]);

  useEffect(() => {
    if (loanPayloadData && loanPaymentInfoPayload) {
      setIsCurrent(
        loanPayloadData.Days_Past_Due === 0 && loanPayloadData.Total_Past_Due_Balance === 0,
      );
      setBalanceAmount(loanPayloadData.Current_Payoff_Balance);
      setDueAmount(loanPayloadData.Total_Current_Due_Balance);
      setAmortizedPaymentAmount(loanPaymentInfoPayload.Amortized_Payment_Amount);
      setPastDueAmount(loanPayloadData.Total_Past_Due_Balance);
      setOriginalLoanAmount(loanPayloadData.Original_Note_Amount);
      setPastDueDays(loanPayloadData.Days_Past_Due);
      setRecurringPaymentDate(
        loanPaymentInfoPayload?.Current_Principal_Payment_Date &&
          loanPaymentInfoPayload?.Next_Principal_Payment_Date &&
          !isBilled
          ? loanPaymentInfoPayload.Next_Principal_Payment_Date
          : loanPaymentInfoPayload.Current_Principal_Payment_Date,
      );
    }
  }, [data, isBilled]);

  useEffect(() => {
    if (loanPaymentsDuePayload?.length > 0) {
      const loanPaymentsDue = loanPaymentsDuePayload
        .map(payment => ({
          ...payment,
          Date_Due: new Date(payment.Date_Due),
        }))
        .sort((paymentA, paymentB) => paymentB.Date_Due - paymentA.Date_Due);

      setIsBilled(loanPaymentsDue.some(payment => payment.Date_Due > new Date()));
      setNextPayment(loanPaymentsDue[0]);
    }
  }, [data]);

  return {
    isAutoPay,
    isCurrent,
    isBilled,
    hasOneTimePayment,
    oneTimePaymentRowIds,
    automatedPaymentRowIds,
    balanceAmount,
    dueAmount,
    pastDueAmount,
    lastPaidAmount,
    nextPaidAmount,
    recurringPaymentDate,
    amortizedPaymentAmount,
    lastPayDate,
    originalLoanAmount,
    pastDueDays,
    nextPayment,
    autoPayErrorState,
    isLoading: loading || loanAchLoading,
    billingPeriod,
    achCompanyID,
    achLoanNumber,
    autoPayRecord,
  };
}

export default useLoanState;
