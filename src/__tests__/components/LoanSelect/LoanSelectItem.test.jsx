import React from 'react';

import { render } from '@/utils/custom-render';
import { LoanSelectItem } from '@/components';

const loan = {
  Current_Payoff_Balance: 10000,
  Total_Current_Due_Balance: 500,
};

describe('LoanSelectItem', () => {
  test('Renders', () => {
    const { container } = render(<LoanSelectItem loan={loan} />);
    expect(container).toMatchSnapshot();
  });
});
