import React from 'react';

import { render, cleanup } from '@/utils/custom-render';
import { StatementTable } from '@/components';
import { queries } from '@/gql';
import { MOCK_DATA_STATEMENTS } from '@/fixtures/test_data';

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

describe('StatementTable Component', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders StatementTable component', async () => {
    const { findAllByText } = render(
      <StatementTable allStatements={MOCK_DATA_STATEMENTS.Loans_GetStatements.payload.data} />,
      { mocks: [statementsQueryMock] },
    );
    expect(await findAllByText('Remaining Balance')).toHaveLength(5);
    expect(await findAllByText('Date Due')).toHaveLength(5);
  });

  test('renders StatementTable component on onViewStatement', async () => {
    const setSelectedStatementIndex = jest.fn();
    const setIsViewStatementModalVisible = jest.fn();

    const manageOnViewStatement = jest.fn((index = 0) => {
      setSelectedStatementIndex(index);
      setIsViewStatementModalVisible(val => !val);
    });
    const { getAllByTestId } = render(
      <StatementTable
        allStatements={MOCK_DATA_STATEMENTS.Loans_GetStatements.payload.data}
        onViewStatement={manageOnViewStatement}
      />,
      { mocks: [statementsQueryMock] },
    );

    expect(getAllByTestId('SecondaryButton')).toHaveLength(5);
  });
});
