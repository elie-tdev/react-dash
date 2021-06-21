import {
  Box,
  Drawer,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Card,
  Typography,
  Divider,
  FormHelperText,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { accountNumber as accountNumberValidator } from 'us-bank-account-validator';
import { useMutation } from '@apollo/client';
import { validate } from 'abavalidator';

import useGlobalStyles from '@/themes/useGlobalStyles';
import { PrimaryButton, Loader } from '@/components';
import { queries } from '@/gql';
import { useAuthUser } from '@/customHooks';

const useStyles = makeStyles(theme => ({
  inputField: {
    marginTop: '12px',
  },
  inputLabel: {
    color: theme.palette.text.primary,
  },
  newPaymentMethodInput: {
    height: 'auto',
    marginTop: '20px',
    marginBottom: '10px',
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  confirmPanelRoot: {
    zIndex: 3000,
    position: 'relative',
    '& > *': {
      paddingBottom: '20px',
    },
  },
  inputFieldLast: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  inputFieldLastLabel: {
    top: '-15px',
  },
  saveAsDefaultCard: {
    paddingBottom: '16px',
  },
  saveAsDefaultBox: {
    backgroundColor: theme.palette.common.grey[100],
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  headerTitle: {
    color: '#516795',
    fontWeight: 500,
  },
  arrowBackBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  errorText: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.palette.error.main,
    marginLeft: '0px',
    marginBottom: '8px',
  },
}));

const NewPaymentAccount = ({
  setIsNewPaymentAccountModalOpen,
  open,
  onClose,
  handleChosenAccount,
  bankAccounts,
  cifNumber,
}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const { t } = useTranslation();
  const [isPrimary, setIsPrimary] = useState(true);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [verifyAccountNumber, setVerifyAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const { contactId } = useAuthUser();

  const [xmlImport, { loading }] = useMutation(queries.UpdateBankAccounts, {
    refetchQueries: [{ query: queries.BankAccounts, variables: { contact_id: contactId } }],
  });

  const routingNumberError = routingNumber !== '' && !validate(routingNumber);
  const accountNumberError = accountNumber !== '' && !accountNumberValidator(accountNumber).isValid;
  const accountAlreadyExistsError =
    accountNumber !== '' &&
    routingNumber !== '' &&
    bankAccounts.find(
      account => account.accountNumber === accountNumber && account.routingNumber === routingNumber,
    );
  const verifyAccountNumberError =
    verifyAccountNumber !== '' && !accountNumberValidator(verifyAccountNumber).isValid;
  const verifyMatchedAccountNumberError =
    accountNumber !== '' && verifyAccountNumber !== '' && verifyAccountNumber !== accountNumber;

  const routingNumberErrorMessage = t('content.Must be a valid routing number');
  const accountAlreadyExitsErrorMessage = t(
    'content.This bank account is already associated with your account',
  );
  const accountNumberErrorMessage = t('content.Invalid account number');
  const matchedAccountNumberErrorMessage = t('content.Bank account numbers must match');

  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={open}
        keepMounted
        disablePortal
        onClose={onClose}
        className={classes.confirmPanelRoot}
        PaperProps={{ className: globalClasses.modalPaper }}
      >
        <Box className={cn(classes.header, globalClasses.row)}>
          <Box className={classes.arrowBackBox}>
            <ArrowBackIcon onClick={() => setIsNewPaymentAccountModalOpen(false)} />
          </Box>
          <Typography className={classes.headerTitle}>
            {t('content.New Payment Account')}
          </Typography>
          <Box flex={1}></Box>
        </Box>
        <Divider />
        <DialogContent>
          <FormControl variant={'outlined'} fullWidth={true} className={classes.inputField}>
            <InputLabel shrink className={classes.inputLabel}>
              {t('content.Routing Number')}
            </InputLabel>
            <OutlinedInput
              label={t('content.Routing Number')}
              placeholder={t('content.Routing Number')}
              className={classes.newPaymentMethodInput}
              key={'routingNum'}
              id={'routingNum'}
              type={'text'}
              variant={'outlined'}
              fullWidth
              autoFocus
              notched={false}
              value={routingNumber}
              onChange={e => setRoutingNumber(e.target.value)}
              error={routingNumberError}
            />
          </FormControl>
          {routingNumberError && (
            <FormHelperText className={cn(classes.errorText)}>
              {routingNumberErrorMessage}
            </FormHelperText>
          )}

          <FormControl variant={'outlined'} fullWidth={true} className={classes.inputField}>
            <InputLabel shrink className={classes.inputLabel}>
              {t('content.Account Number')}
            </InputLabel>
            <OutlinedInput
              label={t('content.Account Number')}
              placeholder={t('content.Account Number')}
              className={classes.newPaymentMethodInput}
              key={'accountNum'}
              id={'accountNum'}
              type={'text'}
              variant={'outlined'}
              fullWidth
              notched={false}
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              error={accountNumberError}
            />
          </FormControl>
          {accountNumberError && (
            <FormHelperText className={cn(classes.errorText)}>
              {accountNumberErrorMessage}
            </FormHelperText>
          )}
          {accountAlreadyExistsError && (
            <FormHelperText className={cn(classes.errorText)}>
              {accountAlreadyExitsErrorMessage}
            </FormHelperText>
          )}

          <FormControl variant={'outlined'} fullWidth={true} className={classes.inputField}>
            <InputLabel shrink className={classes.inputLabel}>
              {t('content.Verify Account Number')}
            </InputLabel>
            <OutlinedInput
              label={t('content.Verify Account Number')}
              placeholder={t('content.Verify Account Number')}
              className={classes.newPaymentMethodInput}
              key={'accountNumVerify'}
              id={'accountNumVerify'}
              type={'text'}
              variant={'outlined'}
              fullWidth
              notched={false}
              value={verifyAccountNumber}
              onChange={e => setVerifyAccountNumber(e.target.value)}
              error={verifyAccountNumberError}
            />
          </FormControl>
          {verifyAccountNumberError && (
            <FormHelperText className={cn(classes.errorText)}>
              {accountNumberErrorMessage}
            </FormHelperText>
          )}
          {verifyMatchedAccountNumberError && (
            <FormHelperText className={cn(classes.errorText)}>
              {matchedAccountNumberErrorMessage}
            </FormHelperText>
          )}

          <FormControl variant={'outlined'} fullWidth={true} className={classes.inputFieldLast}>
            <InputLabel shrink className={cn(classes.inputFieldLastLabel, classes.inputLabel)}>
              {t('content.Account Type')}
            </InputLabel>
            <Select value={accountType} onChange={e => setAccountType(e.target.value)}>
              <MenuItem value={t('content.Checking')}>{t('content.Checking')}</MenuItem>
              <MenuItem value={t('content.Savings')}>{t('content.Savings')}</MenuItem>
            </Select>
          </FormControl>
          <Card elevation={0} className={classes.saveAsDefaultCard}>
            <Box className={classes.saveAsDefaultBox}>
              <Typography className={classes.inputLabel}>
                {t('content.Save as default payment account')}
              </Typography>
              <Switch
                color={'primary'}
                checked={isPrimary}
                onChange={() => setIsPrimary(!isPrimary)}
              />
            </Box>
          </Card>
          <Box>
            <PrimaryButton
              disabled={
                routingNumberError ||
                accountNumberError ||
                accountAlreadyExistsError ||
                verifyAccountNumberError ||
                verifyMatchedAccountNumberError ||
                loading ||
                routingNumber === '' ||
                accountNumber === '' ||
                verifyAccountNumber === '' ||
                accountType === ''
              }
              className={cn(classes.buttonAutoPayBlue)}
              onClick={async () => {
                await xmlImport({
                  variables: {
                    payload: `<NLS><CIF CIFNumber="${cifNumber}" UpdateFlag="1"><CIFFINANCIALS CIFFinancial1="${JSON.stringify(
                      {
                        bankAccounts: [
                          ...(bankAccounts ?? []),
                          { routingNumber, accountNumber, accountType, isPrimary },
                        ].map(bankAccount =>
                          bankAccount.accountNumber === accountNumber
                            ? { routingNumber, accountNumber, accountType, isPrimary }
                            : {
                                ...bankAccount,
                                isPrimary: isPrimary ? false : bankAccount.isPrimary,
                              },
                        ),
                      },
                    ).replace(/"/g, "'")}" /></CIF></NLS>`,
                  },
                });
                setIsNewPaymentAccountModalOpen(false);
                if (handleChosenAccount) {
                  handleChosenAccount({
                    accountNumber: accountNumber,
                    accountType: accountType,
                    routingNumber: routingNumber,
                  });
                }
              }}
            >
              {t('content.Add New Account')}
            </PrimaryButton>
          </Box>
        </DialogContent>
        {loading && <Loader />}
      </Drawer>
    </>
  );
};

export default NewPaymentAccount;
