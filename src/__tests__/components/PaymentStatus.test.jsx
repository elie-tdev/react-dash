import React from 'react';

import { render } from '@/utils/custom-render';
import { PaymentStatus } from '@/components';

describe('PaymentStatus', () => {
  test('Renders', () => {
    const { container } = render(<PaymentStatus status="paid" />);
    expect(container).toMatchSnapshot();
  });
});
