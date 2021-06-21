import React, { useState } from 'react';
import cn from 'classnames';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Autorenew from '@material-ui/icons/Autorenew';
import { useTranslation } from 'react-i18next';

import PaymentInfo from './PaymentInfo';
import PaymentLabelValue from './PaymentLabelValue';

import useGlobalStyles from '@/themes/useGlobalStyles';
import { PrimaryButton, SubmitPaymentModal } from '@/components';
import { gradient } from '@/themes';

const useStyles = makeStyles(theme => ({
  rootDark: {
    background: gradient({
      type: 'radial',
      colors: theme.palette.common.gradient.primary.dark,
      background: theme.palette.primary.main,
    }),
  },
  contractText: {
    color: theme.palette.primary.contrastText,
  },
  headerRow: {
    marginBottom: '16px',
  },
  icon: {
    marginLeft: '0',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  automaticPaymentTitle: {
    marginBottom: '8px',
  },
  iconLabel: {
    display: 'flex',
    flex: 1,
    color: theme.palette.primary.main,
    alignItems: 'center',
  },
  autoRenewIcon: {
    height: '32px',
    width: '32px',
    padding: '8px',
    borderRadius: '40px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const AutoPayCard = ({
  paymentDate,
  paymentValue,
  nextPaymentDays,
  onManagePayment,
  _autoPayRecord,
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { t } = useTranslation();
  const [isAutoPayManage, setIsAutoPayManage] = useState(false);

  nextPaymentDays = nextPaymentDays.includes('hours') ? 'in 1 day' : nextPaymentDays;

  return (
    <Card
      data-testid="AutoPayCard"
      className={cn(globalStyles.card, styles.rootDark)}
      elevation={2}
    >
      <CardContent className={cn(globalStyles.cardContent)}>
        <Box className={cn(globalStyles.row, styles.headerRow)}>
          <Box className={cn(styles.iconLabel)}>
            <Box className={cn(styles.iconLabel)}>
              <Autorenew className={cn(globalStyles.icon, styles.autoRenewIcon)} />
              <Typography className={cn(styles.contractText)} variant="body2" noWrap>
                {t('content.AutoPay')}
              </Typography>
            </Box>
            <Typography className={cn(styles.contractText)} variant="body2" noWrap>
              {t('content.Scheduled Payment Sent', {
                days: nextPaymentDays,
              })}
            </Typography>
          </Box>
        </Box>
        <Box className={cn(globalStyles.row)}>
          <PaymentLabelValue
            paymentType="autoPay"
            paymentValue={paymentValue}
            paymentDate={paymentDate}
            dark
          />
        </Box>
        <Divider className={cn(globalStyles.divider, globalStyles.dividerWide, styles.divider)} />
        <Box className={cn(globalStyles.row, styles.automaticPaymentTitle)}>
          <Box>
            <Autorenew className={cn(globalStyles.icon, styles.contractText, styles.icon)} />
          </Box>
          <Box>
            <Typography className={cn(styles.contractText)} variant="h5">
              {t('content.Automatic Payment')}
            </Typography>
          </Box>
        </Box>
        <PaymentInfo
          paymentAmount={paymentValue}
          paymentDate={paymentDate}
          dark
          paymentType="autoPay"
        />
      </CardContent>
      <CardActions className={cn(globalStyles.cardActions)}>
        <PrimaryButton
          onClick={() => {
            setIsAutoPayManage(true);
          }}
          rootStyles={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          {t('content.Manage AutoPay')}
        </PrimaryButton>
      </CardActions>
      {isAutoPayManage && (
        <SubmitPaymentModal
          isManagePayment={true}
          open={isAutoPayManage}
          onClose={() => {
            setIsAutoPayManage(false);
          }}
          onSuccess={onManagePayment}
        />
      )}
    </Card>
  );
};

export default AutoPayCard;
