import React from 'react';

import { render } from '@/utils/custom-render';
import PaymentLabelValue from '@/components/PaymentView/PaymentLabelValue';

describe('PaymentLabelValue Component', () => {
  test('Renders PaymentLabelValue', () => {
    const { container } = render(
      <PaymentLabelValue paymentType="paymentDue" paymentAmount="500" paymentDate="Jan 12, 2021" />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders PaymentLabelValue if paymentType is autoPayEnrolled', () => {
    const { container } = render(
      <PaymentLabelValue
        paymentType="autoPayEnrolled"
        paymentAmount="500"
        paymentDate="Jan 12, 2021"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders PaymentLabelValue if paymentType is not passed', () => {
    const { container } = render(
      <PaymentLabelValue paymentAmount="500" paymentDate="Jan 12, 2021" />,
    );
    expect(container).toMatchSnapshot();
  });
});
