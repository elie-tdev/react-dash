import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { render, fireEvent } from '@/utils/custom-render';
import ChangePasswordScreen from '@/screens/ChangePasswordScreen';

const mockHistoryPush = jest.fn();
const mockHistoryBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryBack,
  }),
}));

jest.mock('@material-ui/core/useMediaQuery');

describe('ChangePasswordScreen Screen', () => {
  test('renders ChangePasswordScreen screen', () => {
    const { container } = render(<ChangePasswordScreen />);
    expect(container).toMatchSnapshot();
  });

  test('renders ChangePasswordScreen screen in a mobile view', () => {
    useMediaQuery.mockReturnValue(true);

    const { container } = render(<ChangePasswordScreen />);
    expect(container).toMatchSnapshot();
  });

  test('takes the user to the help center page when they click the ', async () => {
    const { findAllByText } = render(<ChangePasswordScreen />);

    const contactUsButtons = await findAllByText('Contact Us');
    fireEvent.click(contactUsButtons[0]);
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/loans/337720/helpCenter');
  });

  test('takes the user to Go Back once user click on Back button in mobile view', async () => {
    useMediaQuery.mockReturnValue(true);
    const { container } = render(<ChangePasswordScreen />);
    const backIcon = await container.getElementsByTagName('svg');
    await expect(backIcon).toHaveLength(2);
    await fireEvent.click(backIcon[0]);
    await expect(mockHistoryBack).toHaveBeenCalled();
  });

  test('takes the user to Go Back once user click on Back button', async () => {
    const { container } = render(<ChangePasswordScreen />);
    const backIcon = await container.getElementsByTagName('svg');
    await expect(backIcon).toHaveLength(9);
    await fireEvent.click(backIcon[8]);
    await expect(mockHistoryBack).toHaveBeenCalled();
  });

  test('show divider in mobile view', async () => {
    useMediaQuery.mockReturnValue(theme => theme.breakpoints.down('xs'));
    const { container } = render(<ChangePasswordScreen />);
    const dividerIcon = await container.getElementsByTagName('hr');
    await expect(dividerIcon).toHaveLength(3);
  });
});
