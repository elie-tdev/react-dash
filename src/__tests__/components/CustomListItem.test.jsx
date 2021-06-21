import React from 'react';

import { render } from '@/utils/custom-render';
import { CustomListItem } from '@/components/SubmitPaymentModal/components';

describe('Custom List Item component', () => {
  test('renders Custom List Item', () => {
    const { container } = render(
      <CustomListItem
        primary={'primary'}
        secondary={'secondary'}
        value={'value'}
        onChange={() => {}}
        handleAmountChosen={() => {}}
        recommended={true}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
