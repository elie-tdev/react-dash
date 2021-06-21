import React from 'react';

import { render, cleanup } from '@/utils/custom-render';
import { queries } from '@/gql';
import { StatementDrawer } from '@/components';
import { MOCK_DATA_STATEMENT_FILE, MOCK_DATA_STATEMENT } from '@/fixtures/test_data';

const statementsFileQueryMock = {
  request: {
    query: queries.StatementFile,
    variables: {
      statement_id: 2105799,
    },
  },
  result: {
    data: MOCK_DATA_STATEMENT_FILE,
  },
};

describe('StatementModal Component', () => {
  afterEach(() => {
    cleanup();
  });

  const statement = MOCK_DATA_STATEMENT;

  test('renders StatementModal component when statement has valid Data', async () => {
    const { findByText } = render(<StatementDrawer open={true} statement={statement} />, {
      mocks: [statementsFileQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('View Statement - July 2018')).toBeVisible();
    expect(await findByText('Date Due')).toBeVisible();
  });
});
