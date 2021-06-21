import React from 'react';

import PaymentAccountsCard from '@/screens/PaymentAccountsScreen/PaymentAccountsCard';
import { render } from '@/utils/custom-render';

describe('PaymentAccountsCard', () => {
  test('renders PaymentAccountsCard', () => {
    const { container } = render(<PaymentAccountsCard />);
    expect(container).toMatchSnapshot();
  });
});
