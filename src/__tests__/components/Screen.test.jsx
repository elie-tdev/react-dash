import React from 'react';

import { Screen } from '@/components/Screen';
import { render, waitFor } from '@/utils/custom-render';

describe('Screen Component', () => {
  test('renders without loan select', async () => {
    const { container } = render(<Screen title="Hello" loanSelect={true} />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
