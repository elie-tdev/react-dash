import React from 'react';

import { fireEvent, render } from '@/utils/custom-render';
import { LoanSelect } from '@/components';

const loan = {
  Acctrefno: '123456',
  Current_Payoff_Balance: 10000,
  Total_Current_Due_Balance: 500,
};

describe('LoanSelect', () => {
  test('Renders a single loan', () => {
    const { container } = render(<LoanSelect loans={[loan]} />);
    expect(container).toMatchSnapshot();
  });

  test('Renders multiple loans', () => {
    const { container } = render(<LoanSelect loans={[loan, loan]} />);
    expect(container).toMatchSnapshot();
  });

  test('onClick of select', async () => {
    const handleSelect = jest.fn();
    const handleClick = jest.fn();
    const { container, getAllByTestId } = render(
      <LoanSelect
        loans={[loan, loan]}
        selectedLoanNumber="337720"
        onSelect={handleSelect()}
        onClick={handleClick()}
      />,
    );
    const button = await getAllByTestId('SecondaryButton');
    await expect(button).toHaveLength(1);
    await fireEvent.click(button[0]);
    await expect(handleClick).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });
});
