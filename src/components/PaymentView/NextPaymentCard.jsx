import React, { useState } from 'react';
import cn from 'classnames';
import { Box, Card, CardContent, makeStyles, Typography, Divider } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { useTranslation } from 'react-i18next';

import { LabelValueColumn, PrimaryButton, SecondaryButton, SubmitPaymentModal } from '@/components';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '14px',
    marginRight: '8px',
    color: theme.palette.primary.main,
  },
  box: {
    padding: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  pastDueText: {
    paddingTop: '0px',
  },
}));

const NextPaymentCard = ({
  nextPaymentDays,
  paymentAmount,
  dueDate,
  elevation = 2,
  isOutlined,
  isCurrent,
  isAutoPay,
  onSchedulePayment,
  onEnrollInAutoPay,
  isLoanOverviewScreen = false,
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { t } = useTranslation();

  const [isSubmitPaymentOpen, setIsSubmitPaymentOpen] = useState(false);
  const [isAutoPaySetup, setIsAutoPaySetup] = useState(false);

  nextPaymentDays = nextPaymentDays.includes('hours') ? 'in 1 day' : nextPaymentDays;

  const cardProps = {};
  if (isOutlined) {
    cardProps.variant = 'outlined';
  }
  return (
    <Card
      data-testid="NextPayment"
      className={cn(globalStyles.card)}
      elevation={elevation}
      {...cardProps}
    >
      <CardContent>
        <Card className={cn(globalStyles.cardBorder, globalStyles.cardBackground)} elevation={0}>
          <Box className={cn(styles.box)}>
            <Box className={cn(styles.headerRow)}>
              <Typography variant="h5">
                <CalendarIcon className={cn(styles.icon)} />
                {t('content.Next Payment')}
              </Typography>
              <Box className={cn(globalStyles.due)}>
                {t('content.Due')} {nextPaymentDays}
              </Box>
            </Box>
          </Box>
        </Card>
        <Box className={cn(styles.box, styles.noBottomPadding)}>
          <Box className={cn(styles.row)}>
            <LabelValueColumn
              variant={isCurrent ? 'primary' : null}
              size="lg"
              label={t('content.Payment Amount')}
              value={paymentAmount}
            />
            <LabelValueColumn size="lg" label={t('content.Due Date')} value={dueDate} />
          </Box>
        </Box>
      </CardContent>
      {isCurrent ? (
        <>
          <Divider />
          <CardContent className={cn(globalStyles.cardContent)} elevation={0}>
            <Box className={cn(globalStyles.column)}>
              <Box className={cn(globalStyles.column, styles.row)}>
                <Typography
                  className={cn(styles.infoTitle, globalStyles.importantText)}
                  variant="h5"
                >
                  <CalendarIcon className={cn(styles.icon)} />
                  {t('content.Payment Due')}
                </Typography>
                <Typography className={cn(globalStyles.caption)}>
                  {t('content.Payment Due Body', {
                    dueDate: dueDate,
                  })}
                </Typography>
              </Box>
              {isAutoPay || isLoanOverviewScreen ? (
                <Box className={cn(styles.row)}>
                  <PrimaryButton onClick={() => setIsSubmitPaymentOpen(true)}>
                    {t('content.Schedule a Payment')}
                  </PrimaryButton>
                </Box>
              ) : (
                <>
                  <Box className={cn(styles.row)}>
                    <SecondaryButton onClick={() => setIsSubmitPaymentOpen(true)}>
                      {t('content.Schedule a Payment')}
                    </SecondaryButton>
                  </Box>
                  <Box className={cn(styles.row)}>
                    <PrimaryButton onClick={() => setIsAutoPaySetup(true)}>
                      {t('content.Enroll in AutoPay')}
                    </PrimaryButton>
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
        </>
      ) : (
        <CardContent className={cn(globalStyles.cardContent, styles.pastDueText)}>
          <Box className={cn(globalStyles.column)}>
            <Box className={cn(styles.row)}>
              <Typography className={cn(globalStyles.caption)}>
                {t('content.Payment Past Due Body')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      )}

      {(isSubmitPaymentOpen || isAutoPaySetup) && (
        <SubmitPaymentModal
          open={isSubmitPaymentOpen || isAutoPaySetup}
          isAutoPaySetup={isAutoPaySetup}
          onClose={() => {
            setIsSubmitPaymentOpen(false);
            setIsAutoPaySetup(false);
          }}
          onSuccess={isAutoPaySetup ? onEnrollInAutoPay : onSchedulePayment}
        />
      )}
    </Card>
  );
};

export default NextPaymentCard;
