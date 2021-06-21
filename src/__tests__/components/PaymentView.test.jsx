import React from 'react';
import TimeAgo from 'javascript-time-ago';

import { render } from '@/utils/custom-render';
import PaymentView from '@/components/PaymentView/PaymentView';

describe('PaymentView Component', () => {
  const loan = {
    paymentAmount: 500,
    paymentDate: 'Jan 17, 2021',
    nextPaymentDays: new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  test('renders PaymentView', () => {
    const mock = jest.fn();
    const { container } = render(
      <PaymentView
        loan={loan}
        paymentValue={500}
        dueDate="Jan 17, 2021"
        due={500}
        isOutlined
        onSchedulePayment={mock}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
