import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Box, DialogContent, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab';
import WarningIcon from '@material-ui/icons/Warning';
import { useHistory } from 'react-router-dom';

import { PrimaryButton } from '@/components';

const useStyles = makeStyles(theme => ({
  confirmTitleContainer: {
    marginTop: '16px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  confirmTitle: {
    display: 'inline',
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '0.15px',
    lineHeight: '32px',
  },
  confirmSubTitle: {
    margin: '20px auto 30px',
    textAlign: 'center',
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
    margin: '0px auto 40vh auto',
    height: '40px',
    lineHeight: '20px',
    fontSize: '14px',
    maxWidth: '120px',
    display: 'block',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
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
  },
  icon: {
    borderRadius: '50%',
    width: '50px',
  },
}));

const AutoPayErrorState = ({ loanNumber }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Paper
      elevation={1}
      className={classes.confirmPanelRoot}
      PaperProps={{
        ['data-testid']: 'SubmitPaymentAutoPayErrorState',
      }}
    >
      <DialogContent>
        <Grid container justify={'space-evenly'} className={classes.paymentChips}>
          <Grid item>
            <Alert
              color={'error'}
              icon={<WarningIcon fontSize="inherit" />}
              className={classes.icon}
            ></Alert>
          </Grid>
        </Grid>
        <Box className={classes.confirmTitleContainer}>
          <Typography className={classes.confirmTitle} color={'textPrimary'} variant={'body2'}>
            {t('content.Your AutoPay details need to be reviewed') + '.'}
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.confirmSubTitle} color={'textSecondary'} variant={'body2'}>
            {t('content.Please contact Customer Service for Support')}.
          </Typography>
        </Box>
      </DialogContent>
      <PrimaryButton
        className={cn(classes.button)}
        onClick={() => {
          history.push(`/dashboard/loans/${loanNumber}/helpCenter`);
        }}
      >
        {t('content.Contact Us')}
      </PrimaryButton>
    </Paper>
  );
};

export default AutoPayErrorState;
