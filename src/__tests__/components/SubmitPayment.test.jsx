import React from 'react';

import { SubmitPaymentModal } from '@/components';
import { render } from '@/utils/custom-render';

describe('Submit Payment/AutoPay Flows', () => {
  test('renders Submit Payment Flow', async () => {
    const { findByText } = render(
      <SubmitPaymentModal
        isAutoPaySetup={false}
        open={true}
        onClose={() => {}}
        onSuccess={() => {}}
      />,
    );
    expect(await findByText('Schedule a Payment')).toBeInTheDocument();
  });
  test('renders AutoPay Enroll Flow', async () => {
    const { findByText } = render(
      <SubmitPaymentModal
        isAutoPaySetup={true}
        open={true}
        onClose={() => {}}
        onSuccess={() => {}}
      />,
    );
    expect(await findByText('Enroll in AutoPay')).toBeInTheDocument();
  });
});
