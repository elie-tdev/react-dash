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
import CloseIcon from '@material-ui/icons/Close';
import { useMutation } from '@apollo/client';

import PaymentDisabledPrompt from './PaymentDisabledPrompt';

import { DangerButton, PrimaryButton } from '@/components';
import { queries } from '@/gql';
import useGlobalStyles from '@/themes/useGlobalStyles';

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
    zIndex: 3000,
    position: 'relative',
  },
  buttonDontCancel: {
    margin: '0px auto 40px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
    color: theme.palette.info.main,
    backgroundColor: theme.palette.primary.background,
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
    },
  },
  buttonGoBack: {
    margin: '0px auto 80px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.lightBackground,
    '&:hover': {
      backgroundColor: theme.palette.error.lightBackground,
    },
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
    maxWidth: '230px',
  },
  errorLoader: {
    color: theme.palette.error.lightBackground,
  },
}));

const CancelAutoPayPrompt = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const { open, onSuccess, onClose, achLoanNumber, autoPayRecord } = props;
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [isAutoPayDisabled, setIsAutoPayDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentRowID = autoPayRecord?.Row_Id;

  const handleComplete = useCallback(() => {
    setIsAutoPayDisabled(true);
    setIsOpen(false);
    onSuccess();
  }, [isAutoPayDisabled]);

  const [xmlImport] = useMutation(queries.CancelAutopayPayment, { onCompleted: handleComplete });

  const handleSuccessAction = useCallback(() => {
    setIsSubmitting(true);

    xmlImport({
      variables: {
        payload: `<NLS><LOAN UpdateFlag="1" LoanNumber="${achLoanNumber}"><ACH Operation="UPDATE" RowID="${paymentRowID}" Status="1"></ACH></LOAN></NLS>`,
      },
    });
  }, [achLoanNumber, autoPayRecord]);

  const handleFailureAction = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, []);

  return (
    <>
      <Backdrop open={isOpen} className={classes.confirmPanelBackdrop}>
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Drawer
            id={'confirmPanel'}
            variant={'permanent'}
            anchor={'bottom'}
            open={isOpen}
            className={classes.confirmPanelRoot}
            PaperProps={{
              className: globalClasses.modalPaper,
              ['data-testid']: 'CancelAutoPayPrompt',
            }}
          >
            <DialogContent>
              <Grid container justify={'space-evenly'} className={classes.paymentChips}>
                <Grid item>
                  <Box className={classes.errorIconContainer}>
                    <CloseIcon className={classes.errorIcon} />
                  </Box>
                </Grid>
              </Grid>
              <Box className={classes.confirmTitleContainer}>
                <Typography
                  className={classes.confirmTitle}
                  color={'textPrimary'}
                  variant={'body2'}
                >
                  {t('content.Do you really wish to cancel AutoPay?')}
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={classes.confirmSubTitle}
                  color={'textSecondary'}
                  variant={'body2'}
                >
                  {t('Your automatic payments will be paused until you enroll back in AutoPay')}
                </Typography>
              </Box>
            </DialogContent>
            <PrimaryButton
              disabled={isSubmitting}
              className={cn(classes.buttonDontCancel)}
              onClick={handleFailureAction}
            >
              {t('content.No dont cancel')}.
            </PrimaryButton>
            <DangerButton
              disabled={isSubmitting}
              className={cn(classes.buttonGoBack)}
              onClick={handleSuccessAction}
            >
              {isSubmitting ? (
                <CircularProgress className={cn(classes.errorLoader)} />
              ) : (
                t('content.Yes disable')
              )}
              .
            </DangerButton>
          </Drawer>
        </Slide>
      </Backdrop>
      {isAutoPayDisabled && (
        <PaymentDisabledPrompt open={isAutoPayDisabled} autoPay={true} onSuccess={onSuccess} />
      )}
    </>
  );
};
export default CancelAutoPayPrompt;
