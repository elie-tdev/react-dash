import React, { useState } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useGlobalStyles } from '@/themes';
import { DangerButton, SubmitPaymentModal } from '@/components';

const useStyles = makeStyles(theme => ({
  row: {
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  },
  icon: {
    fontSize: '14px',
    marginRight: '8px',
  },
  infoTitle: {
    marginBottom: '8px',
  },
  infoIcon: {
    color: theme.palette.action.selected,
    height: '8px',
    width: '8px',
  },
  pastDueCard: {
    height: '90px',
    backgroundColor: theme.palette.error.lightBackground,
  },
}));

const PaymentPastDue = ({ pastDueDays }) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { t } = useTranslation();
  const [openSchedulePayment, setOpenSchedulePayment] = useState(false);

  return (
    <>
      <Box className={cn(styles.row)}>
        <Typography className={cn(styles.infoTitle)} variant="h5">
          <InfoIcon className={cn(styles.icon, globalStyles.errorText)} />
          {t('content.Days Past Due', {
            pastDueDays: pastDueDays,
          })}
        </Typography>
        <Typography className={cn(globalStyles.caption)}>{t('content.Overdue Body')}</Typography>
      </Box>

      <Box className={cn(styles.row)}>
        <DangerButton fullWidth onClick={() => setOpenSchedulePayment(true)}>
          {t('content.Pay Past Due Amount')}
        </DangerButton>
      </Box>
      <SubmitPaymentModal
        open={openSchedulePayment}
        onClose={() => setOpenSchedulePayment(false)}
        onSuccess={() => setOpenSchedulePayment(false)}
      />
    </>
  );
};

export default PaymentPastDue;
