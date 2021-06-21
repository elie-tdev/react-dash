import React from 'react';

import Preferences from '@/screens/Preferences';
import { render } from '@/utils/custom-render';

describe('Preferences Screen', () => {
  test('renders Preferences screen', () => {
    const { container } = render(<Preferences />);
    expect(container).toMatchSnapshot();
  });
});
