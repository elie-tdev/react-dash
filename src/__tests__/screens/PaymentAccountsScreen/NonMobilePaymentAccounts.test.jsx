import React from 'react';

import { render, fireEvent } from '@/utils/custom-render';
import NonMobilePaymentAccounts from '@/screens/PaymentAccountsScreen/NonMobilePaymentAccounts';

describe('NonMobilePaymentAccounts', () => {
  test('renders NonMobilePaymentAccounts', () => {
    const { container } = render(<NonMobilePaymentAccounts />);
    expect(container).toMatchSnapshot();
  });

  test('renders NonMobilePaymentAccounts with bank accounts', () => {
    const { container } = render(
      <NonMobilePaymentAccounts
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: true,
          },
        ]}
        x
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('onClick of New Payment Account', async () => {
    const setIsNewPaymentAccountModalOpen = jest.fn();
    const handleClick = jest.fn();

    const { container, getAllByTestId } = render(
      <NonMobilePaymentAccounts
        onClick={handleClick()}
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
    const newPaymentButton = container.querySelector('button[data-testid="PrimaryButton"]');
    expect(await getAllByTestId(/PrimaryButton/i)).toHaveLength(1);
    await fireEvent.click(newPaymentButton);
    expect(handleClick).toHaveBeenCalled();
  });

  test('onClick of Edit Payment', async () => {
    const setEditingAccountIndex = jest.fn();
    const setIsEditPaymentAccountModalOpen = jest.fn();

    const handleClick = jest.fn();

    const { container, getAllByTestId } = render(
      <NonMobilePaymentAccounts
        onClick={handleClick()}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: true,
          },
        ]}
        setEditingAccountIndex={setEditingAccountIndex}
        setIsEditPaymentAccountModalOpen={setIsEditPaymentAccountModalOpen}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    const newPaymentButton = container.querySelector('button[data-testid="SecondaryButton"]');
    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(1);
    await fireEvent.click(newPaymentButton);
    expect(handleClick).toHaveBeenCalled();
  });

  test('onClick of Delete', async () => {
    const setIsDeletionConfirmationModalOpenProp = jest.fn();
    const setEditingAccountIndex = jest.fn();
    const setIsEditPaymentAccountModalOpen = jest.fn();

    const handleClick = jest.fn();

    const { container, getAllByTestId } = render(
      <NonMobilePaymentAccounts
        onClick={handleClick()}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: false,
          },
        ]}
        setIsDeletionConfirmationModalOpenProp={setIsDeletionConfirmationModalOpenProp}
        setEditingAccountIndex={setEditingAccountIndex}
        setIsEditPaymentAccountModalOpen={setIsEditPaymentAccountModalOpen}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    const deleteButton = container.querySelector('button[data-testid="DangerButton"]');
    expect(await getAllByTestId(/DangerButton/i)).toHaveLength(1);
    await fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('visibility of account number', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <NonMobilePaymentAccounts
        onClick={handleClick()}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: false,
          },
        ]}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    const visibilityIcon = container.getElementsByTagName('svg');
    await expect(visibilityIcon).toHaveLength(1);

    await fireEvent.click(visibilityIcon[0]);
    await expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('invisibility of account number', async () => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest
        .fn()
        .mockImplementation((isAccountNumberVisible = true, setIsAccountNumberVisible) => [
          isAccountNumberVisible,
          setIsAccountNumberVisible,
        ]),
    }));

    const handleClick = jest.fn();

    const { container } = render(
      <NonMobilePaymentAccounts
        onClick={handleClick()}
        bankAccounts={[
          {
            routingNumber: '12341234',
            accountNumber: '123412341234',
            accountType: 'Checking',
            isPrimary: false,
          },
        ]}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    const visibilityIcon = container.getElementsByTagName('svg');
    await expect(visibilityIcon).toHaveLength(1);
    await fireEvent.click(visibilityIcon[0]);
    await expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
