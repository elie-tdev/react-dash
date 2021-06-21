import React from 'react';
import cn from 'classnames';
import { makeStyles, CardContent, Card, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { fade } from '@material-ui/core/styles/colorManipulator';

import useGlobalStyles from '@/themes/useGlobalStyles';
import { LabelValueColumn, PastDueToolTip } from '@/components';
import { formatDollar } from '@/utils/format';

const labelValueStyles = makeStyles(theme => ({
  containerStyle: {
    flex: 1,
    marginRight: '8px',
    '&:last-of-type': {
      marginRight: 0,
    },
    padding: '12px 12px 10px 16px',
    borderRadius: '8px',
    background: theme.palette.primary.main,
  },
  labelStyle: {
    marginBottom: '0',
    color: fade(theme.palette.primary.contrastText, 0.5),
  },
  valueStyle: {
    color: theme.palette.primary.contrastText,
  },
  grayContainerStyle: {
    background: 'rgba(245, 245, 247, 1)',
    height: '90px',
    flex: 1,
  },
  grayLabelStyle: {
    color: theme.palette.text.primary,
    opacity: 0.4,
  },
  grayValueStyle: {
    color: theme.palette.text.primary,
  },
  blueContainerStyle: {
    background: 'rgba(255, 255, 255, 0.1)',
    marginTop: '8px',
    width: '100%',
  },
  redContainerStyle: {
    background: theme.palette.error.lightBackground,
  },
  pastDueCard: {
    height: '90px',
    backgroundColor: theme.palette.error.lightBackground,
    borderRadius: '8px',
    flex: `0 0 calc(50% - 6px)`,
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '@media (max-width: 425px)': {
      display: 'block',
    },
  },
  grayBackground: {
    backgroundColor: theme.palette.common.grey[100],
  },
}));

const PaymentLabelValue = ({ paymentType, paymentValue = '500.00', paymentDate, dark }) => {
  const styles = labelValueStyles({ dark });
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();

  const blueLabelValue = {
    containerStyle: cn(styles.containerStyle, dark && styles.blueContainerStyle),
    labelStyle: cn(styles.labelStyle),
    valueStyle: cn(styles.valueStyle),
  };
  const grayLabelValue = {
    containerStyle: cn(styles.containerStyle, styles.grayContainerStyle),
    labelStyle: cn(styles.labelStyle, styles.grayLabelStyle),
    valueStyle: cn(styles.valueStyle, styles.grayValueStyle),
  };

  switch (paymentType) {
    case 'autoPay':
      return (
        <>
          <LabelValueColumn
            label={t('content.Payment Amount')}
            value={formatDollar(paymentValue)}
            classes={blueLabelValue}
          />
          <LabelValueColumn
            label={t('content.Payment Date')}
            value={paymentDate}
            classes={blueLabelValue}
          />
        </>
      );
    case 'autoPayEnrolled':
    case 'scheduledPayment':
    case 'pastDue':
      return (
        <Box className={cn(globalStyles.row, styles.row)}>
          <Card className={cn(globalStyles.card, styles.pastDueCard)} elevation={0}>
            <CardContent className={cn(globalStyles.row)}>
              <LabelValueColumn
                label={t('content.Past Due')}
                value={formatDollar(paymentValue)}
                variant="error"
                size="lg"
              />
              <PastDueToolTip />
            </CardContent>
          </Card>
          <Card
            className={cn(globalStyles.card, styles.pastDueCard, styles.grayBackground)}
            elevation={0}
          >
            <CardContent className={cn(globalStyles.row)}>
              <LabelValueColumn label={t('content.Amount Due')} value={paymentDate} size="lg" />
            </CardContent>
          </Card>
        </Box>
      );
    case 'paymentDue':
      return (
        <>
          <LabelValueColumn
            label={t('content.Payment Amount')}
            value={formatDollar(paymentValue)}
            classes={grayLabelValue}
          />
          <LabelValueColumn
            label={t('content.Payment Date')}
            value={paymentDate}
            classes={grayLabelValue}
          />
        </>
      );
    default:
      return null;
  }
};

export default PaymentLabelValue;
