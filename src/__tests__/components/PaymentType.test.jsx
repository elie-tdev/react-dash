import React from 'react';

import { render } from '@/utils/custom-render';
import { PaymentType } from '@/components';

describe('PaymentType', () => {
  test('Renders', () => {
    const { container } = render(<PaymentType type={'autoPay'} />);
    expect(container).toMatchSnapshot();
  });
});
