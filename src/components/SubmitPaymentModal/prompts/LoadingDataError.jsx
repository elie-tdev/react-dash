import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Box, DialogContent, Divider, Grid, Modal, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab';

import { InfoButton } from '@/components';

const useStyles = makeStyles(theme => ({
  confirmTitleContainer: {
    marginTop: '16px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  confirmTitle: {
    display: 'inline',
    fontWeight: 500,
    fontSize: '18px',
    letterSpacing: '0.15px',
    lineHeight: '24px',
  },
  confirmSubTitle: {
    margin: '20px auto 30px',
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  confirmPanelRoot: {
    borderRadius: '12px',
    height: '50vh',
    marginTop: '25vh',
    backgroundColor: theme.palette.background.paper,
  },
  additionalAmountInput: {
    height: '92px',
    borderRadius: '8px',
  },
  additionalAmountInputLabel: {
    top: '20px',
  },
  button: {
    margin: '0px auto 40px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
  chip: {
    padding: '0px 4px',
    border: '2px solid rgba(50, 70, 100, 0.1)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    fontSize: '12px',
    height: '20px',
    fontWeight: '700',
    lineHeight: '17px',
  },
  autoPayOn: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  paymentChips: {
    margin: '10px 0 0 0',
    display: 'block',
    width: '100%',
  },
  icon: {
    borderRadius: '50%',
    width: '50px',
  },
}));

const LoadingDataError = ({ open, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);

  const handleOnClose = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, []);

  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.confirmPanelRoot}
      BackdropProps={{
        ['data-testid']: 'SubmitPaymentLoadingDataError',
      }}
    >
      <Paper elevation={1}>
        <DialogContent>
          <Grid container justify={'space-evenly'} className={classes.paymentChips}>
            <Grid item>
              <Alert severity={'warning'} className={classes.icon}></Alert>
            </Grid>
          </Grid>
          <Box className={classes.confirmTitleContainer}>
            <Typography className={classes.confirmTitle} color={'textPrimary'} variant={'body2'}>
              {t('content.Were having trouble refreshing your data') + '.'}
            </Typography>
          </Box>
          <Box>
            <Typography
              className={classes.confirmSubTitle}
              color={'textSecondary'}
              variant={'body2'}
            >
              {t(
                'content.Please check your internet connection and refresh your browser window or try coming back at a later time',
              )}
              .
            </Typography>
          </Box>
        </DialogContent>
        <Divider />
        <InfoButton className={cn(classes.button)} onClick={handleOnClose}>
          {t('content.OK')}
        </InfoButton>
      </Paper>
    </Modal>
  );
};

export default LoadingDataError;
