import React from 'react';

import { SuccessPrompt } from '@/components/SubmitPaymentModal/prompts';
import { fireEvent, render } from '@/utils/custom-render';

describe('Payment Success Prompt', () => {
  test('renders Payment Success Prompt', async () => {
    const { container, findByText } = render(
      <SuccessPrompt
        open={true}
        autoPay={true}
        onSuccess={() => {}}
        onClose={() => {}}
        resetFlow={() => {}}
        paymentAmount={500}
        remainingBalance={9393.54}
        nextPayment={'Jan 17, 2021'}
        paidVia={{ type: 'Checking', number: '12340378' }}
        receiptEmail={'johndoe@gmail.com'}
      />,
    );
    fireEvent.click(await findByText('Back to Loan Overview'));
    expect(container).toMatchSnapshot();
  });
});
