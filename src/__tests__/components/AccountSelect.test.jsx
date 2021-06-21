import React from 'react';

import { LoanSelect } from '@/components';
import { render } from '@/utils/custom-render';

describe('LoanSelect Component', () => {
  test('renders LoanSelect component', () => {
    const { container } = render(<LoanSelect />);
    expect(container).toMatchSnapshot();
  });
});
