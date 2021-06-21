import React from 'react';
import userEvent from '@testing-library/user-event';

import Statments from '@/screens/Statements';
import { render, cleanup, screen } from '@/utils/custom-render';
import { queries } from '@/gql';
import { MOCK_DATA_STATEMENTS, MOCK_DATA_STATEMENT_CURRENT } from '@/fixtures/test_data';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '367713',
  }),
}));

const statementsQueryMock = {
  request: {
    query: queries.Statements,
    variables: {
      loan_id: '367713',
    },
  },
  result: {
    data: MOCK_DATA_STATEMENTS,
  },
};

const statementsQueryMockCurrent = {
  request: {
    query: queries.Statements,
    variables: {
      loan_id: '367713',
    },
  },
  result: {
    data: MOCK_DATA_STATEMENT_CURRENT,
  },
};

const statementsQueryErrorMock = {
  request: {
    query: queries.Statements,
    variables: {
      loan_id: '367713',
    },
  },
  error: new Error('Ohh Ohh!'),
};

describe('Statements Screen', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders Statements screen with valid data', async () => {
    const { container } = render(<Statments />, { mocks: [statementsQueryMock] });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container).toMatchSnapshot();
  });

  test('renders Statements screen with valid statements data', async () => {
    const { findAllByText } = render(<Statments />, { mocks: [statementsQueryMock] });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findAllByText('Statements')).toHaveLength(1);
    expect(await findAllByText('Remaining Balance')).toHaveLength(6);
    expect(await findAllByText('Date Due')).toHaveLength(6);
  });

  test('renders Statements screen with invalid statements data', async () => {
    const { findAllByText } = render(<Statments />, { mocks: [statementsQueryErrorMock] });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findAllByText('Statements')).toHaveLength(1);
  });

  test('renders Statements screen with current statement', async () => {
    const { findByText, findAllByText } = render(<Statments />, {
      mocks: [statementsQueryMockCurrent],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findAllByText('Statements')).toHaveLength(1);
    expect(await findAllByText('Remaining Balance')).toHaveLength(1);
    expect(await findAllByText('Date Due')).toHaveLength(1);
    expect(await findByText('View')).toBeVisible();
  });

  test('renders Statements screen and click on the View button', async () => {
    const setIsViewStatementModalVisible = jest.fn();
    const manageViewStatements = jest.fn(() => {
      setIsViewStatementModalVisible(true);
    });
    const { findByText, findAllByText } = render(
      <Statments onViewStatement={manageViewStatements} />,
      {
        mocks: [statementsQueryMockCurrent],
      },
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findAllByText('Statements')).toHaveLength(1);
    expect(await findAllByText('Date Due')).toHaveLength(1);
    expect(await findAllByText('Remaining Balance')).toHaveLength(1);
    expect(await findByText('View')).toBeVisible();
    const button = screen.getByRole('button', { name: /View/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(await findByText('Preview')).toBeVisible();
  }, 10000);
});
