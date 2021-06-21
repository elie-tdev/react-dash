import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Backdrop, Box, DialogContent, Grid, Slide, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';

import { PrimaryButton } from '@/components';
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
  additionalAmountInput: {
    height: '92px',
    borderRadius: '8px',
  },
  additionalAmountInputLabel: {
    top: '20px',
  },
  buttonAutoPay: {
    margin: '0px auto 40px auto',
    width: '80%',
    maxWidth: '400px',
    display: 'block',
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
    margin: '10px auto auto auto',
    maxWidth: '230px',
  },
}));

const PreExistingPaymentScheduled = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const { open } = props;
  const [isOpen, setIsOpen] = useState(open);

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
            ['data-testid']: 'PreExistingPaymentScheduled',
          }}
        >
          <DialogContent>
            <Grid container justify={'space-evenly'} className={classes.paymentChips}>
              <Grid item>
                <Box className={cn(classes.autoPayOn, classes.chip)}>
                  {t('content.Please Note')}
                </Box>
              </Grid>
            </Grid>
            <Box className={classes.confirmTitleContainer}>
              <Typography className={classes.confirmTitle} color={'textPrimary'} variant={'body2'}>
                {t('content.You already have a scheduled payment') + '.'}
              </Typography>
            </Box>
            <Box>
              <Typography
                className={classes.confirmSubTitle}
                color={'textSecondary'}
                variant={'body2'}
              >
                {t('content.Payment submitted now will be in addition to this scheduled payment')}.
              </Typography>
            </Box>
          </DialogContent>
          <PrimaryButton className={cn(classes.buttonAutoPay)} onClick={() => setIsOpen(false)}>
            {t('content.OK')}
          </PrimaryButton>
        </Drawer>
      </Slide>
    </Backdrop>
  );
};

export default PreExistingPaymentScheduled;
