import cn from 'classnames';
import { Box, Drawer, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SendIcon from '@material-ui/icons/Send';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useMemo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { capitalCase } from 'capital-case';

import MobileMenuItem from './MobileMenuItem';

import logo from '@/static/images/logo.png';
import useGlobalStyles from '@/themes/useGlobalStyles';
import {
  OVERVIEW_ROUTE,
  BALANCE_ROUTE,
  PAYMENTS_ROUTE,
  PREFERENCES_ROUTE,
  STATEMENTS_ROUTE,
  HELP_CENTER_ROUTE,
} from '@/constants/routes';
import { MenuContext } from '@/contexts';
import { queries } from '@/gql';
import { useAuthUser } from '@/customHooks';

const useStyles = makeStyles(theme => ({
  menuContainer: {
    height: '100%',
    minWidth: '320px',
  },
  menu: {
    padding: '22px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItems: {
    padding: '22px',
  },
  mainMenuItems: {
    flex: 3,
  },
  greeting: {
    color: theme.palette.text.primary,
  },
  logo: {
    height: '36px',
  },
  menuIcon: {
    width: '18px',
    height: '18px',
  },
  menuItemsPadded: {
    paddingTop: '40px',
    '&:not(:last-of-type)': {
      paddingBottom: '40px',
      borderBottom: '1px solid rgba(159, 168, 198, 0.5)',
    },
  },
  closeIcon: { height: '20px', color: theme.palette.primary.main },
  closeIconContainer: {
    width: '36px',
    height: '36px',
    padding: '8px',
    backgroundColor: theme.palette.common.icon,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
}));

const MobileMenu = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { logout } = useAuth0();
  const { contactId } = useAuthUser();

  const {
    state: { isMenuOpen, routeParams },
    actions: { setIsMenuOpen },
  } = useContext(MenuContext);

  const { loanNumber } = routeParams;

  const [fetchInitialUserData, { data }] = useLazyQuery(queries.InitializeUser, {
    variables: { contact_id: contactId },
  });

  useEffect(() => {
    if (contactId) {
      fetchInitialUserData();
    }
  }, [contactId]);

  const user = useMemo(() => {
    if (!data) return {};
    return data.Contacts_Get?.payload?.data;
  }, [data]);

  const firstName = useMemo(
    () =>
      user?.Firstname1
        ? user?.Firstname1?.split('-')
            .map(name => capitalCase(name))
            .join('-')
        : null,
    [user],
  );

  const goToPath = path => {
    setIsMenuOpen(false);
    history.push(path);
  };

  const menuItems = [
    {
      routeMatch: OVERVIEW_ROUTE,
      text: t('screenNames.loanOverview'),
      icon: <DashboardIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}`),
    },
    {
      routeMatch: BALANCE_ROUTE,
      text: t('screenNames.balance'),
      icon: <AccountBalanceIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}/balance`),
    },
    {
      routeMatch: PAYMENTS_ROUTE,
      text: t('content.Payment History'),
      icon: <SendIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}/payments`),
    },
    {
      routeMatch: STATEMENTS_ROUTE,
      text: t('screenNames.statements'),
      icon: <ListAltIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}/statements`),
    },
  ];

  const secondaryMenuItems = [
    {
      routeMatch: PREFERENCES_ROUTE,
      text: t('screenNames.preferences'),
      icon: <SettingsIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}/preferences`),
    },
    {
      routeMatch: HELP_CENTER_ROUTE,
      text: t('screenNames.helpCenter'),
      icon: <ContactSupportIcon className={cn(styles.menuIcon)} />,
      onClick: () => goToPath(`/dashboard/loans/${loanNumber}/helpCenter`),
      activeItemName: true,
    },
  ];

  return (
    <Drawer
      data-testid="NavigationMenu"
      className={cn(styles.drawer)}
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
    >
      <Box className={cn(globalStyles.column, styles.menuContainer)}>
        <Box
          className={cn(globalStyles.row, globalStyles.screenPaddingOn, styles.menu)}
          onClick={() => setIsMenuOpen(false)}
        >
          <Box className={cn(styles.closeIconContainer)} onClick={() => setIsMenuOpen(false)}>
            <CloseIcon className={cn(styles.closeIcon)} />
          </Box>

          <Box>
            <img src={logo} className={cn(styles.logo)} />
          </Box>
        </Box>
        <Box className={cn(globalStyles.column, styles.menuItems, styles.mainMenuItems)}>
          <Typography variant="h1" className={cn(styles.greeting)}>
            {/* TODO: Get user data */}
            Welcome back{firstName ? `, ${firstName}!` : '!'}
          </Typography>
          <Box className={cn(globalStyles.column, styles.menuItemsPadded)}>
            {menuItems.map((menuItem, index) => (
              <MobileMenuItem {...menuItem} key={index} />
            ))}
          </Box>
          <Box className={cn(globalStyles.column, styles.menuItemsPadded)}>
            {secondaryMenuItems.map((menuItem, index) => (
              <MobileMenuItem {...menuItem} key={index} />
            ))}
          </Box>
        </Box>
        <Box className={cn(globalStyles.column, styles.menuItems)}>
          <MobileMenuItem
            text={t('content.Log Out')}
            icon={<ExitToAppIcon className={cn(styles.menuIcon)} />}
            onClick={() => {
              logout({ returnTo: `${window.location.origin}/dashboard/loans/` });
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};
export default MobileMenu;
