import React from 'react';

import { render } from '@/utils/custom-render';
import { MobileMenuItem } from '@/components';

describe('MobileMenuItem', () => {
  test('renders', () => {
    const { container } = render(<MobileMenuItem />);
    expect(container).toMatchSnapshot();
  });

  test('renders with an active item name', () => {
    const { container } = render(<MobileMenuItem activeItemName />);
    expect(container).toMatchSnapshot();
  });
});
