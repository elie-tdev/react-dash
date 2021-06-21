import React from 'react';

import { NewPaymentAccount } from '@/components/SubmitPaymentModal/components';
import { render } from '@/utils/custom-render';

describe('NewPaymentAccount', () => {
  test('renders New Payment Account', () => {
    const { container } = render(
      <NewPaymentAccount
        open={true}
        onClose={() => {}}
        bankAccounts={[]}
        cifNumber="APP-04517954"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
