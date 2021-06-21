import React from 'react';

import { render } from '@/utils/custom-render';
import PaymentInfo from '@/components/PaymentView/PaymentInfo';
test('Renders', () => {
  const { container } = render(<PaymentInfo paymentAmount="500" paymentDate="Jan 12, 2021" />);
  expect(container).toMatchSnapshot();
});
