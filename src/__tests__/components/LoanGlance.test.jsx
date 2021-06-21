import React from 'react';

import { fireEvent, render } from '@/utils/custom-render';
import { LoanGlance } from '@/components/LoanGlance';
import { loanStateQueryMock, loanStateQueryPastDueUserMock } from '@/fixtures/test_data';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
}));

describe('LoanGlance Component', () => {
  test('renders LoanGlance component by Current User', () => {
    const { container } = render(<LoanGlance />, { mocks: [loanStateQueryMock] });
    expect(container).toMatchSnapshot();
  });

  test('renders LoanGlance component by PastDue User', () => {
    const { container } = render(<LoanGlance />, { mocks: [loanStateQueryPastDueUserMock] });
    expect(container).toMatchSnapshot();
  });

  test('renders LoanGlance component click on Balance', async () => {
    const handleClick = jest.fn();
    const { container } = render(<LoanGlance isBalanceScreen={false} onClick={handleClick()} />, {
      mocks: [loanStateQueryMock],
    });
    const arrowIcon = await container.getElementsByTagName('svg');
    await expect(arrowIcon).toHaveLength(4);
    await fireEvent.click(arrowIcon[0]);
    expect(container).toMatchSnapshot();
  });
});
