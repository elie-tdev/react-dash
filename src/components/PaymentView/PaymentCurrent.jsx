import cn from 'classnames';
import { Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useTranslation } from 'react-i18next';
import React, { useMemo, useState } from 'react';
import dateformat from 'dateformat';

import { SecondaryButton, SubmitPaymentModal } from '@/components';
import { gradient, useGlobalStyles } from '@/themes';
import { formatDateString } from '@/properties';

const useStyles = makeStyles(theme => ({
  paymentCurrentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.success.main,
    }),
    width: '48px',
    height: '48px',
    color: theme.palette.success.main,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '100%',
    marginBottom: '16px',
  },
  date: {
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: '14px',
    marginBottom: '32px',
    marginLeft: '32px',
    marginRight: '32px',
    display: 'flex',
    textAlign: 'center',
  },
  containedCard: {
    borderRadius: '12px',
    border: '1px solid rgba(50, 70, 118, 0.12)',
    boxSizing: 'border-box',
    boxShadow: 'none',
  },
  button: {
    height: 'auto',
  },
}));

const Container = ({ className, contained, children }) => {
  const styles = useStyles();
  if (!contained) {
    return <>{children}</>;
  }
  return (
    <Card data-testid="PaymentCurrent" className={styles.containedCard}>
      <CardContent className={className}>{children}</CardContent>
    </Card>
  );
};

const PaymentCurrent = ({ dueDate, contained, onSchedulePayment }) => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const { t } = useTranslation();
  const [openSchedulePayment, setOpenSchedulePayment] = useState(false);
  const formattedDueDate = useMemo(() => dateformat(dueDate, formatDateString), [dueDate]);
  return (
    <Container className={cn(styles.paymentCurrentContainer)} contained={contained}>
      <Box className={cn(styles.icon)}>
        <ThumbUpIcon />
      </Box>
      <Typography variant="h3">{t('content.Caught up')}</Typography>
      <Typography className={cn(globalStyles.caption, styles.text)}>
        {t('content.Nice work!')}
      </Typography>
      <Box className={cn(styles.text)}>
        <Typography className={cn(globalStyles.caption)}>
          {t('content.Next Billing Date')}:&nbsp;
        </Typography>
        <Typography className={cn(globalStyles.caption, styles.date)}>
          {formattedDueDate}
        </Typography>
      </Box>
      <SecondaryButton
        fullWidth
        onClick={() => setOpenSchedulePayment(true)}
        className={styles.button}
      >
        {t('content.Schedule Additional Payment')}
      </SecondaryButton>
      <SubmitPaymentModal
        open={openSchedulePayment}
        onClose={() => setOpenSchedulePayment(false)}
        onSuccess={() => {
          setOpenSchedulePayment(false);
          onSchedulePayment();
        }}
      />
    </Container>
  );
};

export default PaymentCurrent;
