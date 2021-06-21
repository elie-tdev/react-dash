import React from 'react';
import TimeAgo from 'javascript-time-ago';

import { fireEvent, render } from '@/utils/custom-render';
import NextPaymentCard from '@/components/PaymentView/NextPaymentCard';

describe('NextPaymentCard Component', () => {
  test('renders NextPaymentCard on Payment History Screen', () => {
    const { container } = render(
      <NextPaymentCard
        dueDate="Jan 17, 2021"
        paymentAmount="$500.00"
        nextPaymentDays={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('on CLick on Schedule a Payment if isAutoPay', async () => {
    const handleClick = jest.fn();
    const { container, findAllByTestId } = render(
      <NextPaymentCard
        dueDate="Jan 17, 2021"
        paymentAmount="$500.00"
        isOutlined={true}
        isAutoPay={true}
        isLoanOverviewScreen={true}
        onClick={handleClick()}
        isCurrent={true}
        nextPaymentDays={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
      />,
    );
    const button = await findAllByTestId('PrimaryButton');
    await expect(button).toHaveLength(1);
    await fireEvent.click(button[0]);
    await expect(handleClick).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('on CLick on Schedule a Payment if user is not on Loan Overview screen', async () => {
    const handleClick = jest.fn();
    const { container, findAllByTestId } = render(
      <NextPaymentCard
        dueDate="Jan 17, 2021"
        paymentAmount="$500.00"
        isOutlined={true}
        isAutoPay={false}
        isLoanOverviewScreen={false}
        onClick={handleClick()}
        isCurrent={true}
        nextPaymentDays={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
      />,
    );
    const button = await findAllByTestId('SecondaryButton');
    await expect(button).toHaveLength(1);
    await fireEvent.click(button[0]);
    await expect(handleClick).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('on CLick on Enroll in AutoPay if user is not on Loan Overview screen', async () => {
    const handleClick = jest.fn();
    const { container, findAllByTestId } = render(
      <NextPaymentCard
        dueDate="Jan 17, 2021"
        paymentAmount="$500.00"
        isOutlined={true}
        isAutoPay={false}
        isLoanOverviewScreen={false}
        onClick={handleClick()}
        isCurrent={true}
        nextPaymentDays={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
      />,
    );
    const button = await findAllByTestId('PrimaryButton');
    await expect(button).toHaveLength(1);
    await fireEvent.click(button[0]);
    await expect(handleClick).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
