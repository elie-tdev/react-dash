import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Footer } from '@/components/Footer';
import { fireEvent, render } from '@/utils/custom-render';
import { initializeUserMock } from '@/fixtures/test_data';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('@material-ui/core/useMediaQuery');

describe('Footer Component', () => {
  test('renders footer component', async () => {
    const { container } = render(<Footer title="Hello" />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(container).toMatchSnapshot();
  });

  test('click on Contact Us link from footer in mobile view', async () => {
    useMediaQuery.mockReturnValue(theme => theme.breakpoints.down('xs'));
    const handleClick = jest.fn();
    const { container, getAllByTestId } = render(<Footer onClick={handleClick()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    const button = await getAllByTestId('SecondaryButton');
    await fireEvent.click(button[0]);
    await expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('click on Contact Us link from footer in desktop view', async () => {
    const handleClick = jest.fn();
    const { container, getAllByTestId } = render(<Footer onClick={handleClick()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    const button = await getAllByTestId('SecondaryButton');
    await expect(button).toHaveLength(6);
    await fireEvent.click(button[5]);
    await expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
