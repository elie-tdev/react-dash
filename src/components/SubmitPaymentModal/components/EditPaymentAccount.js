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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import { accountNumber as accountNumberValidator } from 'us-bank-account-validator';
import { green } from '@material-ui/core/colors';
import { useMutation } from '@apollo/client';
import { validate as validateRoutingNumber } from 'abavalidator';

import maskAccountNumber from '@/utils/helper';
import useGlobalStyles from '@/themes/useGlobalStyles';
import { PrimaryButton, Loader } from '@/components';
import { useAuthUser } from '@/customHooks';
import { queries } from '@/gql';
import { DangerButton, SecondaryButton } from '@/components/Button';

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
  checkIcon: {
    color: green[500],
    float: 'right',
    cursor: 'pointer',
  },
  deleteAccountTitle: {
    marginTop: theme.spacing(3),
    marginBottom: '52px',
    textAlign: 'center',
  },
  deleteAccountBody: {
    justifyContent: 'center',
    marginBottom: '48px',
    color: theme.palette.text.secondary,
  },
  accountType: {
    color: theme.palette.text.primary,
    marginRight: '12px',
  },
  accountNumber: {
    color: theme.palette.text.hint,
  },
  accountBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '12px 20px 12px 16px',
    border: '1px solid rgba(50, 70, 100, 0.08)',
    borderRadius: '8px',
    marginBottom: '32px',
  },
  dialogContent: {
    padding: '40px 48px 24px 48px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 24px 24px 24px',
    },
  },
  buttonsContainer: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      minHeight: '110px',
      height: 'calc(100vh - 632px)',
    },
  },
  buttonsWrapp: {
    position: 'absolute',
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      bottom: theme.spacing(0),
      left: theme.spacing(0),
      right: theme.spacing(0),
    },
  },
  modalPaper: {
    width: '592px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  deleteModalPaper: {
    width: '592px',
    left: 'auto',
    right: 0,
  },
  deleteAccountButton: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.lightBackground,
    borderRadius: theme.spacing(1),
    '&:hover': {
      color: theme.palette.common.white,
    },
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

