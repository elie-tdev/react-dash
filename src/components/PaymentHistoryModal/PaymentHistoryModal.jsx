import React, { useState, useMemo } from 'react';
import { Card, Typography, makeStyles, Divider, Box, IconButton, Drawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WarningIcon from '@material-ui/icons/Warning';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { formatDollar } from '@/utils/format';
import useGlobalStyles from '@/themes/useGlobalStyles';
import {
  PrimaryButton,
  LabelValueColumn,
  PaymentStatus,
  DangerButton,
  SubmitPaymentModal,
} from '@/components';
import {
  PAYMENT_STATUS_POSTED,
  PAYMENT_STATUS_SCHEDULED,
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_RETURNED,
} from '@/constants/paymentStatus';

const useStyles = makeStyles(theme => ({
  fullScreenContainer: {
    minHeight: '50%',
    width: '100%',
  },
  paperFullScreen: {
    borderRadius: '12px 12px 0px 0px',
  },
  leftDrawer: {
    width: '33%',
    maxWidth: '480px',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  headerIcon: {
    padding: '0px',
  },
  closeIcon: {
    color: theme.palette.text.secondary,
  },
  paddedBody: {
    padding: '32px',
    paddingBottom: '40px',
  },
  paymentAmount: {
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '32px',
    marginBottom: '32px',
  },
  iconLeft: {
    paddingLeft: '8px',
  },
  accountText: {
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '24px',
    color: 'rgba(50, 61, 88, 0.38)',
    paddingLeft: '4px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  },
  returnedRed: {
    color: theme.palette.error.main,
  },
}));

const PaymentHistoryModal = ({ open, onClose, isFullScreen, payment = {} }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  const [isSubmitPaymentOpen, setIsSubmitPaymentOpen] = useState(false);

  const styleClasses = isFullScreen
    ? {
        root: styles.fullScreenContainer,
        paper: styles.paperFullScreen,
      }
    : {
        paper: styles.leftDrawer,
      };

  const {
    status = PAYMENT_STATUS_POSTED,
    type = 'oneTime',
    paymentAmount,
    principalAmount,
    interestAmount,
    fees,
    accountNumber,
    paidDate,
  } = payment;

  const bankAccount = useMemo(() => {
    if (accountNumber) {
      const accounts = accountNumber.split(' ');
      if (accounts && accounts.length == 2) {
        return {
          bankAccountType: accounts[0],
          bankAccountNumber: accounts[1],
        };
      }
    }
  }, [accountNumber]);

  return (
    <>
      <Drawer
        anchor={isFullScreen ? 'bottom' : 'right'}
        open={open}
        onClose={onClose}
        classes={styleClasses}
      >
        <Card elevation={0}>
          <Box className={cn(globalStyles.row, styles.header)}>
            <Box flex={1}>
              <IconButton
                className={cn(styles.closeIcon, styles.headerIcon)}
                color="inherit"
                aria-label="menu"
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box flex={1} justifyContent="center">
              <Typography noWrap variant="subtitle1">
                {t('content.Payment Detail')}
              </Typography>
            </Box>
            <Box flex={1}></Box>
          </Box>
          <Divider />
          <Box className={cn(styles.paddedBody)}>
            <Box className={cn(globalStyles.column)}>
              <LabelValueColumn
                label={t('content.Payment Amount')}
                value={formatDollar(paymentAmount)}
                classes={{ valueStyle: styles.paymentAmount }}
              />
              {status === PAYMENT_STATUS_SCHEDULED && type === 'oneTime' && (
                <>
                  <Box className={styles.row}>
                    <Box className={cn(globalStyles.due)}>
                      <ScheduleIcon />
                      <Typography className={cn(styles.iconLeft)}>
                        {t('content.Scheduled Payment')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.row}>
                    <Typography variant="h6">{t('content.Scheduled Payment Body')}</Typography>
                  </Box>
                </>
              )}
              {status === PAYMENT_STATUS_RETURNED && type === 'oneTime' && (
                <>
                  <Box className={styles.row}>
                    <Box className={cn(globalStyles.due, styles.returnedRed)}>
                      <WarningIcon />
                      <Typography className={cn(styles.iconLeft, styles.returnedRed)}>
                        {t('content.Payment Returned')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.row}>
                    <Typography variant="h6">{t('content.Payment Returned Body')}</Typography>
                  </Box>
                </>
              )}
              {status === PAYMENT_STATUS_PENDING && type === 'oneTime' && (
                <>
                  <Box className={styles.row}>
                    <Box className={cn(globalStyles.due)}>
                      <ScheduleIcon />
                      <Typography className={cn(styles.iconLeft)}>
                        {t('content.Payment Pending')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.row}>
                    <Typography variant="h6">{t('content.Payment Pending Body')}</Typography>
                  </Box>
                </>
              )}
              {status === PAYMENT_STATUS_POSTED && (
                <Box className={cn(globalStyles.row)}>
                  <LabelValueColumn label={<>{t('content.Principal')}</>} value={principalAmount} />
                  <LabelValueColumn label={t('content.Interest')} value={interestAmount} />
                  <LabelValueColumn label={<>{t('content.Fees')}</>} value={fees} />
                </Box>
              )}
            </Box>
          </Box>
          <Divider />
          <Box className={cn(styles.paddedBody)}>
            <Box className={styles.row}>
              <Typography variant="h6">{t('content.Status')}</Typography>
              <PaymentStatus status={status} />
            </Box>

            {accountNumber && bankAccount && (
              <Box className={styles.row}>
                <Typography variant="h6">{t('content.Paid From')}</Typography>
                <Box className={cn(globalStyles.row)}>
                  <Typography className={cn(styles.pendingText)}>
                    {bankAccount.bankAccountType}
                  </Typography>
                  <Typography className={cn(styles.accountText)}>
                    {bankAccount.bankAccountNumber}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box className={styles.row}>
              <Typography variant="h6">{t('content.Payment Date')}</Typography>
              <Typography>{paidDate}</Typography>
            </Box>

            {(status === PAYMENT_STATUS_SCHEDULED || status === PAYMENT_STATUS_POSTED) &&
              type === 'autoPay' && (
                <Box>
                  <PrimaryButton>{t('content.Edit AutoPay Settings')}</PrimaryButton>
                </Box>
              )}
            {status === PAYMENT_STATUS_SCHEDULED && type === 'oneTime' && (
              <>
                <PrimaryButton>{t('content.Edit Payment')}</PrimaryButton>
                <DangerButton variant="text">{t('content.Cancel Payment')}</DangerButton>
              </>
            )}
            {status === PAYMENT_STATUS_POSTED && type === 'oneTime' && (
              <PrimaryButton
                onClick={() => {
                  onClose();
                  setIsSubmitPaymentOpen(true);
                }}
              >
                {t('content.Schedule Additional Payment')}
              </PrimaryButton>
            )}
          </Box>
        </Card>
      </Drawer>
      <SubmitPaymentModal
        open={isSubmitPaymentOpen}
        onClose={() => {
          setIsSubmitPaymentOpen(false);
        }}
        onSuccess={() => {
          setIsSubmitPaymentOpen(false);
        }}
      />
    </>
  );
};

export default PaymentHistoryModal;
