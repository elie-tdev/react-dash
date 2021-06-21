import React from 'react';
import TimeAgo from 'javascript-time-ago';

import { render, cleanup, fireEvent } from '@/utils/custom-render';
import ScheduledPayment from '@/components/PaymentView/ScheduledPayment';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('ScheduledPayment Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test('renders ScheduledPayment component, Pending', () => {
    const { container } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        scheduledPaymentDays="in 11 hours"
        paymentAmount="500"
        isPending
        inViewOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders ScheduledPayment component, view Only', () => {
    const { container } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        paymentAmount="500"
        scheduledPaymentDays={new TimeAgo('en-US').format(Date.now() + 2 * 24 * 60 * 60 * 1000)}
        inViewOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders ScheduledPayment component, enable manage payment', () => {
    const { container } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        paymentAmount="500"
        scheduledPaymentDays={new TimeAgo('en-US').format(Date.now() + 4 * 24 * 60 * 60 * 1000)}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders ScheduledPayment component, if multiple one-time schedule payments', async () => {
    const handleClick = jest.fn();
    const { container, findByText } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        paymentAmount="500"
        scheduledPaymentDays={new TimeAgo('en-US').format(Date.now() + 4 * 24 * 60 * 60 * 1000)}
        isPending={false}
        otherOneTimePaymentsNum={3}
        isPaymentHistory={false}
        onClick={handleClick()}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('3 other payments scheduled')).toBeVisible();
    fireEvent.click(await findByText('3 other payments scheduled'));
    await expect(mockHistoryPush).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('renders ScheduledPayment component, onClick on Manage Payment', async () => {
    const handlePayment = jest.fn();
    const { container, findByText } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        paymentAmount="500"
        scheduledPaymentDays={new TimeAgo('en-US').format(Date.now() + 4 * 24 * 60 * 60 * 1000)}
        isPending={false}
        otherOneTimePaymentsNum={3}
        isPaymentHistory={false}
        onClick={handlePayment()}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Manage Payment')).toBeVisible();
    fireEvent.click(await findByText('Manage Payment'));
    await expect(handlePayment).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('renders ScheduledPayment component, onClick on View Details', async () => {
    const handlePayment = jest.fn();
    const { container, findByText } = render(
      <ScheduledPayment
        scheduledPaymentDate="Jan 28, 2021"
        paymentAmount="500"
        scheduledPaymentDays={new TimeAgo('en-US').format(Date.now() + 4 * 24 * 60 * 60 * 1000)}
        isPending={true}
        isViewOnly={true}
        otherOneTimePaymentsNum={3}
        isPaymentHistory={false}
        onClick={handlePayment()}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('View Details')).toBeVisible();
    fireEvent.click(await findByText('View Details'));
    await expect(handlePayment).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });
});
