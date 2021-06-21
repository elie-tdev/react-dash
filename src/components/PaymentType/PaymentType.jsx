import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  autoPayRoot: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '14px',
  },
  oneTimeRoot: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: '14px',
  },
}));

const PaymentType = ({ type }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const typePropsMap = {
    autoPay: {
      label: t('content.AutoPay'),
      classes: {
        root: styles.autoPayRoot,
      },
    },
    oneTime: {
      label: t('content.One-Time Payment'),
      classes: {
        root: styles.oneTimeRoot,
      },
    },
  };

  return <Chip data-testid="PaymentType" {...typePropsMap[type]} size="small" />;
};

export default PaymentType;
