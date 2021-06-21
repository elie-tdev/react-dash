import React from 'react';

import { render } from '@/utils/custom-render';
import { LabelValueRow } from '@/components/LabelValueRow';

describe('LabelValueRow Component', () => {
  test('renders LabelValueRow component', () => {
    const { container } = render(<LabelValueRow label="Hello" value="World" />);

    expect(container).toMatchSnapshot();
  });
});
