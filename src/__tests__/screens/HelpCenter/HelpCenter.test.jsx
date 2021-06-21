import React from 'react';

import HelpCenter from '@/screens/HelpCenter/HelpCenter';
import { render, cleanup } from '@/utils/custom-render';
import { queries } from '@/gql';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    loanNumber: '337720',
  }),
}));

const getLoanFplus = {
  request: {
    query: queries.ContactUs,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: {
      Loans_Get: {
        payload: {
          data: {
            Portfolio_Code_Id: 0,
          },
        },
      },
    },
  },
};

const getLoanCplus = {
  request: {
    query: queries.ContactUs,
    variables: {
      loan_id: '337720',
    },
  },
  result: {
    data: {
      Loans_Get: {
        payload: {
          data: {
            Portfolio_Code_Id: 1,
          },
        },
      },
    },
  },
};

describe('HelpCenter Screen', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders HelpCenter screen, fplus', async () => {
    const { findByText, container } = render(<HelpCenter />, {
      mocks: [getLoanFplus],
    });
    expect(await findByText('Customer Service')).toBeVisible();
    expect(await findByText('FreedomPlus')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
  test('renders HelpCenter screen, cplus', async () => {
    const { findByText, container } = render(<HelpCenter />, {
      mocks: [getLoanCplus],
    });
    expect(await findByText('Consolidation Plus')).toBeVisible();
    expect(await findByText('Customer Service')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
