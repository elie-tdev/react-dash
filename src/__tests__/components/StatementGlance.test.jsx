import React from 'react';

import { render, cleanup } from '@/utils/custom-render';
import { StatementGlance } from '@/components';
import { MOCK_DATA_STATEMENT } from '@/fixtures/test_data';

describe('StatemenGlance Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders StatementGlance component when statement has valid Data', () => {
    const onViewStatement = jest.fn();
    const statement = MOCK_DATA_STATEMENT;
    const { getByText } = render(
      <StatementGlance
        statementDate={statement.Statement_Date}
        statementDueDate={statement.Statement_Due_Date}
        remainingBalance={statement.Current_Payoff_Balance}
        statementId={statement.Statement_Row_Id}
        onClick={onViewStatement}
      />,
    );
    expect(getByText('View')).toBeVisible();
    expect(getByText('Remaining Balance')).toBeVisible();
    expect(getByText('Date Due')).toBeVisible();
    expect(getByText('Statement No.')).toBeVisible();
    expect(getByText('#2105799')).toBeVisible();
  });
});
