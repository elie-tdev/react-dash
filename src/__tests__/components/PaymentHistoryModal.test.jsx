import React from 'react';

import { render, fireEvent } from '@/utils/custom-render';
import { PaymentHistoryModal } from '@/components';

describe('PaymentHistoryModal', () => {
  const payment = {
    paymentAmount: '1019.77',
    principalAmount: '479.74',
    interestAmount: '540.03',
    accountNumber: 'CHECKING (****5214)',
    paidDate: '11/30/2020',
  };
  test('Renders a paid one-time payment, Returned', () => {
    const { container } = render(<PaymentHistoryModal status="Returned" />);
    expect(container).toMatchSnapshot();
  });

  test('Renders a scheduled payment, autoPay', async () => {
    const mock = jest.fn();
    const { container } = render(
      <PaymentHistoryModal open={true} onClose={mock} status="Paid" type="autoPay" />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders a scheduled payment, Paid oneTime', async () => {
    const mock = jest.fn();
    payment.status = 'Posted';
    payment.type = 'oneTime';
    const { container, findByText } = render(
      <PaymentHistoryModal open={true} onClose={mock} payment={payment} isFullScreen />,
    );
    expect(await findByText('Schedule Additional Payment')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  test('Renders a scheduled payment, Paid oneTime, large screen', async () => {
    const mock = jest.fn();
    payment.status = 'Posted';
    payment.type = 'oneTime';
    const { findByText } = render(
      <PaymentHistoryModal open={true} onClose={mock} payment={payment} />,
    );
    expect(await findByText('Schedule Additional Payment')).toBeVisible();
    fireEvent.click(await findByText('Schedule Additional Payment'));
    expect(await findByText('Schedule a Payment')).toBeVisible();
  });

  test('Renders a scheduled payment, Scheduled, OneTime', async () => {
    const mock = jest.fn();
    payment.status = 'Scheduled';
    payment.type = 'oneTime';
    const { container, findByText } = render(
      <PaymentHistoryModal open={true} onClose={mock} payment={payment} isFullScreen />,
    );
    expect(await findByText('Edit Payment')).toBeVisible();
    fireEvent.click(await findByText('Edit Payment'));
    expect(container).toMatchSnapshot();
  });

  test('Renders a scheduled payment, Pending, OneTime', async () => {
    const mock = jest.fn();
    payment.status = 'Pending';
    payment.type = 'oneTime';
    const { container, findByText } = render(
      <PaymentHistoryModal open={true} onClose={mock} payment={payment} isFullScreen />,
    );
    expect(await findByText('Payment Pending')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
