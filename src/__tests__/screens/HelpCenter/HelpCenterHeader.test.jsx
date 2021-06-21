import React from 'react';

import HelpCenterHeader from '@/screens/HelpCenter/HelpCenterHeader';
import { render } from '@/utils/custom-render';
import { queries } from '@/gql';

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

describe('HelpCenterHeader', () => {
  test('renders HelpCenterHeader', async () => {
    const { findByText, container } = render(<HelpCenterHeader />, {
      mocks: [getLoanFplus],
    });
    expect(await findByText('Contact Us')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
