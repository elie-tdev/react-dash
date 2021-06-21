import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import {
  Backdrop,
  Box,
  DialogContent,
  Slide,
  Typography,
  Divider,
  Button,
  Grid,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

import maskAccountNumber from '@/utils/helper';
import { prettyCurrency } from '@/utils/prettyHelpers';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  confirmTitleContainer: {
    marginTop: '16px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  confirmPanelRoot: {
    zIndex: 5000,
    position: 'relative',
  },
  confirmTitle: {
    display: 'inline',
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '0.15px',
    lineHeight: '32px',
    paddingLeft: '8px',
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
  paymentTitle: {
    margin: '20px auto 30px',
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
    color: theme.palette,
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  okButton: {
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '24px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
    color: theme.palette.primary.main,
    margin: '20px auto 30px',
  },
  cancelIcon: {
    fontSize: '20px',
    borderRadius: '50%',
    lineHeight: '17px',
    width: '20px',
    height: '20px',
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
  },
  checkIcon: {
    color: green[500],
    float: 'left',
    cursor: 'pointer',
  },
  paymentDetails: {
    paddingBottom: '24px',
    paddingTop: '32px',
  },
  paymentDetailRow: {
    marginBottom: '8px',
    marginTop: '8px',
    color: theme.palette.text.secondary,
  },
  paymentDetailRow1: {
    marginBottom: '8px',
    marginTop: '8px',
  },
}));

const SchedulePaymentUpdatedPrompt = ({
  open,
  onSuccess,
  _onClose,
  autoPay,
  chosenAmount,
  chosenDate,
  chosenAccount,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const [isOpen, setIsOpen] = useState(open ?? false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onSuccess();
  }, [isOpen]);

  return (
    <Backdrop open={isOpen} className={cn(classes.confirmPanelBackdrop)}>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Drawer
          id={'confirmPanel'}
          variant={'permanent'}
          anchor={'bottom'}
          open={isOpen}
          className={cn(classes.confirmPanelRoot)}
          PaperProps={{
            className: globalClasses.modalPaper,
            ['data-testid']: 'AutoPayDisabledPrompt',
          }}
        >
          <DialogContent>
            <Box className={cn(classes.confirmTitleContainer)}>
              <CheckIcon className={classes.checkIcon} />

              <Typography
                className={cn(classes.confirmTitle)}
                color={'textPrimary'}
                variant={'body2'}
              >
                {t('content.Scheduled Payment Updated')}
              </Typography>
            </Box>
            <Box>
              <Typography
                className={cn(classes.confirmSubTitle)}
                color={'textSecondary'}
                variant={'body2'}
              >
                {t('content.Your payment has been successfully updated')}
              </Typography>
            </Box>
            <Divider />
            <Box className={classes.paymentDetails}>
              <Box>
                <Typography
                  className={cn(classes.confirmSubTitle)}
                  color={'textPrimary'}
                  variant={'body2'}
                >
                  {t('content.New Payment Settings')}
                </Typography>
              </Box>

              <Grid container justify={'space-evenly'}>
                <Grid item xs={6}>
                  <Box className={classes.paymentDetailRow}>{t('content.Payment Amount')}</Box>
                  <Box className={classes.paymentDetailRow}>{t('content.Pay On')}</Box>
                  <Box className={classes.paymentDetailRow}>{t('content.Pay From')}</Box>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Box className={classes.paymentDetailRow1}>{prettyCurrency(chosenAmount)}</Box>
                  <Box className={classes.paymentDetailRow1}>{chosenDate}</Box>
                  <Box className={classes.paymentDetailRow1}>
                    <span>{chosenAccount?.accountType}</span> (
                    {maskAccountNumber(chosenAccount?.accountNumber)})
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Button className={cn(classes.okButton)} onClick={handleClose}>
              {t('content.OK')}{' '}
            </Button>
          </DialogContent>
        </Drawer>
      </Slide>
    </Backdrop>
  );
};

export default SchedulePaymentUpdatedPrompt;
