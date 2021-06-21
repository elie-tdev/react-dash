import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import {
  Backdrop,
  Box,
  CircularProgress,
  DialogContent,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/client';

import SchedulePaymentUpdatedPrompt from './SchedulePaymentUpdatedPrompt';

import { PrimaryButton, SecondaryButton } from '@/components';
import { prettyCurrency } from '@/utils/prettyHelpers';
import maskAccountNumber from '@/utils/helper';
import { queries } from '@/gql';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  confirmTitleContainer: {
    marginTop: '16px',
    marginBottom: '16px',
    textAlign: 'left',
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
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
    letterSpacing: '0.1px',
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  confirmPanelRoot: {
    zIndex: 3000,
    position: 'relative',
  },
  buttonPayPastDue: {
    margin: '0px auto 40px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
  },
  buttonGoBack: {
    margin: '0px auto 40px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
  },
  errorIcon: {
    fontSize: '20px',
  },
  errorIconContainer: {
    borderRadius: '50%',
    lineHeight: '17px',
    width: '20px',
    height: '20px',
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
  },
  paymentChips: {
    margin: '10px auto auto auto',
    maxWidth: '80%',
  },
  paymentDetails: {
    fontSize: '14px',
    lineHeight: '30px',
    letterSpacing: '0.1px',
    margin: '30px auto 10px',
    fontWeight: 500,
    '& p': {
      marginBottom: '10px',
    },
  },
}));

const ConfirmPaymentDetails = ({
  open,
  onSuccess,
  onClose,
  chosenAccount,
  chosenAmount,
  chosenDate,
  isAutoPaySetup,
  billingPeriod,
  achCompanyID,
  achLoanNumber,
  paymentRowID,
}) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentUpdated, setIsPaymentUpdated] = useState(false);
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();

  // billingType = 2 is for Recurring
  // billingType = 1 is for OneTime
  const billingType = isAutoPaySetup ? '2' : '1';

  // accountType = 0 is for Checking
  // accountType = 1 is for Saving
  const accountType = chosenAccount?.accountType === 'Checking' ? '0' : '1';

  const handleSuccess = useCallback(() => {
    if (paymentRowID) {
      setIsPaymentUpdated(false);
      onSuccess();
    } else {
      onSuccess();
    }
  }, [isPaymentUpdated]);

  const handleComplete = useCallback(() => {
    if (paymentRowID) {
      setIsPaymentUpdated(true);
    } else {
      onSuccess();
    }
  }, [isPaymentUpdated]);

  const [xmlImport] = useMutation(queries.SubmitOneTimePayment, { onCompleted: handleComplete });

  const handleOnSuccess = useCallback(() => {
    setIsSubmitting(true);

    if (paymentRowID) {
      // Edits Existing One-Time Payment
      xmlImport({
        variables: {
          payload: `<NLS>
                    <LOAN UpdateFlag="1" LoanNumber="${achLoanNumber}" >
                        <ACH Operation="UPDATE" RowID="${paymentRowID}" Amount="${chosenAmount}" AccountNumber="${chosenAccount?.accountNumber}" BillingNextDate="${chosenDate}"></ACH>
                    </LOAN>
                    </NLS>`,
        },
      });
    } else {
      // Submits New Payment
      xmlImport({
        variables: {
          payload: `<NLS><LOAN UpdateFlag="1" LoanNumber="${achLoanNumber}">
          <ACH ACHCompanyID="${achCompanyID}" BillingPeriod="${billingPeriod}" BillingType="${billingType}" AmountType="0" ABANumber="${chosenAccount?.routingNumber}" AccountNumber="${chosenAccount?.accountNumber}" AccountType="${accountType}" BillingStartDate="${chosenDate}" Amount="${chosenAmount}" OptionFlags="2"></ACH>
        </LOAN></NLS>`,
        },
      });
    }
  }, [
    chosenAccount,
    chosenAmount,
    chosenDate,
    achCompanyID,
    achLoanNumber,
    billingPeriod,
    billingType,
    paymentRowID,
  ]);

  return (
    <>
      <Backdrop open={open} className={classes.confirmPanelBackdrop}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Drawer
            id={'confirmPanel'}
            variant={'permanent'}
            anchor={'bottom'}
            open={open}
            className={classes.confirmPanelRoot}
            PaperProps={{
              className: globalClasses.modalPaper,
              ['data-testid']: 'ConfirmPaymentDetails',
            }}
          >
            <DialogContent>
              <Box className={classes.confirmTitleContainer}>
                <Typography
                  className={classes.confirmTitle}
                  color={'textPrimary'}
                  variant={'body2'}
                >
                  {t('content.Do you authorize this transaction') + '?'}
                </Typography>
                <Typography
                  className={classes.confirmSubTitle}
                  color={'textSecondary'}
                  variant={'body2'}
                >
                  {t('content.To complete this transaction')},&nbsp;
                  {t('content.please confirm that you are the holder of this account')}:
                </Typography>
                <Box className={classes.paymentDetails}>
                  <Grid container justify={'space-evenly'}>
                    <Grid item xs={6}>
                      {t('content.Routing Number')}
                      <br />
                      {t('content.Account Ending')}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <span>00000000</span>
                      <br />
                      {maskAccountNumber(chosenAccount?.accountNumber)}
                    </Grid>
                  </Grid>
                </Box>

                <Typography
                  className={classes.confirmSubTitle}
                  color={'textSecondary'}
                  variant={'body2'}
                >
                  {t(
                    'content.Please confirm that today you are authorizing Freedom Financial Network to schedule a',
                  )}
                  &nbsp;
                  {isAutoPaySetup ? t('content.recurring') : t('content.one-time')}
                  &nbsp;
                  {t('content.payment with the following details')}:
                </Typography>

                <Box className={classes.paymentDetails}>
                  <Grid container justify={'space-evenly'}>
                    <Grid item xs={6}>
                      {t('content.Payment Amount')}
                      <br />
                      {t('content.Payment Date')}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <span>{prettyCurrency(chosenAmount)}</span>
                      <br />
                      <span>{chosenDate}</span>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </DialogContent>
            <PrimaryButton className={cn(classes.buttonPayPastDue)} onClick={handleOnSuccess}>
              {isSubmitting ? <CircularProgress /> : t('content.Yes I authorize this transaction')}.
            </PrimaryButton>
            <SecondaryButton className={cn(classes.buttonGoBack)} onClick={onClose}>
              {t('content.Cancel')}
            </SecondaryButton>
          </Drawer>
        </Slide>
      </Backdrop>
      {isPaymentUpdated && (
        <SchedulePaymentUpdatedPrompt
          open={isPaymentUpdated}
          onSuccess={handleSuccess}
          autoPay={false}
          chosenAmount={chosenAmount}
          chosenDate={chosenDate}
          chosenAccount={chosenAccount}
        />
      )}
    </>
  );
};

export default ConfirmPaymentDetails;
