import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { queries } from '@/gql';
import { useAuthUser } from '@/customHooks';

function useBankAccounts() {
  const { contactId } = useAuthUser();

  const { data, loading = true } = useQuery(queries.BankAccounts, {
    variables: { contact_id: contactId },
  });

  const bankAccounts = useMemo(() => {
    if (!data) return;

    const bankAccountsData = data?.Contacts_GetFinancials?.payload?.data?.BankAccounts;
    const bankAccountsString = bankAccountsData ? bankAccountsData.replace(/'/gm, '"') : null;

    let bankAccounts = [];

    try {
      if (bankAccountsString) {
        bankAccounts = JSON.parse(bankAccountsString).bankAccounts;
      }
    } catch (e) {
      console.log(e);
      bankAccounts = [];
    }

    return bankAccounts;
  }, [data]);

  const cifNumber = data?.Contacts_Get?.payload?.data?.Cifnumber;

  return {
    bankAccounts,
    cifNumber,
    loading,
  };
}

export default useBankAccounts;
