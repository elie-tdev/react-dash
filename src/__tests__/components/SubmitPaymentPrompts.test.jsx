import React from 'react';

import {
  CurrentlyPastDue,
  CurrentlyEnrolledAutoPay,
  PayFromAccountPrompt,
  AdditionalAmountPrompt,
  PreExistingPaymentScheduled,
  ConfirmPaymentDetails,
  LoadingDataError,
  AutoPayErrorState,
} from '@/components/SubmitPaymentModal/prompts';
import { render } from '@/utils/custom-render';

describe('Payment Flow Various Prompts/Triggers', () => {
  test('renders Currently Past Due', () => {
    const { container } = render(
      <CurrentlyPastDue open={true} handleAutoPaySetupFail={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
  test('renders Currently Enrolled AutoPay', () => {
    const { container } = render(<CurrentlyEnrolledAutoPay open={true} />);
    expect(container).toMatchSnapshot();
  });
  test('renders Confirm Payment Details', () => {
    const { container } = render(
      <ConfirmPaymentDetails
        open={true}
        onSuccess={() => {}}
        onClose={() => {}}
        chosenAccount={{
          accountType: 'Checking',
          accountNumber: '12340378',
          routingNumber: '12340378',
          isPrimary: true,
        }}
        chosenAmount={1000}
        chosenDate={'1/17/2021'}
        isAutoPaySetup={true}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  test('renders PreExisting Payment Scheduled', () => {
    const { container } = render(<PreExistingPaymentScheduled open={true} />);
    expect(container).toMatchSnapshot();
  });
  test('renders Loading Data Error', () => {
    const { container } = render(<LoadingDataError open={true} onClose={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  test('renders You Will Still Owe / Additional Amount Prompt', () => {
    const { container } = render(
      <AdditionalAmountPrompt
        confirmDrawerOpen={true}
        handleAmountChosen={() => {}}
        amount={1000}
        totalDueAmount={5000}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  test('renders Pay From Account', () => {
    const { container } = render(
      <PayFromAccountPrompt
        open={true}
        handleChosenAccount={() => {}}
        handleCreateNewAccount={() => {}}
        dueDate={'1/17/2021'}
        accounts={[
          { type: 'Checking', number: '12340378' },
          { type: 'Saving', number: '987654321' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  test('renders AutoPay Error State', () => {
    const { container } = render(<AutoPayErrorState onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  /* - temp disabled to discuss tests w/ new Date()
  test('renders Select Payment Date Prompt', () => {
    const { container } = render(
      <SelectPaymentDatePrompt
        open={true}
        onClose={() => {}}
        setChosenDate={() => {}}
        dueDate={'1/17/2021'}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  */
});
