import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/utils/custom-render';
import EnrollInAutoPay from '@/components/PaymentView/EnrollInAutoPay';

describe('EnrollInAutoPay Component', () => {
  test('renders EnrollInAutoPay', () => {
    const mock = jest.fn();
    const { container } = render(<EnrollInAutoPay onEnrollInAutoPay={mock} />);
    userEvent.click(screen.getByText('Enroll in AutoPay'));
    expect(mock.mock.calls).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
});
