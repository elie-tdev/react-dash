import React from 'react';

import { Header } from '@/components/Header';
import { render, fireEvent, cleanup } from '@/utils/custom-render';
import { initializeUserMock } from '@/fixtures/test_data';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ loanNumber: '337720' }),
}));

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test('tests header with desktop menu', async () => {
    const { container, findByText } = render(<Header />, {
      mocks: [initializeUserMock],
    });

    expect(await findByText('Customer Dashboard')).toBeVisible();
    expect(await findByText('Loan Overview')).toBeVisible();
    expect(await findByText('Balance Detail')).toBeVisible();
    expect(await findByText('Payment History')).toBeVisible();
    expect(await findByText('Statements')).toBeVisible();

    expect(container).toMatchSnapshot();
  });

  test('tests header with menu items', async () => {
    const goToPath = jest.fn();
    const { container, findByText, findAllByTestId } = render(
      <Header onClick={() => goToPath()} />,
      {
        mocks: [initializeUserMock],
      },
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('Customer Dashboard')).toBeVisible();

    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[0]);
    expect(container).toMatchSnapshot();
  });

  test('tests click on LoanOverview', async () => {
    const goToPath = jest.fn();
    goToPath.mockImplementation(() => {});
    const { findAllByTestId } = render(<Header onClick={goToPath()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));

    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[0]);
    await expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('tests click on Balance', async () => {
    const goToPath = jest.fn();
    goToPath.mockImplementation(() => {});
    const { findAllByTestId } = render(<Header onClick={goToPath()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[1]);
    await expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('tests click on Payment History', async () => {
    const goToPath = jest.fn();
    goToPath.mockImplementation(() => {});
    const { findAllByTestId } = render(<Header onClick={goToPath()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[2]);
    await expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('tests click on Statements', async () => {
    const goToPath = jest.fn();
    goToPath.mockImplementation(() => {});
    const { findAllByTestId } = render(<Header onClick={goToPath()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[3]);
    await expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('tests click on Preferences', async () => {
    const goToPath = jest.fn();
    goToPath.mockImplementation(() => {});
    const { findAllByTestId } = render(<Header onClick={goToPath()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[4]);
    await expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('tests click on Log Out', async () => {
    const handleClick = jest.fn();
    const { findAllByTestId } = render(<Header onClick={handleClick()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const icons = await findAllByTestId('NavigationMenuItem-desktop');
    await expect(icons).toHaveLength(6);
    await fireEvent.click(icons[5]);
    await expect(handleClick).toHaveBeenCalled();
  });

  test('tests open Menu', async () => {
    const handleClick = jest.fn();

    const { findByTestId } = render(<Header onClick={handleClick()} />, {
      mocks: [initializeUserMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const menuIconContainer = await findByTestId('MenuIconContainer');
    await fireEvent.click(menuIconContainer);
    await expect(handleClick).toHaveBeenCalled();
  });
});
