import React from 'react';

import { render } from '@/utils/custom-render';
import { DesktopMenuItem } from '@/components';

describe('DesktopMenuItem', () => {
  test('renders', () => {
    const { container } = render(<DesktopMenuItem />);
    expect(container).toMatchSnapshot();
  });

  test('renders with an active item name', () => {
    const { container } = render(<DesktopMenuItem activeItemName />);
    expect(container).toMatchSnapshot();
  });
});
