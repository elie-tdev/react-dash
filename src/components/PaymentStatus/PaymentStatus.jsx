import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';

import { gradient } from '@/themes';

const useStyles = makeStyles(theme => ({
  scheduledRoot: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '14px',
  },
  returnedRoot: {
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.error.main,
    }),
    color: theme.palette.error.main,
    fontWeight: 600,
    fontSize: '14px',
  },
  pendingRoot: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: '14px',
  },
  paidRoot: {
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.success.main,
    }),
    color: theme.palette.success.main,
    fontWeight: 600,
    fontSize: '14px',
  },
}));

const PaymentStatus = ({ status }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const statusPropsMap = {
    Scheduled: {
      label: t('content.Scheduled'),
      classes: {
        root: styles.scheduledRoot,
      },
    },
    Returned: {
      label: t('content.Returned'),
      classes: {
        root: styles.returnedRoot,
      },
    },
    Pending: {
      label: t('content.Pending'),
      classes: {
        root: styles.pendingRoot,
      },
    },
    Paid: {
      label: t('content.Paid'),
      classes: {
        root: styles.paidRoot,
      },
    },
    Posted: {
      label: t('content.Posted'),
      classes: {
        root: styles.paidRoot,
      },
    },
  };
  return <Chip data-testid="PaymentStatus" {...statusPropsMap[status]} size="small" />;
};

export default PaymentStatus;
