import React from 'react';

import { fireEvent, render } from '@/utils/custom-render';
import PaymentCurrent from '@/components/PaymentView/PaymentCurrent';

describe('Payment Current Component', () => {
  test('Renders', () => {
    const { container } = render(<PaymentCurrent contained dueDate="Jan 12, 2021" />);
    expect(container).toMatchSnapshot();
  });

  test('click on Schedule Additional Payment button', async () => {
    const handleClick = jest.fn();
    const { container, findAllByTestId } = render(
      <PaymentCurrent onClick={handleClick()} contained dueDate="Jan 12, 2021" />,
    );

    const additionalButton = await findAllByTestId('SecondaryButton');
    await fireEvent.click(additionalButton[0]);
    await expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
