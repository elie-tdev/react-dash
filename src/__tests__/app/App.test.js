import React from 'react';

import App from '@/App';
import { render } from '@/utils/custom-render';

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    user: {
      [`https://${process.env.REACT_APP_AUTH0_AUDIENCE}/metadata`]: {
        : {
          cifno: '206048',
        },
      },
    },
    loginWithRedirect: () => null,
    getAccessTokenSilently: () => null,
  }),
}));

describe('App Component', () => {
  test('renders log in', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
