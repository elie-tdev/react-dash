import React from 'react';
import { screen } from '@testing-library/react';
import TimeAgo from 'javascript-time-ago';
import userEvent from '@testing-library/user-event';

import { render } from '@/utils/custom-render';
import { AutoPayCard } from '@/components';

describe('AutoPayCard Component', () => {
  test('renders AutoPay on Loan Overview Screen', () => {
    const mock = jest.fn();
    const { container } = render(
      <AutoPayCard
        paymentValue={500}
        paymentDate="Jan 17, 2021"
        nextPaymentDays={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
        onManagePayment={mock}
        paymentType="autoPay"
        dark
      />,
    );
    userEvent.click(screen.getByText('Manage AutoPay'));
    expect(mock.mock.calls).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
});
