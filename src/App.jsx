import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { useLazyQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  apiUrl,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE,
} from './properties';

import { queries } from '@/gql';
import { LightTheme } from '@/themes';
import { MenuContextProvider } from '@/contexts';
import {
  LoanOverviewScreen,
  PaymentHistoryScreen,
  StatementsScreen,
  PreferencesScreen,
  PaymentAccountsScreen,
  HelpCenterScreen,
  ChangePasswordScreen,
  ChangeAddressScreen,
  BalanceScreen,
} from '@/screens';
import { MobileMenu, CenteredScreenContent, Screen } from '@/components';
import {
  OVERVIEW_ROUTE,
  BALANCE_ROUTE,
  PAYMENTS_ROUTE,
  STATEMENTS_ROUTE,
  PREFERENCES_ROUTE,
  PAYMENT_ACCOUNTS_ROUTE,
  HELP_CENTER_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  CHANGE_ADDRESS_ROUTE,
  LOGOUT_ROUTE,
} from '@/constants/routes';
import { useAuthUser } from '@/customHooks';

const httpLink = createHttpLink({
  uri: `${apiUrl}/graphql`,
});

const App = () => {
  const history = useHistory();
  const match = useRouteMatch('/dashboard/loans/:loanNumber');
  const { contactId } = useAuthUser();

  const [fetchInitialUserData, { data, loading, error }] = useLazyQuery(queries.InitializeUser, {
    variables: { contact_id: contactId },
  });

  useEffect(() => {
    if (contactId) {
      fetchInitialUserData();
    }
  }, [contactId]);

  const loans = useMemo(() => data?.Contacts_GetLoans?.payload?.data || [], [data]);

  const loanNumber = match?.params?.loanNumber;

  useEffect(() => {
    if (
      loans?.length > 0 &&
      (!loanNumber || (loanNumber && !loans?.find(loan => loan.Acctrefno === loanNumber)))
    ) {
      history.push(`/dashboard/loans/${loans[0].Acctrefno}`);
    }
  }, [loans, loanNumber]);

  if (loading) {
    return (
      <Screen>
        <CenteredScreenContent minHeight="75vh">
          <CircularProgress color="primary" />
        </CenteredScreenContent>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <CenteredScreenContent minHeight="75vh">
          <div>{error.message}</div>
        </CenteredScreenContent>
      </Screen>
    );
  }

  return (
    <>
      <MobileMenu />
      <Switch>
        <Route exact path={OVERVIEW_ROUTE}>
          <LoanOverviewScreen />
        </Route>
        <Route exact path={BALANCE_ROUTE}>
          <BalanceScreen />
        </Route>
        <Route path={PAYMENTS_ROUTE}>
          <PaymentHistoryScreen />
        </Route>
        <Route path={STATEMENTS_ROUTE}>
          <StatementsScreen />
        </Route>
        <Route path={PAYMENT_ACCOUNTS_ROUTE}>
          <PaymentAccountsScreen />
        </Route>
        <Route path={CHANGE_PASSWORD_ROUTE}>
          <ChangePasswordScreen />
        </Route>
        <Route path={CHANGE_ADDRESS_ROUTE}>
          <ChangeAddressScreen />
        </Route>
        <Route path={PREFERENCES_ROUTE}>
          <PreferencesScreen />
        </Route>
        <Route path={HELP_CENTER_ROUTE}>
          <HelpCenterScreen />
        </Route>
      </Switch>
    </>
  );
};

const ApolloContainer = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
    };
    if (!token && isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  if (!token) {
    return (
      <CenteredScreenContent>
        <CircularProgress color="primary" />
      </CenteredScreenContent>
    );
  }

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={LightTheme}>
        <MenuContextProvider>
          <CssBaseline />
          <App />
        </MenuContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Auth0Container = () => {
  const { logout } = useAuth0();
  const history = useHistory();
  const { isAuthenticated, loginWithRedirect, isLoading, error } = useAuth0();

  useEffect(() => {
    if (history.location.pathname === LOGOUT_ROUTE) {
      logout({ returnTo: `${window.location.origin}/dashboard/loans/` });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <CenteredScreenContent>
        <CircularProgress color="primary" />
      </CenteredScreenContent>
    );
  }

  if (error) {
    return (
      <CenteredScreenContent>
        <div>{error.message}</div>
      </CenteredScreenContent>
    );
  }

  return <ApolloContainer />;
};

const RouterContainer = () => (
  <Router>
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={`${window.location.origin}/dashboard/loans/`}
      audience={`https://${REACT_APP_AUTH0_AUDIENCE}`}
      scope={'openid profile email'}
    >
      <Auth0Container />
    </Auth0Provider>
  </Router>
);

export default RouterContainer;
