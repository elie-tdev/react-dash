import React from 'react';

import { EditPaymentAccount } from '@/components/SubmitPaymentModal/components';
import { render, fireEvent } from '@/utils/custom-render';

describe('EditPaymentAccount', () => {
  test('renders Edit Payment Account', async () => {
    const { container, findByText } = render(
      <EditPaymentAccount
        open={true}
        account={{
          accountNumber: '66558778',
          routingNumber: '1179056',
          isPrimary: true,
          accountType: 'Savings',
        }}
        bankAccounts={[]}
      />,
    );
    expect(container).toMatchSnapshot();

    expect(await findByText('Yes, delete')).not.toBeVisible();
    fireEvent.click(await findByText('Delete Account'));
    expect(await findByText('Yes, delete')).toBeVisible();
  });
});
