import React from 'react';
import cn from 'classnames';
import { Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';

import PaymentLabelValue from './PaymentLabelValue';

import useGlobalStyles from '@/themes/useGlobalStyles';
import { PaymentPastDue } from '@/components';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '4px',
  },
  headerRow: {
    marginBottom: '16px',
  },
  icon: {
    marginLeft: '0',
  },
  iconLabel: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  textBox: {
    marginTop: '16px',
  },
}));

const PastDueCard = ({ totalCurrentDueBalance, totalPastDueBalance, daysPastDue }) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Card data-testid="PastDueCard" className={cn(globalStyles.card, styles.root)} elevation={2}>
      <CardContent className={cn(globalStyles.cardContent)}>
        <Box className={cn(globalStyles.row, styles.headerRow, styles.iconLabel)}>
          <InfoIcon className={cn(globalStyles.icon, styles.icon, globalStyles.errorText)} />
          <Typography variant="h5" noWrap>
            {t('content.Payment Past Due')}
          </Typography>
        </Box>
        <Box className={cn(globalStyles.row)}>
          {PaymentLabelValue({
            paymentType: 'pastDue',
            paymentValue: totalPastDueBalance,
            paymentDate: totalCurrentDueBalance,
          })}
        </Box>
        <Box className={cn(styles.textBox)}>
          <PaymentPastDue pastDueDays={daysPastDue} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PastDueCard;
