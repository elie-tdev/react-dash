import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Backdrop,
  Box,
  Divider,
  DialogContent,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import cn from 'classnames';

import { PrimaryButton } from '@/components';
import maskAccountNumber from '@/utils/helper';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  confirmSubTitle: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  confirmPanelRoot: {
    zIndex: 3000,
    position: 'relative',
    '& > *': {
      paddingBottom: '20px',
    },
  },
  checkIcon: {
    color: green[500],
    float: 'right',
    margin: '10px 10px 0 0',
    cursor: 'pointer',
  },
  itemList: {
    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
  accountType: {
    color: theme.palette.text.primary,
    marginRight: '12px',
  },
  accountNumber: {
    color: theme.palette.text.hint,
  },
  dialogContent: {
    marginTop: '24px',
  },
  savedAccounts: {
    marginBottom: '16px',
  },
  listBorder: {
    borderColor: theme.palette.common.grey[200],
    borderWidth: '2px',
    borderStyle: 'solid',
    height: '56px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  listSelected: {
    borderColor: theme.palette.primary.main,
  },
}));

const PayFromAccountPrompt = ({
  open,
  bankAccounts,
  handleChosenAccount,
  handleCreateNewAccount,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const [chosenAccount, setChosenAccount] = useState(0);

  const handleChosenAccountInternal = useCallback(() => {
    handleChosenAccount(bankAccounts[chosenAccount]);
  }, [bankAccounts, chosenAccount]);

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
            ['data-testid']: 'SubmitPaymentPayFrom',
          }}
        >
          <Box className={classes.header}>
            <Box flex="1"></Box>
            <DialogContent className={classes.confirmSubTitle}>
              <Typography variant={'subtitle2'}>{t('content.Pay From')}</Typography>
            </DialogContent>
            <CheckIcon className={classes.checkIcon} onClick={handleChosenAccountInternal} />
          </Box>
          <Divider />
          <DialogContent className={classes.dialogContent}>
            {bankAccounts?.length > 0 && (
              <Box>
                <Typography
                  variant={'body2'}
                  color={'textSecondary'}
                  className={classes.savedAccounts}
                >
                  {t('content.Saved Accounts')}
                </Typography>
                <RadioGroup
                  aria-label="chosenAccount"
                  name="chosenAccount"
                  value={Number(chosenAccount)}
                  onChange={e => setChosenAccount(Number(e.target.value))}
                >
                  <List className={classes.itemList}>
                    {bankAccounts?.map((account, index) => (
                      <ListItem
                        key={index}
                        className={
                          chosenAccount === index
                            ? cn(classes.listBorder, classes.listSelected)
                            : cn(classes.listBorder)
                        }
                      >
                        <FormControlLabel
                          value={index}
                          control={<Radio />}
                          label={
                            <>
                              <Typography className={classes.accountType}>
                                {account.accountType}
                              </Typography>
                              <Typography className={classes.accountNumber}>
                                {maskAccountNumber(account.accountNumber)}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </RadioGroup>
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <PrimaryButton variant="text" fullWidth={false} onClick={handleCreateNewAccount}>
                {'+ ' + t('content.New Payment Account')}
              </PrimaryButton>
            </Box>
          </DialogContent>
        </Drawer>
      </Slide>
    </Backdrop>
  );
};

export default PayFromAccountPrompt;
