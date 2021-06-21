import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { queries } from '@/gql';

function useOneTimePayments(oneTimePaymentRowIds = []) {
  const [oneTimeIndex, setOneTimeIndex] = useState(0);
  const [oneTimePayments, setOneTimePayments] = useState({
    error: false,
    activePayments: [],
  });

  const [getLoanOneTimeAch, { error, data: loanOneTimeAch }] = useLazyQuery(
    queries.GetAutomatedPaymentsByRowId,
  );

  useEffect(() => {
    if (!oneTimePaymentRowIds?.length || oneTimeIndex >= oneTimePaymentRowIds.length) {
      return;
    }
    getLoanOneTimeAch({
      variables: {
        row_id: oneTimePaymentRowIds[oneTimeIndex],
      },
    });
  }, [oneTimeIndex, oneTimePaymentRowIds]);

  useEffect(() => {
    if (!loanOneTimeAch) {
      return;
    }
    if (error) {
      setOneTimePayments(payments => ({
        ...payments,
        error: true,
      }));
    } else {
      const {
        Row_Id: rowId,
        Billing_Period: billingPeriod,
        Amount_Fixed: amount,
        Billing_Next_Date: scheduledDate,
        Account_Number: accountNumber,
        Account_Type: accountType,
        Aba_Number: AbaNumber,
        AutomatedPaymentCompanyID: ACHCompanyID,
      } = loanOneTimeAch.AutomatedPayments_Get.payload.data;
      const arr = [
        ...oneTimePayments.activePayments,
        {
          rowId,
          billingPeriod,
          amount,
          scheduledDate,
          accountNumber,
          accountType,
          AbaNumber,
          ACHCompanyID,
        },
      ];
      const newPayments = { ...oneTimePayments, activePayments: arr };
      setOneTimePayments(newPayments);
    }
    setOneTimeIndex(index => index + 1);
  }, [loanOneTimeAch]);

  return { oneTimePayments };
}

export default useOneTimePayments;
