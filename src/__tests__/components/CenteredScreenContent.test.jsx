import React from 'react';

import { render } from '@/utils/custom-render';
import { CenteredScreenContent } from '@/components';

describe('CenteredScreenContent Component', () => {
  test('renders CenteredScreenContent component', () => {
    const { container } = render(
      <CenteredScreenContent>
        <div>hello</div>
      </CenteredScreenContent>,
    );

    expect(container).toMatchSnapshot();
  });
});
