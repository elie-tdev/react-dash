import React from 'react';
import TimeAgo from 'javascript-time-ago';

import { render } from '@/utils/custom-render';
import PastDueCard from '@/components/PaymentView/PastDueCard';

describe('PastDueCard Component', () => {
  test('renders UpcomingPayment on Payment History Screen', () => {
    const { container } = render(
      <PastDueCard
        totalCurrentDueBalance="1000"
        totalPastDueBalance={500}
        daysPastDue={new TimeAgo('en-US').format(Date.now() + 3 * 24 * 60 * 60 * 1000)}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
