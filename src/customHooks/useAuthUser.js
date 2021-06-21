import { useAuth0 } from '@auth0/auth0-react';

import { REACT_APP_AUTH0_AUDIENCE } from '@/properties';

const useAuthUser = () => {
  const { user: authUser } = useAuth0();

  if (authUser) {
    const metadata = authUser[`https://${REACT_APP_AUTH0_AUDIENCE}/metadata`];

    return {
      email: authUser.email,
      familyName: authUser.family_name,
      givenName: authUser.given_name,
      contactId: metadata?.?.cifno,
    };
  }

  return null;
};

export default useAuthUser;
