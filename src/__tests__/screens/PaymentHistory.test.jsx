import React from 'react';
import * as Apollo from '@apollo/client';

import PaymentHistory from '@/screens/PaymentHistory';
import { render, cleanup } from '@/utils/custom-render';
import { loanStateQueryMock, paymentHistoryQueryMockCurrent } from '@/fixtures/test_data';
import useLoanState from '@/customHooks/useLoanState';
import useOneTimePayments from '@/customHooks/useOneTimePayments';
jest.mock('@/customHooks/useLoanState');
jest.mock('@/customHooks/useOneTimePayments');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
}));

const mockUseLoanStateValue = {
  isAutoPay: false,
  isCurrent: true,
  isBilled: false,
  automatedPaymentRowIds: [],
  nextPayment: {},
};

describe('PaymentHistory Screen', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useLoanState.mockReturnValue(mockUseLoanStateValue);
    useOneTimePayments.mockReturnValue({
      oneTimePayments: [],
    });
  });

  test('renders PaymentHistory screen', async () => {
    const mocks = [loanStateQueryMock, paymentHistoryQueryMockCurrent];
    await new Promise(resolve => setTimeout(resolve, 0));
    const { container } = render(<PaymentHistory />, {
      mocks: mocks,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container).toMatchSnapshot();
  });
  test('renders PaymentHistory screen, pastDue, not billed, debug', async () => {
    useLoanState.mockReturnValue({
      ...mockUseLoanStateValue,
      isCurrent: false,
      isBilled: false,
      isAutoPay: false,
      pastDueDays: 10,
      pastDueAmount: 500,
      dueAmount: 1000,
    });
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: undefined,
        data: paymentHistoryQueryMockCurrent.result.data,
        refetch: jest.fn(),
      };
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const { getByTestId, container } = render(<PaymentHistory />);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(getByTestId('PastDueCard')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test('renders PaymentHistory screen, pastDue, billed', async () => {
    const Date_Due = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    useLoanState.mockReturnValue({
      ...mockUseLoanStateValue,
      isCurrent: false,
      isAutoPay: false,
      isBilled: false,
      pastDueDays: 10,
      pastDueAmount: 500,
      dueAmount: 1000,
      nextPayment: {
        Row_Id: 1,
        Transaction_Code: 204,
        Date_Due,
        Payment_Amount: 500,
      },
    });
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: undefined,
        data: paymentHistoryQueryMockCurrent.result.data,
        refetch: jest.fn(),
      };
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const { getByTestId } = render(<PaymentHistory />);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(getByTestId('PastDueCard')).toBeInTheDocument();
  });
  test('renders PaymentHistory screen, isAutoPay, no extra one time payment', async () => {
    useLoanState.mockReturnValue({
      ...mockUseLoanStateValue,
      isAutoPay: true,
    });
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: undefined,
        data: paymentHistoryQueryMockCurrent.result.data,
        refetch: jest.fn(),
      };
    });
    const mocks = [paymentHistoryQueryMockCurrent];
    await new Promise(resolve => setTimeout(resolve, 0));
    const { getByTestId, getByText, container } = render(<PaymentHistory />, {
      mocks: mocks,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(getByTestId('AutoPayCard')).toBeInTheDocument();
    expect(await getByText('$650.00')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders PaymentHistory screen, extra one time payment, mocks', async () => {
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: undefined,
        data: paymentHistoryQueryMockCurrent.result.data,
        refetch: jest.fn(),
      };
    });
    jest.mock('@/customHooks', () => ({
      useLoanState: () => {
        return {
          isAutoPay: false,
          isCurrent: false,
          isBilled: false,
          automatedPaymentRowIds: [1190007],
          nextPayment: {
            Row_Id: 1,
            Transaction_Code: 204,
            Date_Due: new Date(),
            Payment_Amount: 500,
          },
        };
      },
    }));
    const { getByText, container } = render(<PaymentHistory />);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getByText('$650.00')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
