import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Link,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { queries } from '@/gql';
import { formatDollar } from '@/utils/format';
import useGlobalStyles from '@/themes/useGlobalStyles';
import { LabelValueColumn } from '@/components';

const useStyles = makeStyles(theme => ({
  infoIcon: {
    color: theme.palette.action.selected,
    height: '16px',
    width: '16px',
    cursor: 'pointer',
  },
  pastDueDialog: {
    margin: 'auto',
  },
  pastDueDialogPaper: {
    maxWidth: '352px',
    maxHeight: '352px',
    borderRadius: '16px',
  },
  pastDueDialogTitleWrap: {
    padding: theme.spacing(3),
  },
  pastDueDialogTitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  pastDueDialogAmount: {
    color: theme.palette.error.main,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '32px',
    marginBottom: theme.spacing(2),
  },
  dialogActions: {
    cursor: 'pointer',
    height: '47px',
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid rgba(159, 168, 198, 0.16)',
  },
  pastDueDialogButton: {
    color: theme.palette.primary.main,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '24px',
  },
  dialogContentLink: {
    letterSpacing: '-0.13px',
    marginBottom: '2px',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '24px',
  },
  dialogContentText: {
    color: theme.palette.text.hint,
    letterSpacing: '-0.13px',
    marginBottom: '17px',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '24px',
  },
  pastDueDialogBox: {
    marginBottom: theme.spacing(3),
  },
}));

const PastDueToolTip = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPastDueDialogOpen, setIsPastDueDialogOpen] = useState(false);
  const isPastDueDialogOpenHandleOpen = () => {
    setIsPastDueDialogOpen(true);
  };

  const isPastDueDialogOpenHandleClose = () => {
    setIsPastDueDialogOpen(false);
  };

  const { loanNumber } = useParams();
  const history = useHistory();

  const { data, loading } = useQuery(queries.Balance, {
    variables: { loan_id: loanNumber },
  });

  const dataLoans = data?.Loans_Get?.payload?.data;

  const loan = useMemo(() => {
    if (dataLoans) {
      return {
        pastDueAmount:
          dataLoans?.Total_Past_Due_Balance && formatDollar(dataLoans.Total_Past_Due_Balance),
        formattedRegularPrincipalAmount: dataLoans?.Current_Principal_Balance,
        formattedInterestAmount: dataLoans?.Current_Interest_Balance,
        fees:
          dataLoans?.Current_Fees_Balance &&
          dataLoans?.Current_Late_Charge_Balance &&
          dataLoans.Current_Fees_Balance + dataLoans.Current_Late_Charge_Balance,
      };
    }
  }, [dataLoans]);

  return (
    !loading && (
      <>
        <InfoIcon className={cn(styles.infoIcon)} onClick={isPastDueDialogOpenHandleOpen} />
        <Dialog
          fullScreen={fullScreen}
          open={isPastDueDialogOpen}
          onClose={isPastDueDialogOpenHandleClose}
          aria-labelledby="past-due-dialog"
          className={styles.pastDueDialog}
          classes={{ paper: styles.pastDueDialogPaper }}
        >
          <DialogContent>
            <Typography variant="body2" className={styles.pastDueDialogTitle}>
              {t('content.Past Due')}
            </Typography>
            <Typography variant="body2" className={styles.pastDueDialogAmount}>
              {loan &&
                (loan.pastDueAmount === 0 ? formatDollar(loan.pastDueAmount) : loan.pastDueAmount)}
            </Typography>
            <Box className={cn(globalStyles.row, styles.pastDueDialogBox)}>
              <LabelValueColumn
                label={<>{t('content.Principal')}</>}
                value={formatDollar(loan?.formattedRegularPrincipalAmount)}
              />
              <LabelValueColumn
                label={t('content.Interest')}
                value={formatDollar(loan?.formattedInterestAmount)}
              />
              <LabelValueColumn label={<>{t('content.Fees')}</>} value={formatDollar(loan?.fees)} />
            </Box>
            <Typography variant="body2" className={cn(styles.dialogContentText)}>
              {t('content.Your Past Due amount')}
              <Link
                className={cn(styles.dialogContentLink)}
                component="button"
                variant="body2"
                href="#"
                onClick={() => history.push(`/dashboard/loans/${loanNumber}/balance`)}
              >
                {t('content.Balances')}
              </Link>
              {t('content.for more information')}
            </Typography>
          </DialogContent>
          <DialogActions onClick={isPastDueDialogOpenHandleClose} className={styles.dialogActions}>
            <Typography variant="body1" className={styles.pastDueDialogButton}>
              {t('content.OK')}
            </Typography>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

export default PastDueToolTip;
