import React from 'react';
import * as Apollo from '@apollo/client';
import { fireEvent } from '@testing-library/dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ChangeAddressScreen } from '@/screens/ChangeAddressScreen';
import { cleanup, render } from '@/utils/custom-render';
import { queries } from '@/gql';
import { MOCK_DATA_CHANGE_ADDRESS } from '@/fixtures/test_data';

const changeAddressQueryMock = {
  request: {
    query: queries.ChangeAddress,
    variables: {
      contact_id: '412981',
    },
  },
  result: {
    data: MOCK_DATA_CHANGE_ADDRESS,
  },
};

jest.mock('@material-ui/core/useMediaQuery');

describe('ChangeAddressScreen Screen', () => {
  beforeEach(() => {
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: undefined,
        data: MOCK_DATA_CHANGE_ADDRESS,
        refetch: jest.fn(),
      };
    });
  });
  afterEach(() => {
    cleanup();
  });

  test('renders ChangeAddressScreen screen', async () => {
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container).toMatchSnapshot();
  });

  test('if query is taking time to get data', async () => {
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: true,
        error: undefined,
        data: undefined,
        refetch: jest.fn(),
      };
    });

    const { container, getByTestId } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(getByTestId('progressbar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('if query is returning error', async () => {
    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => {
      return {
        loading: false,
        error: true,
        data: undefined,
        refetch: jest.fn(),
      };
    });

    const { findByText } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await findByText('That address could not found.')).toBeInTheDocument();
  });

  test('onClick of Edit Address', async () => {
    const setIsEditable = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isEditable = true) => [isEditable, setIsEditable]);
    const { getAllByText, findByText, getAllByTestId } = render(
      <ChangeAddressScreen onClick={handleClick} />,
      {
        mocks: [changeAddressQueryMock],
      },
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getAllByText('Edit Address')).toHaveLength(1);
    fireEvent.click(await findByText('Edit Address'));
    expect(setIsEditable).toBeCalled();
  });

  test('onClick of button', async () => {
    const setIsEditable = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isEditable = true) => [isEditable, setIsEditable]);
    const { container, getAllByTestId } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getAllByTestId(/SecondaryButton/i)).toHaveLength(7);
    fireEvent.click(await getAllByTestId(/SecondaryButton/i)[0]);
    expect(setIsEditable).toBeCalled();
    expect(await getAllByTestId(/PrimaryButton/i)).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('onChange of addressLine1 input', async () => {
    const setAddressLine1 = jest.fn();
    const handleChange = jest.spyOn(React, 'useState');
    handleChange.mockImplementation(addressLine1 => [addressLine1, setAddressLine1]);
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputFields = container.getElementsByTagName('input');
    expect(inputFields).toHaveLength(5);
    const addLine1 = container.querySelector('input[id="addLine1"]');
    fireEvent.change(addLine1, { target: { value: 'q' } });
    expect(handleChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('onChange of addressLine2 input', async () => {
    const setAddressLine2 = jest.fn();
    const handleChange = jest.spyOn(React, 'useState');
    handleChange.mockImplementation(addressLine2 => [addressLine2, setAddressLine2]);
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputFields = container.getElementsByTagName('input');
    expect(inputFields).toHaveLength(5);
    const addLine2 = container.querySelector('input[id="addLine2"]');
    fireEvent.change(addLine2, { target: { value: 'q' } });
    expect(handleChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('onChange of city input', async () => {
    const setCity = jest.fn();
    const handleChange = jest.spyOn(React, 'useState');
    handleChange.mockImplementation(city => [city, setCity]);
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputFields = container.getElementsByTagName('input');
    expect(inputFields).toHaveLength(5);
    const city = container.querySelector('input[id="city"]');
    fireEvent.change(city, { target: { value: 'San Bruno' } });
    expect(handleChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('onChange of state input', async () => {
    const setState = jest.fn();
    const handleChange = jest.spyOn(React, 'useState');
    handleChange.mockImplementation(state => [state, setState]);
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputFields = container.getElementsByTagName('input');
    expect(inputFields).toHaveLength(5);
    const state = container.querySelector('input[id="state"]');
    fireEvent.change(state, { target: { value: 'CA' } });
    expect(handleChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('onChange of zipCode input', async () => {
    const setZipCode = jest.fn();
    const handleChange = jest.spyOn(React, 'useState');
    handleChange.mockImplementation(zipCode => [zipCode, setZipCode]);
    const { container } = render(<ChangeAddressScreen />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputFields = container.getElementsByTagName('input');
    expect(inputFields).toHaveLength(5);
    const zipCode = container.querySelector('input[id="zipCode"]');
    fireEvent.change(zipCode, { target: { value: '37624' } });
    expect(handleChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  test('onClick of Edit Address in mobile view', async () => {
    useMediaQuery.mockReturnValue(true);
    const setIsEditable = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((isEditable = true) => [isEditable, setIsEditable]);
    const { getAllByText, findByText } = render(<ChangeAddressScreen onClick={handleClick} />, {
      mocks: [changeAddressQueryMock],
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await getAllByText('Edit Address')).toHaveLength(1);
    fireEvent.click(await findByText('Edit Address'));
    expect(setIsEditable).toBeCalled();
  });
});
