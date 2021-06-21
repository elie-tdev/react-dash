import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Backdrop, Box, Drawer, Grid, Paper, Slide, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import { prettyCurrency } from '@/utils/prettyHelpers';
import { PrimaryButton, SecondaryButton } from '@/components';
import { gradient } from '@/themes';
import maskAccountNumber from '@/utils/helper';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  confirmTitle: {
    display: 'block',
    margin: '0px auto 70px',
    fontWeight: 500,
    fontSize: '30px',
    letterSpacing: 0.15,
    textAlign: 'center',
    lineHeight: '42px',
  },
  confirmSubTitle: {
    margin: '0px auto 40px',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: 0.1,
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  confirmPanelRoot: {
    zIndex: 3000,
    position: 'relative',
  },
  paperAnchorDockedBottom: {
    borderTop: '0px solid rgba(0, 0, 0, 0)',
  },
  header: {
    height: '33vh',
    textAlign: 'center',
    '& p': {
      color: theme.palette.text.primary,
    },
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.success.main,
    }),
    '& svg': {
      margin: '10px 10px',
      float: 'right',
      color: theme.palette.success.contrastText,
    },
  },
  headerAutoPay: {
    height: '33vh',
    textAlign: 'center',
    '& p': {
      color: theme.palette.primary.dark,
    },
    background: theme.palette.primary.background,
    '& svg': {
      margin: '10px 10px',
      float: 'right',
      color: theme.palette.text.hint,
    },
  },
  checkIconContainer: {
    borderRadius: '50%',
    marginTop: '25px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '25px',
    height: '40px',
    lineHeight: '52px',
    width: '40px',
    '& svg': {
      margin: '0px',
      float: 'none',
      fontSize: '24px',
    },
  },
  checkIcon: {
    backgroundColor: theme.palette.success.main,
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
  checkIconAutoPay: {
    backgroundColor: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
  additionalAmountInput: {
    height: '92px',
    borderRadius: '8px',
  },
  additionalAmountInputLabel: {
    top: '20px',
  },
  button: {
    margin: '20px auto 20px auto',
    maxWidth: '400px',
    display: 'block',
    '& svg': {
      fontSize: '14px',
      marginRight: '10px',
      marginBottom: '-2px',
    },
  },
  lowerButton: {
    margin: '10px auto 10px auto',
    display: 'none',
  },
  amountSplit: {
    margin: '-40px 20px 0px',
    padding: '20px',
    borderRadius: '12px',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    '& p': {
      color: theme.palette.text.secondary,
      marginBottom: '10px',
    },
    '& b': {
      fontSize: '22px',
      fontWeight: 500,
      marginTop: '0px',
      marginBottom: '10px',
      display: 'block',
      color: theme.palette.text.primary,
    },
  },
  paymentDetails: {
    fontSize: '14px',
    lineHeight: '30px',
    letterSpacing: '0.1px',
    color: theme.palette.text.secondary,
    margin: '30px 40px 10px',
    '& p': {
      fontWeight: 500,
      marginLeft: '0px',
      marginTop: '0px',
      marginBottom: '10px',
      color: theme.palette.text.primary,
    },
    '& span': {
      color: theme.palette.text.primary,
      textTransform: 'capitalize',
      fontWeight: 500,
    },
  },
  emailDetails: {
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.1px',
    margin: '0px 40px 60px',
    '& >': {
      fontWeight: 500,
      marginTop: '0px',
    },
    '& hr': {
      marginBottom: '20px',
    },
  },
}));

const SuccessPrompt = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const {
    open,
    onClose,
    onSuccess,
    isAutoPaySetup,
    paymentAmount,
    nextPayment,
    chosenAccount,
    resetFlow,
  } = props || '';

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Backdrop open={open} className={classes.confirmPanelBackdrop}>
        <Drawer
          id={'confirmPanel'}
          variant={'permanent'}
          anchor={'bottom'}
          open={open}
          classes={{
            root: classes.confirmPanelRoot,
            paperAnchorDockedBottom: classes.paperAnchorDockedBottom,
          }}
          PaperProps={{
            className: globalClasses.modalPaper,
            ['data-testid']: 'SubmitPaymentSuccess',
          }}
        >
          <Box className={isAutoPaySetup ? classes.headerAutoPay : classes.header}>
            <CloseIcon onClick={onClose} />
            <Box
              className={
                isAutoPaySetup
                  ? cn(classes.checkIconContainer, classes.checkIconAutoPay)
                  : cn(classes.checkIconContainer, classes.checkIcon)
              }
            >
              <CheckIcon />
            </Box>
            <Typography className={classes.confirmTitle}>
              {isAutoPaySetup ? (
                <>
                  {t('content.Youre enrolled in')}
                  <br />
                  {t('content.AutoPay')}
                </>
              ) : (
                t('content.Thank you for scheduling a payment')
              )}
              !
            </Typography>
          </Box>
          <Paper elevation={5} className={classes.amountSplit}>
            <Grid container justify={'space-evenly'}>
              <Grid item xs={6}>
                <Typography>{t('content.Payment Amount')}</Typography>
                <b>{prettyCurrency(paymentAmount)}</b>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('content.Next Payment')}</Typography>
                <b>{nextPayment}</b>
              </Grid>
              <Grid item xs={12}>
                {!isAutoPaySetup && (
                  <>
                    <PrimaryButton
                      color={'primary'}
                      className={classes.button}
                      onClick={resetFlow}
                      size={'medium'}
                    >
                      {t('content.Schedule Another Payment')}
                    </PrimaryButton>
                  </>
                )}
                {isAutoPaySetup ? (
                  <PrimaryButton className={classes.button} onClick={onSuccess} size={'medium'}>
                    {t('content.Back to Loan Overview')}
                  </PrimaryButton>
                ) : (
                  <SecondaryButton className={classes.button} onClick={onSuccess} size={'medium'}>
                    {t('content.Back to Loan Overview')}
                  </SecondaryButton>
                )}

                {!isAutoPaySetup && (
                  <Typography>
                    *
                    {t('content.Your balance amount will be adjusted once we receive your payment')}
                    .{t('content.Payments take up to 3 business days to process')}.
                    {t('content.View Payments to check the status of your payment')}.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
          <Box className={classes.paymentDetails}>
            <Typography>
              {isAutoPaySetup ? t('content.AutoPay Details') : t('content.Payment Details')}
            </Typography>
            <Grid container justify={'space-evenly'}>
              <Grid item xs={6}>
                {t('content.Payment Amount')}
                <br />
                {t('content.Pay From')}
                <br />
                {t('content.Pay On')}
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <span>{prettyCurrency(paymentAmount)}</span>
                <br />
                <span>{chosenAccount?.accountType}</span> (
                {maskAccountNumber(chosenAccount?.accountNumber)})
                <br />
                <span>{nextPayment}</span>
              </Grid>
            </Grid>
            {isAutoPaySetup && (
              <SecondaryButton className={cn(classes.button, classes.lowerButton)}>
                {t('content.Manage AutoPay')}
              </SecondaryButton>
            )}
          </Box>
        </Drawer>
      </Backdrop>
    </Slide>
  );
};
export default SuccessPrompt;
