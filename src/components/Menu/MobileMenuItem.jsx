import cn from 'classnames';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { matchPath, useLocation } from 'react-router-dom';

import useGlobalStyles from '../../themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  menuItem: {
    flex: 1,
    maxHeight: '40px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
    '&:not(:last-of-type)': {
      marginBottom: '16px',
    },
  },
  activeMenuItem: {
    backgroundColor: theme.palette.primary.background,
  },
  iconContainer: {
    marginRight: '16px',
  },
  itemName: {
    fontWeight: 500,
    fontSize: '15px',
    color: theme.palette.text.primary,
  },
  activeItemName: {
    color: theme.palette.primary.main,
  },
  icon: theme.palette.icon,
  activeIcon: {
    color: theme.palette.primary.main,
  },
}));

const MobileMenuItem = ({ icon, text, routeMatch, onClick, activeItemName }) => {
  const location = useLocation();
  const match = matchPath(location.pathname, { path: routeMatch });
  const styles = useStyles();

  const globalStyles = useGlobalStyles();

  return (
    <Box
      data-testid="NavigationMenuItem-mobile"
      className={cn(globalStyles.row, styles.menuItem, match?.isExact && styles.activeMenuItem)}
      onClick={onClick}
    >
      <Box
        className={cn(
          styles.iconContainer,
          globalStyles.column,
          match?.isExact || activeItemName ? styles.activeIcon : styles.icon,
        )}
      >
        {icon}
      </Box>
      <Typography
        className={cn(styles.itemName, (match?.isExact || activeItemName) && styles.activeItemName)}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MobileMenuItem;
