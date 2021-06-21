import React from 'react';

import { render } from '@/utils/custom-render';
import { Pagination } from '@/components';

describe('Pagination', () => {
  test('Renders', () => {
    const { container } = render(<Pagination />);
    expect(container).toMatchSnapshot();
  });
});
