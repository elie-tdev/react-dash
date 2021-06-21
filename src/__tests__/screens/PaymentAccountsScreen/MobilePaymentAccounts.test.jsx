import React from 'react';

import MobilePaymentAccounts from '@/screens/PaymentAccountsScreen/MobilePaymentAccounts';
import { fireEvent, render } from '@/utils/custom-render';

describe('MobilePaymentAccounts', () => {
  test('renders MobilePaymentAccounts', () => {
    const { container } = render(<MobilePaymentAccounts />);
    expect(container).toMatchSnapshot();
  });

  test('renders MobilePaymentAccounts with bank accounts', () => {
    const { container } = render(
      <MobilePaymentAccounts
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: true,
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('onClick of New Payment Account', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    const { container, getAllByTestId } = render(
      <MobilePaymentAccounts
        onClick={() => setIsNewPaymentAccountModalOpen(true)}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: true,
          },
        ]}
        setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(await getAllByTestId(/PrimaryButton/i)).toHaveLength(1);
    fireEvent.click(await getAllByTestId(/PrimaryButton/i)[0]);
    await expect(setIsNewPaymentAccountModalOpen).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('onClick of Account list item', async () => {
    const setIsEditPaymentAccountModalOpen = jest.fn();
    const setEditingAccountIndex = jest.fn();
    const { container } = render(
      <MobilePaymentAccounts
        onClick={() => {
          setEditingAccountIndex(1);
          setIsEditPaymentAccountModalOpen(true);
        }}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: true,
          },
        ]}
        setIsEditPaymentAccountModalOpen={setIsEditPaymentAccountModalOpen}
        setEditingAccountIndex={setEditingAccountIndex}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));

    const icons = container.querySelector('button[class="MuiButtonBase-root MuiIconButton-root"]');
    fireEvent.click(icons);
    await expect(setEditingAccountIndex).toHaveBeenCalled();
    await expect(setIsEditPaymentAccountModalOpen).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });

  test('onClick of Account list item for non primary account', async () => {
    const setIsEditPaymentAccountModalOpen = jest.fn();
    const setEditingAccountIndex = jest.fn();
    const { container } = render(
      <MobilePaymentAccounts
        onClick={() => {
          setEditingAccountIndex(1);
          setIsEditPaymentAccountModalOpen(true);
        }}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: false,
          },
        ]}
        setIsEditPaymentAccountModalOpen={setIsEditPaymentAccountModalOpen}
        setEditingAccountIndex={setEditingAccountIndex}
      />,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = container.querySelector('button[class="MuiButtonBase-root MuiIconButton-root"]');
    fireEvent.click(icons);
    await expect(setEditingAccountIndex).toHaveBeenCalled();
    await expect(setIsEditPaymentAccountModalOpen).toHaveBeenCalled();
    await expect(container).toMatchSnapshot();
  });
});
