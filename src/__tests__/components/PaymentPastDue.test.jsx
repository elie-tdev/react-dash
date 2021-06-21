import React from 'react';

import { render, fireEvent } from '@/utils/custom-render';
import { PaymentPastDue } from '@/components';

describe('PaymentPastDue', () => {
  test('Renders', async () => {
    const { container, findByText } = render(<PaymentPastDue pastDueDays={12} />);
    expect(container).toMatchSnapshot();
    fireEvent.click(await findByText('Pay Past Due Amount'));
    expect(await findByText('Schedule a Payment')).toBeVisible();
  });
});
