import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Backdrop, Box, Button, DialogContent, Grid, Slide, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

import { DangerButton } from '@/components';
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
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.background.border,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
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
}));

const CurrentlyPastDue = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const { open, handleAmountChosen, pastDueAmount, handleAutoPaySetupFail } = props;
  const [isOpen, setIsOpen] = useState(open);

  const handleAction = useCallback(() => {
    setIsOpen(false);
    handleAutoPaySetupFail();
    handleAmountChosen(pastDueAmount, false, true);
  }, []);
  const handleGoBack = useCallback(() => {
    setIsOpen(false);
    handleAutoPaySetupFail();
  }, []);

  return (
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
            ['data-testid']: 'SubmitPaymentPastDue',
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
              <Typography className={classes.confirmTitle} color={'textPrimary'} variant={'body2'}>
                {t('content.Please pay off your past due amount first') + '.'}
              </Typography>
            </Box>
            <Box>
              <Typography
                className={classes.confirmSubTitle}
                color={'textSecondary'}
                variant={'body2'}
              >
                {t('content.AutoPay is designed to pay down your contractual amount due')}.
                {t(
                  'content.We recommend scheduling a one time payment to get current or contact our Customer Service team for additional information about how to enroll in AutoPay',
                )}
                .
              </Typography>
            </Box>
          </DialogContent>
          <DangerButton className={cn(classes.buttonPayPastDue)} onClick={handleAction}>
            {t('content.Pay Past Due Amount')}
          </DangerButton>
          <Button className={cn(classes.buttonGoBack)} onClick={handleGoBack}>
            {t('content.Go Back')}
          </Button>
        </Drawer>
      </Slide>
    </Backdrop>
  );
};

export default CurrentlyPastDue;
