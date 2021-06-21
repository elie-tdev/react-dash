import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PaymentAccountsHeader from '@/screens/PaymentAccountsScreen/PaymentAccountsHeader';
import { render, fireEvent } from '@/utils/custom-render';

jest.mock('@material-ui/core/useMediaQuery');

const mockHistoryBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    goBack: mockHistoryBack,
  }),
}));

describe('PaymentAccountsHeader', () => {
  test('renders PaymentAccountsHeader', () => {
    const { container } = render(<PaymentAccountsHeader />);
    expect(container).toMatchSnapshot();
  });

  test('onClick on AddIcon', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    const handleClick = jest.fn();

    const { container } = render(
      <PaymentAccountsHeader
        onClick={handleClick()}
        setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    const buttons = container.getElementsByTagName('button');
    await expect(buttons).toHaveLength(2);
    await fireEvent.click(buttons[0]);
    await expect(handleClick).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('onClick on BackIcon in mobile view', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    useMediaQuery.mockReturnValue(theme => theme.breakpoints.down('xs'));

    const { container } = render(
      <PaymentAccountsHeader setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen} />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    const buttons = container.getElementsByTagName('svg');
    await expect(buttons).toHaveLength(3);
    await fireEvent.click(buttons[0]);
    await expect(mockHistoryBack).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('onClick on AddIcon in mobile view', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    const handleClick = jest.fn();
    useMediaQuery.mockReturnValue(theme => theme.breakpoints.down('xs'));

    const { container } = render(
      <PaymentAccountsHeader
        onClick={handleClick()}
        setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    const buttons = container.getElementsByTagName('svg');
    await expect(buttons).toHaveLength(3);
    await fireEvent.click(buttons[2]);
    await expect(handleClick).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('onClick on AddIcon in desktop view', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    const handleClick = jest.fn();

    const { container } = render(
      <PaymentAccountsHeader
        onClick={handleClick()}
        setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    const buttons = container.getElementsByTagName('svg');
    await expect(buttons).toHaveLength(2);
    await fireEvent.click(buttons[1]);
    await expect(handleClick).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });
});
