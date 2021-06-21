import React from 'react';
import { useTranslation } from 'react-i18next';
import { Backdrop, Box, DialogContent, Slide, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';

import { prettyCurrency } from '@/utils/prettyHelpers';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
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
    fontSize: '16px',
    letterSpacing: '0.1px',
    lineHeight: '24px',
  },
  confirmSubTitle: {
    margin: '20px auto 30px',
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: '16px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
  },
  confirmSubTitle2: {
    margin: '15px auto 40px',
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
  button: {
    margin: '0px auto 40px auto',
    maxWidth: '400px',
    display: 'block',
  },
}));

const AdditionalAmountPrompt = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const { amount, totalDueAmount, open, handleAmountChosen, onClose } = props;

  return (
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
            ['data-testid']: 'SubmitPaymentAdditionalAmount',
          }}
        >
          <DialogContent>
            <Box className={classes.confirmTitleContainer}>
              <Typography className={classes.confirmTitle} color={'textPrimary'} variant={'body2'}>
                {t('content.You will still owe') +
                  ' ' +
                  prettyCurrency(totalDueAmount - amount) +
                  ' ' +
                  t('content.after this payment')}
                .{' ' + t('Do you want to pay more to get back on track')}?
              </Typography>
            </Box>
            <Box className={classes.confirmTitleContainer}>
              <Typography color={'textSecondary'} variant={'body2'}>
                {t('Do you want to pay more to reduce your amount due?')}
              </Typography>
            </Box>
            <Box>
              <PrimaryButton
                className={classes.button}
                fullWidth={true}
                size={'medium'}
                onClick={() => handleAmountChosen(amount, false, true)}
              >
                {t('content.No, I will pay') + ' ' + prettyCurrency(amount) + '.'}
              </PrimaryButton>
              <SecondaryButton
                className={classes.button}
                fullWidth={true}
                size={'medium'}
                onClick={onClose}
              >
                {t('content.Yes, go back')}
              </SecondaryButton>
            </Box>
          </DialogContent>
        </Drawer>
      </Slide>
    </Backdrop>
  );
};

export default AdditionalAmountPrompt;
