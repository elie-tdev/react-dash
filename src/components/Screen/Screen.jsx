import { Box, makeStyles } from '@material-ui/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import TimeAgo from 'javascript-time-ago';
import cn from 'classnames';
import { useParams } from 'react-router';

import { Header, Footer } from '@/components';
import { useGlobalStyles } from '@/themes';
import { MenuContext } from '@/contexts';

// setTimeout() accepts up to a 32 bit number. Greater overflows and instantly executes
const SET_TIMEOUT_MAX_SAFE_INTERVAL = 2147483647;
function getSafeTimeoutInterval(interval) {
  return Math.min(interval, SET_TIMEOUT_MAX_SAFE_INTERVAL);
}

const useStyles = makeStyles(theme => ({
  elevatedBox: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(5),
      background: theme.palette.common.gradient.primary.lightGrey,
    },
  },
  withMinHeight: {
    minHeight: '75vh',
  },
}));

const Screen = ({
  title,
  children,
  lastUpdated,
  elevated = true,
  showHeader = true,
  showPaddingTop = true,
  className,
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {
    actions: { setRouteParams },
  } = useContext(MenuContext);

  const timeAgo = useMemo(() => new TimeAgo('en-US'), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (!lastUpdated) return;

    const [newFormattedDate, timeToNextUpdate] = timeAgo.format(lastUpdated, {
      getTimeToNextUpdate: true,
    });
    setFormattedDate(newFormattedDate);
    const updateTimer = setTimeout(() => {
      const [newFormattedDate] = timeAgo.format(lastUpdated, {
        getTimeToNextUpdate: true,
      });
      setFormattedDate(newFormattedDate);
    }, getSafeTimeoutInterval(timeToNextUpdate || 60 * 1000));
    return () => clearTimeout(updateTimer);
  }, [formattedDate, lastUpdated]);

  const routeParams = useParams();

  useEffect(() => {
    setRouteParams(routeParams);
  }, [routeParams]);

  return (
    <Box>
      {showHeader && <Header title={title} />}
      <Box
        className={cn(
          elevated ? globalStyles.screenPaddingOn : globalStyles.screenPaddingOff,
          showPaddingTop && styles.elevatedBox,
          styles.withMinHeight,
          className,
        )}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Screen;
