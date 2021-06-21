import { Box, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { formatDollar } from '@/utils/format';

const paymentInfoStyles = makeStyles(theme => ({
  paymentText: {
    color: props => (props.dark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(50, 61, 88, 0.38)'),
  },
  value: {
    color: props => props.dark && theme.palette.primary.contrastText,
  },
  paymentTextContainer: {
    marginTop: '8px',
  },
}));
const PaymentInfo = ({
  paymentAmount,
  paymentDate,
  formattedDueDate = 'Jan 17, 2021',
  paymentType,
  dark,
}) => {
  const styles = paymentInfoStyles({ dark });
  const { t } = useTranslation();
  if (paymentType === 'paymentDue') {
    return (
      <Box data-testid="PaymentInfo" className={cn(styles.paymentTextContainer)}>
        <Typography className={cn(styles.paymentText)} variant="h5" display="inline">
          {t('content.Payment Due Body', {
            dueDate: formattedDueDate,
          })}
        </Typography>
      </Box>
    );
  }
  return (
    <Box data-testid="PaymentInfo" className={cn(styles.paymentTextContainer)}>
      <Typography className={cn(styles.paymentText)} variant="h5" display="inline">
        {t('content.Scheduled Payment Amount')}
      </Typography>
      <Typography className={cn(styles.value)} variant="h5" display="inline">
        {formatDollar(paymentAmount)}&nbsp;
      </Typography>
      <Typography className={cn(styles.paymentText)} variant="h5" display="inline">
        {paymentType === 'autoPay'
          ? t('content.Scheduled Date')
          : t('content.Scheduled Payment Charge Date')}
      </Typography>
      <Typography className={cn(styles.value)} variant="h5" display="inline">
        {paymentDate}
      </Typography>
      <Typography className={cn(styles.paymentText)} display="inline" variant="h5">
        .
      </Typography>
    </Box>
  );
};

export default PaymentInfo;
