import cn from 'classnames';
import React, { useState } from 'react';
import { Card, makeStyles, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import autopayCardBackground from '@/static/images/autopayCardBackground.svg';
import { gradient, useGlobalStyles } from '@/themes';
import { PrimaryButton, SubmitPaymentModal } from '@/components';

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: '240px',
    background: gradient({
      type: 'radial',
      colors: theme.palette.common.gradient.primary.dark,
      background: theme.palette.primary.main,
    }),
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px',
    height: '100%',
    minHeight: 'inherit',
    backgroundImage: `url(${autopayCardBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%',
  },
  title: {
    width: '75%',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '32px',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  button: {
    height: 'auto',
  },
}));

const EnrollInAutoPay = ({ onEnrollInAutoPay }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const [isAutoPaySetup, setIsAutoPaySetup] = useState(false);

  return (
    <Card className={cn(globalStyles.card, styles.card)}>
      <Box className={cn(styles.box)}>
        <Typography variant="h1" className={styles.title}>
          {t('content.Enroll in AutoPay and never miss a payment again')}
        </Typography>
        <PrimaryButton
          variant="text"
          fullWidth={false}
          onClick={() => setIsAutoPaySetup(true)}
          className={styles.button}
        >
          {t('content.Enroll in AutoPay')}
        </PrimaryButton>
      </Box>
      {isAutoPaySetup && (
        <SubmitPaymentModal
          open={isAutoPaySetup}
          isAutoPaySetup={isAutoPaySetup}
          onClose={() => {
            setIsAutoPaySetup(false);
          }}
          onSuccess={onEnrollInAutoPay}
        />
      )}
    </Card>
  );
};

export default EnrollInAutoPay;
