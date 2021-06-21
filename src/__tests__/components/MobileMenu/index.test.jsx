import React from 'react';
import merge from 'deepmerge';

import { render, cleanup, fireEvent } from '@/utils/custom-render';
import { MobileMenu } from '@/components';
import { initializeUserMock, MOCK_BANK_ACCOUNTS } from '@/fixtures/test_data';

jest.mock('@/customHooks/useBankAccounts', () => () => MOCK_BANK_ACCOUNTS);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('MobileMenu', () => {
  afterEach(() => {
    cleanup();
  });

  test("renders a capitalized greeting with the user's first name if they have one", async () => {
    const { container, findByText } = render(<MobileMenu />, {
      menuContextProviderProps: {
        isMenuOpen: true,
        routeParams: { loanNumber: '337720' },
      },
      mocks: [initializeUserMock],
    });

    expect(container).toMatchSnapshot();
    expect(await findByText('Welcome back, Rick!')).toBeVisible();
  });

  test("renders a capitalized greeting with the user's first name even if they have multiple first names", async () => {
    const { container, findByText } = render(<MobileMenu />, {
      menuContextProviderProps: {
        isMenuOpen: true,
        routeParams: { loanNumber: '337720' },
      },
      mocks: [
        merge(initializeUserMock, {
          result: {
            data: {
              Contacts_Get: {
                payload: {
                  data: {
                    Firstname1: 'RICKY ticky',
                  },
                },
              },
            },
          },
        }),
      ],
    });

    expect(container).toMatchSnapshot();
    expect(await findByText('Welcome back, Ricky Ticky!')).toBeVisible();
  });

  test('renders a generalized greeting if the user has no first name', async () => {
    const { container, findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true },
    });

    expect(container).toMatchSnapshot();
    expect(await findByText('Welcome back!')).toBeVisible();
  });

  test('clicking on the preferences link takes the user to the preferences page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });

    fireEvent.click(await findByText('Preferences'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/preferences');
  });

  test('clicking on the loanoverview link takes the user to the loanoverview page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });
    fireEvent.click(await findByText('Loan Overview'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720');
  });

  test('clicking on the Balance Detail link takes the user to the Balance Detail page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });
    fireEvent.click(await findByText('Balance Detail'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/balance');
  });

  test('clicking on the Payment History link takes the user to the Payment History page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });
    fireEvent.click(await findByText('Payment History'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/payments');
  });

  test('clicking on the Statements link takes the user to the Statements page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });
    fireEvent.click(await findByText('Statements'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/statements');
  });

  test('clicking on the Help Center link takes the user to the Help Center page', async () => {
    const { findByText } = render(<MobileMenu />, {
      menuContextProviderProps: { isMenuOpen: true, routeParams: { loanNumber: '337720' } },
    });
    fireEvent.click(await findByText('Help Center'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/helpCenter');
  });
});