const EditPaymentAccount = ({
  setIsEditPaymentAccountModalOpen,
  open,
  onClose,
  bankAccounts,
  cifNumber,
  account,
  isDeletionConfirmationModalOpenProp = false,
}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const { t } = useTranslation();
  const { contactId } = useAuthUser();
  const [isPrimary, setIsPrimary] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [verifyAccountNumber, setVerifyAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isDeletionConfirmationModalOpen, setIsDeletionConfirmationModalOpen] = useState(false);

  const isDownSMScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [xmlImport, { loading }] = useMutation(queries.UpdateBankAccounts, {
    refetchQueries: [{ query: queries.BankAccounts, variables: { contact_id: contactId } }],
  });

  useEffect(() => {
    if (isDeletionConfirmationModalOpenProp) {
      setIsDeletionConfirmationModalOpen(true);
    }
  }, [isDeletionConfirmationModalOpenProp]);

  useEffect(() => {
    if (account) {
      setIsPrimary(account.isPrimary);
      setRoutingNumber(account.routingNumber);
      setAccountNumber(account.accountNumber);
      setVerifyAccountNumber(account.accountNumber);
      setAccountType(account.accountType);
    }
  }, [account]);

  const routingNumberError = routingNumber !== '' && !validateRoutingNumber(routingNumber);
  const accountNumberError = accountNumber !== '' && !accountNumberValidator(accountNumber).isValid;
  const accountAlreadyExistsError =
    accountNumber !== '' &&
    routingNumber !== '' &&
    bankAccounts.find(
      bankAccount =>
        bankAccount.accountNumber === accountNumber &&
        bankAccount.routingNumber === routingNumber &&
        account.accountNumber !== accountNumber &&
        account.routingNumber !== routingNumber,
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

  const hasEdits = useMemo(
    () =>
      account &&
      ((routingNumber !== account?.routingNumber && routingNumber !== '') ||
        (accountNumber !== account?.accountNumber && accountNumber !== '') ||
        (verifyAccountNumber !== account?.accountNumber && accountNumber !== '') ||
        (accountType !== account?.accountType && accountType !== '') ||
        isPrimary !== account?.isPrimary),
    [account, routingNumber, accountNumber, verifyAccountNumber, accountType, isPrimary],
  );

  return (
    <>
      <Drawer
        anchor={isDownSMScreen ? 'bottom' : 'right'}
        open={open}
        keepMounted
        disablePortal
        onClose={onClose}
        className={classes.confirmPanelRoot}
        PaperProps={{ className: isDownSMScreen ? globalClasses.modalPaper : classes.modalPaper }}
      >
        <Box className={cn(classes.header, globalClasses.row)}>
          <Box flex={1} display="flex" alignItems="center">
            <ArrowBackIcon onClick={() => setIsEditPaymentAccountModalOpen(false)} />
          </Box>
          <Typography className={classes.headerTitle}>
            {t('content.Edit Payment Account')}
          </Typography>
          <Box flex={1}>{hasEdits && <CheckIcon className={classes.checkIcon} />}</Box>
        </Box>
        <Divider />
        <DialogContent className={classes.dialogContent}>
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
            <Select
              value={accountType}
              onChange={e => {
                setAccountType(e.target.value);
              }}
            >
              <MenuItem value={t('content.Checking')}>{t('content.Checking')}</MenuItem>
              <MenuItem value={t('content.Savings')}>{t('content.Savings')}</MenuItem>
            </Select>
          </FormControl>
          <Card elevation={0} className={classes.saveAsDefaultCard}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className={classes.saveAsDefaultBox}
            >
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
          <Box className={classes.buttonsContainer}>
            <Box className={classes.buttonsWrapp}>
              {hasEdits && (
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
                            bankAccounts: bankAccounts.map(bankAccount =>
                              bankAccount.accountNumber === account.accountNumber
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
                    setIsEditPaymentAccountModalOpen(false);
                  }}
                >
                  {t('content.Save Edits')}
                </PrimaryButton>
              )}
              <Box>
                <DangerButton
                  disabled={loading}
                  onClick={() => {
                    setIsDeletionConfirmationModalOpen(true);
                  }}
                  className={cn(classes.deleteAccountButton)}
                >
                  {t('content.Delete Account')}
                </DangerButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        {loading && <Loader />}
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={isDeletionConfirmationModalOpen}
        keepMounted
        disablePortal
        onClose={() => setIsDeletionConfirmationModalOpen(false)}
        className={classes.confirmPanelRoot}
        PaperProps={{
          className: isDownSMScreen
            ? globalClasses.modalPaper
            : cn(globalClasses.modalPaper, classes.deleteModalPaper),
        }}
      >
        <DialogContent>
          <Typography variant="h1" className={classes.deleteAccountTitle}>
            {t('content.Do you really wish to delete this account?')}
          </Typography>
          <Box className={classes.accountBox}>
            <Typography className={classes.accountType}>{account?.accountType}</Typography>
            <Typography className={classes.accountNumber}>
              {maskAccountNumber(account?.accountNumber)}
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.deleteAccountBody}>
            {t('content.Delete Account Body')}
          </Typography>
          <DangerButton
            className={cn(classes.deleteAccountButton)}
            disabled={loading}
            onClick={async () => {
              await xmlImport({
                variables: {
                  payload: `<NLS><CIF CIFNumber="${cifNumber}" UpdateFlag="1"><CIFFINANCIALS CIFFinancial1="${JSON.stringify(
                    {
                      bankAccounts: bankAccounts.filter(
                        bankAccount => bankAccount.accountNumber !== account.accountNumber,
                      ),
                    },
                  ).replace(/"/g, "'")}" /></CIF></NLS>`,
                },
              });
              setIsDeletionConfirmationModalOpen(false);
              setIsEditPaymentAccountModalOpen(false);
            }}
          >
            {t('content.Yes, delete')}
          </DangerButton>
          <SecondaryButton onClick={() => setIsDeletionConfirmationModalOpen(false)}>
            {t('content.No')}
          </SecondaryButton>
        </DialogContent>
        {loading && <Loader />}
      </Drawer>
    </>
  );
};

export default EditPaymentAccount;
