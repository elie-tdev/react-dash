import React from 'react';

import { PayFromAccountPrompt } from '@/components/SubmitPaymentModal/prompts';
import { render } from '@/utils/custom-render';

describe('Pay From Account Prompt', () => {
  test('renders Pay From Account', () => {
    const { container } = render(
      <PayFromAccountPrompt
        open={true}
        handleChosenAccount={() => {}}
        handleCreateNewAccount={() => {}}
        dueDate={'1/17/2021'}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
