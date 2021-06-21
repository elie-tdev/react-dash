import { useMemo } from 'react';
import {
  CardContent,
  Typography,
  makeStyles,
  Divider,
  Box,
  IconButton,
  CircularProgress,
  Drawer,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import cn from 'classnames';
import dateformat from 'dateformat';

import { queries } from '@/gql';
import { formatDollar } from '@/utils/format';
import useGlobalStyles from '@/themes/useGlobalStyles';
import { StatementGlance } from '@/components';
import { formatMonthYearString } from '@/properties';

const useStyles = makeStyles(theme => ({
  statementText: {
    margin: '2px 0px',
    paddingLeft: '8px',
    fontWeight: 500,
    color: theme.palette.text.label,
  },
  containRow: {
    marginTop: '-24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '8px',
  },
  printContent: {
    margin: '0px',
  },
  viewLeft: {
    justifyContent: 'flex-start',
    flex: 2,
    paddingRight: '8px',
  },
  viewRight: {
    justifyContent: 'flex-end',
    flex: 2,
  },
  paperAnchorBottom: {
    borderRadius: '8px 8px 0px 0px',
  },
  list: {
    width: 'fit-content',
    [theme.breakpoints.up('sm')]: {
      minWidth: '640px',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 152px)',
    },
    '@media (max-width: 425px)': {
      height: 'calc(100vh - 90px)',
    },
  },
  fullList: {
    width: 'auto',
  },
  closeIcon: {
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: '-8px 8px -8px 8px',
  },
  printBox: {
    height: '480px',
    border: '8px solid rgba(50, 70, 100, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    marginBottom: '100px',
  },
  printIcon: {
    marginTop: '-8px',
  },
  iframe: {
    height: '100%',
    width: '100%',
  },
  loadingBar: {
    display: 'block',
    margin: '40% auto 20px',
  },
}));

const StatementDrawer = ({ open, toggleDrawer, anchor, statement }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  const formattedStatementMonth = dateformat(statement?.Statement_Date, formatMonthYearString);

  const statementId = statement?.Statement_Row_Id;

  const { data, _error } = useQuery(queries.StatementFile, {
    variables: { statement_id: statementId },
  });

  const statementFile = useMemo(() => {
    if (!data) return;
    return data?.LoanStatements_GetFile?.payload?.data?.File;
  }, [data]);

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer}
      classes={{
        paperAnchorBottom: styles.paperAnchorBottom,
      }}
    >
      <div
        className={cn(styles.list, {
          [styles.fullList]: anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <Box className={cn(styles.drawer)}>
          <Box className={cn(globalStyles.row)}>
            <Box>
              <IconButton
                className={cn(styles.closeIcon)}
                color="inherit"
                aria-label="close"
                onClick={toggleDrawer}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box flex={1} />
            <Box>
              <CardContent>
                <Typography variant="subtitle1">
                  {t('content.View Statement')} - {formattedStatementMonth}
                </Typography>
              </CardContent>
            </Box>
            <Box flex={1} />
          </Box>
          <Divider className={cn(styles.divider)} />
          <CardContent className={cn(styles.content, styles.containRow, styles.printContent)}>
            <StatementGlance
              isViewStatementEnabled={false}
              isViewEnabled={false}
              statementDate={statement?.Statement_Date}
              statementDueDate={statement?.Statement_Due_Date}
              remainingBalance={formatDollar(statement?.Current_Payoff_Balance)}
              statementId={statement?.Statement_Row_Id}
            />
          </CardContent>
          <Divider className={cn(styles.divider)} />
          <CardContent>
            <Typography variant="h1" className={cn(styles.statementText)}>
              {t('content.Preview')}
            </Typography>
          </CardContent>
          <CardContent>
            <Box className={cn(styles.printBox)}>
              {statementFile ? (
                <iframe
                  src={`data:application/pdf;base64,${statementFile}`}
                  className={cn(styles.iframe)}
                  frameBorder="0"
                />
              ) : (
                <CircularProgress className={cn(styles.loadingBar)} />
              )}
            </Box>
          </CardContent>
        </Box>
      </div>
    </Drawer>
  );
};

export default StatementDrawer;
