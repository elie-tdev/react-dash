import React from 'react';

import { render } from '@/utils/custom-render';
import { Loader } from '@/components/Loader';

describe('Loader Component', () => {
  test('renders Loader component', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
