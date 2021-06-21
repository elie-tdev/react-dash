// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Let the below statements commented for now, we will delete later if it is not needed.

// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: key => key }),
// }));
TimeAgo.addDefaultLocale(en);

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

window.crypto = { subtle: {} };

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      [`https://${process.env.REACT_APP_AUTH0_AUDIENCE}/metadata`]: {
        : {
          cifno: '206048',
        },
      },
    },
    logout: () => null,
    isAuthenticated: true,
  }),
}));

console.error = jest.fn();
