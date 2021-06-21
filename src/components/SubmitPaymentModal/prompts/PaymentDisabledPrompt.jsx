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
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

import { prettyCurrency, prettyDate } from '@/utils/prettyHelpers';

const useStyles = makeStyles(theme => ({
  confirmTitleContainer: {
    marginTop: '16px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  confirmPanelRoot: {
    zIndex: 5000,
    position: 'relative',
  },
  confirmPanel: {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
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
}));

const PaymentDisabledPrompt = ({
  open,
  onSuccess,
  _onClose,
  autoPay,
  chosenAmount,
  chosenDate,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
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
            className: cn(classes.confirmPanel),
            ['data-testid']: 'AutoPayDisabledPrompt',
          }}
        >
          <DialogContent>
            <Box className={cn(classes.confirmTitleContainer)}>
              <CloseIcon className={cn(classes.cancelIcon)} />

              <Typography
                className={cn(classes.confirmTitle)}
                color={'textPrimary'}
                variant={'body2'}
              >
                {autoPay ? t('content.AutoPay Disabled') : t('content.Payment Cancelled')}
              </Typography>
            </Box>
            <Box>
              <Typography
                className={cn(classes.confirmSubTitle)}
                color={'textSecondary'}
                variant={'body2'}
              >
                {autoPay ? (
                  t('content.Your AutoPay has been successfully disabled')
                ) : (
                  <>
                    {t('content.Your payment of') + ' '}
                    {prettyCurrency(chosenAmount)}
                    {' ' + t('content.scheduled for') + ' '}
                    {prettyDate(chosenDate)}
                    {' ' + t('content.has been successfully cancelled')}.
                  </>
                )}
              </Typography>
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

export default PaymentDisabledPrompt;
