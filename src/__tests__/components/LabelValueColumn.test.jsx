import React from 'react';

import { render } from '@/utils/custom-render';
import { LabelValueColumn } from '@/components/LabelValueColumn';

test('Renders', () => {
  const { container } = render(<LabelValueColumn label="Hello" value="World" />);
  expect(container).toMatchSnapshot();
});
