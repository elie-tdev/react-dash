import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import { Backdrop, Box, DialogContent, Divider, Grid, Typography, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CalendarToday, Check } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import HttpsIcon from '@material-ui/icons/Https';
import dateformat from 'dateformat';
import { useParams } from 'react-router-dom';

import { CustomListItem, NewPaymentAccount } from './components';
import {
  SuccessPrompt,
  AdditionalAmountPrompt,
  CurrentlyEnrolledAutoPay,
  CurrentlyPastDue,
  PayFromAccountPrompt,
  SelectPaymentDatePrompt,
  PreExistingPaymentScheduled,
  ConfirmPaymentDetails,
  LoadingDataError,
  AutoPayErrorState,
  CancelAutoPayPrompt,
} from './prompts';

import { DangerButton, PrimaryButton } from '@/components';
import { cleanAmount, prettyCurrency, prettyDate } from '@/utils/prettyHelpers';
import useGlobalStyles from '@/themes/useGlobalStyles';
import {
  formatShortDateString,
  formatMediumDateMonthString,
  formatDateMonthYearString,
  frequency,
} from '@/properties';
import maskAccountNumber from '@/utils/helper';
import { useBankAccounts, useLoanState, useOneTimePayments } from '@/customHooks';
import CancelPaymentPrompt from '@/components/SubmitPaymentModal/prompts/CancelPaymentPrompt';

const useStyles = makeStyles(theme => ({
  lowerText: {
    position: 'absolute',
    bottom: '30px',
    textAlign: 'center',
    fontSize: '13px',
    lineHeight: '18px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
  },
  confirmingBox: {
    minHeight: '150px',
  },
  helperText: {
    textAlign: 'center',
    display: 'block',
    margin: 'auto auto 20px auto',
    width: '80%',
    fontSize: '12px',
    '& span': {
      fontSize: '13px',
      marginBottom: '-2px',
    },
  },
  selectAmountTitle: {
    textAlign: 'center',
    display: 'block',
    color: theme.palette.primary.main,
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 500,
    marginBottom: '5px',
  },
  addAccount: {
    color: theme.palette.text.primary,
  },
  pastDueText: {
    color: theme.palette.error.main,
  },
  payFrom: {
    color: theme.palette.text.primary,
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
  dueOn: {
    borderColor: '#eef0ff',
    backgroundColor: '#eef0ff',
    color: theme.palette.primary.main,
    '& span': {
      height: '7px',
      width: '7px',
      marginRight: '5px',
      borderRadius: '7px',
      display: 'inline-block',
      backgroundColor: theme.palette.primary.main,
    },
  },
  spaced: {
    fontSize: '13px',
    lineHeight: '22px',
    letterSpacing: '2px',
    color: theme.palette.text.hint,
    margin: '0px 6px 10px',
    display: 'inline-block',
  },
  bolder: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
  },
  bold: {
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    '& div:nth-of-type(2) svg': {
      fill: theme.palette.success.main,
    },
  },
  headerAutoPay: {
    height: '44px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    '& > *': {
      margin: '10px 10px',
    },
    '& p': {
      color: theme.palette.primary.contrastText,
    },
    '& svg': {
      fill: theme.palette.common.white,
    },
    backgroundColor: theme.palette.primary.main,
  },
  scheduleButton: {
    width: '90%',
    maxWidth: '400px',
    display: 'block',
    margin: '10px auto auto',
  },
  infoButton: {
    float: 'right',
    marginRight: '10px',
  },
  headerTitle: {
    display: 'block',
    textAlign: 'center',
    color: '#516795',
    fontWeight: 500,
  },
  content: {
    marginTop: '30px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  paymentChips: {
    margin: '10px auto auto auto',
    maxWidth: '230px',
  },
  dialogContent: {
    minHeight: '50vh',
  },
  button: {
    margin: '40px auto 0px auto',
    maxWidth: '400px',
    display: 'block',
  },
  buttonDisableAutoPay: {
    margin: '20px auto 20px auto',
    maxWidth: '400px',
    display: 'block',
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.lightBackground,
    '&:hover': {
      backgroundColor: theme.palette.error.lightBackground,
    },
  },
}));

const SubmitPaymentModal = ({
  onClose,
  onSuccess,
  open,
  isAutoPaySetup,
  isManagePayment,
  rowID,
}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const { t } = useTranslation();
  const { loanNumber } = useParams();
  const {
    isAutoPay,
    isBilled,
    isCurrent,
    hasOneTimePayment,
    balanceAmount,
    dueAmount,
    pastDueAmount,
    nextPaidAmount,
    recurringPaymentDate,
    amortizedPaymentAmount,
    lastPaidAmount,
    lastPayDate,
    autoPayErrorState,
    billingPeriod,
    achCompanyID,
    achLoanNumber,
    autoPayRecord,
    oneTimePaymentRowIds,
  } = useLoanState(loanNumber);

  const { oneTimePayments } = useOneTimePayments(oneTimePaymentRowIds);

  const paymentID = useMemo(() => {
    return isManagePayment && isAutoPay && !rowID ? autoPayRecord?.Row_Id : rowID;
  }, [autoPayRecord, isManagePayment, isAutoPay, rowID]);

  const dueDate = useMemo(() => {
    return recurringPaymentDate ? recurringPaymentDate : null;
  }, [recurringPaymentDate]);

  const { bankAccounts, cifNumber } = useBankAccounts();

  const [confirmDrawerOpen, setConfirmDrawerOpen] = useState(false);
  const [amountDecided, setAmountDecided] = useState(false);
  const [isNewPaymentModalOpen, setIsNewPaymentAccountModalOpen] = useState(false);
  const [confirmAutoPayDisable, setConfirmAutoPayDisable] = useState(false);
  const [confirmPaymentCancel, setConfirmPaymentCancel] = useState(false);
  const [payOnDate, setPayOnDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [chosenAccount, setChosenAccount] = useState();
  const [otherAmount, setOtherAmount] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [selectPaymentDateOpen, setSelectPaymentDateOpen] = useState(false);
  const [selectPaymentAccountOpen, setSelectPaymentAccountOpen] = useState(false);
  const [isAutoPaySetupConfirmed, setIsAutoPaySetupConfirmed] = useState(
    isAutoPaySetup && !isAutoPay ? isAutoPaySetup : false,
  );
  const formattedDueDate = useMemo(() => dateformat(dueDate, formatShortDateString), [dueDate]);
  const formattedDisplayDueDate = useMemo(() => dateformat(dueDate, formatMediumDateMonthString), [
    dueDate,
  ]);
  const formattedDisplayDueDateNLS = useMemo(
    () => (lastPayDate ? dateformat(dueDate, formatDateMonthYearString) : null),
    [payOnDate],
  );
  const formattedpayOnDate = useMemo(
    () => (lastPayDate ? dateformat(payOnDate, formatDateMonthYearString) : null),
    [payOnDate],
  );
  const formattedLastPayDate = useMemo(
    () => (lastPayDate ? dateformat(lastPayDate, formatMediumDateMonthString) : null),
    [lastPayDate],
  );

  const oneTimePayment = useMemo(
    () =>
      oneTimePayments &&
      oneTimePayments.activePayments &&
      oneTimePayments.activePayments.filter(row => {
        return row.rowId === paymentID;
      }),
    [oneTimePayments, paymentID],
  );

  const resetFlow = useCallback(() => {
    setPaymentConfirm(false);
    setConfirmDrawerOpen(false);
    setAmountDecided(isAutoPaySetupConfirmed || isManagePayment ? true : false);
    setPaymentSuccess(false);
    setIsNewPaymentAccountModalOpen(false);
    setSelectPaymentDateOpen(false);
    setSelectPaymentAccountOpen(false);
    setAmount(
      isAutoPaySetupConfirmed || (isAutoPay && isManagePayment && (rowID === undefined || !rowID))
        ? amortizedPaymentAmount
        : dueAmount,
    );
    setOtherAmount(undefined);
    setChosenAccount(bankAccounts ? bankAccounts.filter(account => account.isPrimary)[0] : null);
    const newDate = new Date();
    const twoDaysFrom = new Date(newDate.setDate(newDate.getDate() + 2));
    setPayOnDate(twoDaysFrom);
    if (rowID && oneTimePayment && oneTimePayment.length > 0) {
      setAmount(oneTimePayment[0].amount);
      setPayOnDate(oneTimePayment[0].scheduledDate);
      setChosenAccount({
        accountType:
          oneTimePayment[0].accountType === 0 ? t('content.Checking') : t('content.Savings'),
        type: oneTimePayment[0].accountType,
        accountNumber: oneTimePayment[0].accountNumber,
      });
    }
  }, [
    bankAccounts,
    isAutoPaySetupConfirmed,
    dueDate,
    dueAmount,
    paymentID,
    isManagePayment,
    oneTimePayment,
    rowID,
  ]);

  useEffect(() => {
    resetFlow();
  }, [open, dueDate, recurringPaymentDate]);

  const handleAmountChosen = useCallback(
    (chosenAmount, confirm, skip) => {
      if (chosenAmount) {
        setAmount(Number(chosenAmount));
      }
      if (
        (confirm && !isManagePayment && pastDueAmount > 0) ||
        (!skip &&
          pastDueAmount > chosenAmount &&
          pastDueAmount > 0 &&
          !isManagePayment &&
          !isCurrent) ||
        (!skip && dueAmount > chosenAmount && dueAmount > 0 && !isManagePayment && !isCurrent)
      ) {
        setConfirmDrawerOpen(true);
      } else {
        setAmountDecided(true);
        setConfirmDrawerOpen(false);
      }
    },
    [pastDueAmount],
  );

  const handlePaymentConfirmation = useCallback(() => {
    setPaymentConfirm(true);
  }, []);

  const handleSuccess = useCallback(() => {
    setPaymentSuccess(true);
  }, []);

  const handleChosenAccount = useCallback(chosen => {
    setIsNewPaymentAccountModalOpen(false);
    setSelectPaymentAccountOpen(false);
    setChosenAccount(chosen);
  }, []);

  const handleCreateNewAccount = useCallback(() => {
    setSelectPaymentAccountOpen(false);
    setIsNewPaymentAccountModalOpen(true);
  }, []);

  const handleAutoPaySetupFail = useCallback(() => {
    setAmountDecided(false);
    setIsAutoPaySetupConfirmed(false);
  }, []);

  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Backdrop className={globalClasses.backdrop} open={open}>
          <Drawer
            id={'submitPaymenModalt'}
            keepMounted
            disablePortal
            anchor={'bottom'}
            open={open}
            onClose={onClose}
            classes={{
              root: classes.root,
            }}
            PaperProps={{
              className: globalClasses.modalPaper,
              ['data-testid']: 'SubmitPayment',
            }}
          >
            <Box
              className={cn(
                isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                  ? classes.headerAutoPay
                  : classes.header,
                globalClasses.row,
              )}
            >
              <Box flex={1} display="flex" alignItems="center">
                <CloseIcon onClick={onClose} />
              </Box>
              <Typography className={classes.headerTitle}>
                {!isAutoPaySetupConfirmed && !paymentID ? (
                  t('content.Schedule a Payment')
                ) : (
                  <>
                    {isManagePayment ? (
                      <>
                        {isAutoPay && !rowID
                          ? t('content.Manage AutoPay')
                          : t('content.Manage Payment')}
                      </>
                    ) : (
                      <>{t('content.Enroll in AutoPay')}</>
                    )}
                  </>
                )}
              </Typography>
              {isAutoPaySetupConfirmed && !autoPayErrorState ? (
                <Box flex={1}>
                  <Check className={classes.infoButton} onClick={() => setPaymentConfirm(true)} />
                </Box>
              ) : (
                <Box flex={1}></Box>
              )}
            </Box>
            {!isAutoPaySetupConfirmed && <Divider />}
            {!isManagePayment ||
              (isManagePayment && isAutoPay && !rowID && (
                <Box className={classes.content}>
                  <Typography variant={'caption'} className={classes.spaced}>
                    &bull;&bull;&bull;&bull;
                    {loanNumber && maskAccountNumber(loanNumber.toString())}
                  </Typography>
                  <br />
                  <Typography variant={'caption'} color={'textSecondary'}>
                    {t('content.Last paid') + ' '}
                  </Typography>
                  <Typography variant={'caption'} className={classes.bold}>
                    {prettyCurrency(lastPaidAmount)}
                  </Typography>
                  <Typography variant={'caption'} color={'textSecondary'}>
                    {' ' + t('content.on') + ' '}
                  </Typography>
                  <Typography variant={'caption'} className={classes.bold}>
                    {formattedLastPayDate}
                  </Typography>

                  <Grid container justify={'space-evenly'} className={classes.paymentChips}>
                    {isAutoPay && !autoPayErrorState ? (
                      <Grid item>
                        <Box className={cn(classes.autoPayOn, classes.chip)}>
                          {t('content.AutoPay On')}
                        </Box>
                      </Grid>
                    ) : (
                      <>
                        {pastDueAmount || isAutoPaySetupConfirmed ? (
                          <Grid item>
                            <Box className={cn(classes.dueOn, classes.chip)}>
                              <span></span>
                              {t('content.Due on')} {formattedDueDate}
                            </Box>
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </Grid>
                </Box>
              ))}

            {!isNewPaymentModalOpen && (
              <>
                {autoPayErrorState && isAutoPaySetup ? (
                  <AutoPayErrorState loanNumber={loanNumber} />
                ) : (
                  <Box>
                    {amountDecided ? (
                      <>
                        <DialogContent className={classes.dialogContent}>
                          <CustomListItem
                            primary={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? t('content.Recurring Payment Amount')
                                : t('content.Payment Amount')
                            }
                            secondary={prettyCurrency(
                              paymentID && !isAutoPay && !oneTimePayments
                                ? dueAmount
                                : otherAmount !== null && Number(otherAmount) > 0
                                ? Number(otherAmount)
                                : isManagePayment
                                ? amortizedPaymentAmount
                                : amount,
                            )}
                            tertiary={''}
                            icon={!isAutoPaySetupConfirmed && !paymentID ? <EditIcon /> : undefined}
                            disabled={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                            }
                            onClick={
                              !isAutoPaySetupConfirmed && !paymentID
                                ? () => setAmountDecided(false)
                                : undefined
                            }
                            value={
                              paymentID && !isAutoPay && !oneTimePayments
                                ? dueAmount
                                : otherAmount || otherAmount === ''
                                ? otherAmount
                                : amount
                            }
                            onChange={
                              paymentID && !isAutoPay
                                ? e => setOtherAmount(cleanAmount(e.target.value))
                                : isManagePayment && !isAutoPay
                                ? e => setAmount(cleanAmount(e.target.value))
                                : undefined
                            }
                            handleAmountChosen={
                              paymentID && !isAutoPay && isManagePayment
                                ? handleAmountChosen
                                : undefined
                            }
                          />
                          <CustomListItem
                            primary={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? t('content.Payment Frequency')
                                : t('content.Pay From')
                            }
                            secondary={
                              isAutoPaySetupConfirmed ||
                              (isManagePayment && isAutoPay && !rowID) ? (
                                frequency(billingPeriod)
                              ) : (
                                <>
                                  {chosenAccount
                                    ? `${chosenAccount.accountType}`
                                    : t('content.Add Account')}
                                </>
                              )
                            }
                            tertiary={
                              isAutoPaySetupConfirmed ||
                              (isManagePayment && isAutoPay && !rowID) ? (
                                false
                              ) : (
                                <>
                                  {chosenAccount && maskAccountNumber(chosenAccount.accountNumber)}
                                </>
                              )
                            }
                            quaternary={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? t('content.Next payment will be made on ') +
                                  formattedDisplayDueDate
                                : false
                            }
                            icon={
                              isAutoPaySetupConfirmed ||
                              (isManagePayment && isAutoPay && !rowID) ? (
                                false
                              ) : (
                                <>{chosenAccount ? <EditIcon /> : <AddIcon />}</>
                              )
                            }
                            disabled={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                            }
                            onClick={() =>
                              bankAccounts?.length > 0
                                ? setSelectPaymentAccountOpen(true)
                                : setIsNewPaymentAccountModalOpen(true)
                            }
                          />
                          <CustomListItem
                            primary={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? t('content.Pay From')
                                : t('content.Pay On')
                            }
                            secondary={
                              isAutoPaySetupConfirmed ||
                              (isManagePayment && isAutoPay && !rowID) ? (
                                <>{chosenAccount ? chosenAccount.accountType : t('Add Account')}</>
                              ) : (
                                formattedpayOnDate
                              )
                            }
                            tertiary={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? chosenAccount
                                  ? maskAccountNumber(chosenAccount.accountNumber)
                                  : false
                                : formattedpayOnDate
                            }
                            icon={
                              isAutoPaySetupConfirmed ||
                              (isManagePayment && isAutoPay && !rowID) ? (
                                chosenAccount ? (
                                  <EditIcon />
                                ) : (
                                  <AddIcon />
                                )
                              ) : (
                                <CalendarToday />
                              )
                            }
                            onClick={
                              isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID)
                                ? () => setSelectPaymentAccountOpen(true)
                                : () => setSelectPaymentDateOpen(true)
                            }
                            className={
                              isAutoPaySetupConfirmed || paymentID
                                ? chosenAccount
                                  ? classes.payFrom
                                  : classes.addAccount
                                : false
                            }
                          />
                          {isManagePayment && !isAutoPay && (
                            <Typography
                              className={classes.helperText}
                              color={'textSecondary'}
                              variant={'body2'}
                            >
                              {t('content.One Time Payment Edit body') + formattedpayOnDate}
                            </Typography>
                          )}
                          {paymentID &&
                            !isAutoPay &&
                            oneTimePayment &&
                            chosenAccount &&
                            oneTimePayment.length > 0 && (
                              <>
                                <PrimaryButton
                                  className={cn(classes.button)}
                                  onClick={() => setPaymentConfirm(true)}
                                  disabled={
                                    amount === oneTimePayment[0].amount &&
                                    chosenAccount.accountNumber ===
                                      oneTimePayment[0].accountNumber &&
                                    prettyDate(payOnDate) ===
                                      prettyDate(oneTimePayment[0].scheduledDate)
                                  }
                                >
                                  {t('content.Edit Payment')}
                                </PrimaryButton>
                              </>
                            )}
                          {paymentID && (
                            <DangerButton
                              className={cn(classes.buttonDisableAutoPay)}
                              onClick={() =>
                                isManagePayment && isAutoPay && !rowID
                                  ? setConfirmAutoPayDisable(true)
                                  : setConfirmPaymentCancel(true)
                              }
                            >
                              {isManagePayment && isAutoPay && !rowID
                                ? t('content.Disable AutoPay')
                                : t('content.Cancel Payment')}
                            </DangerButton>
                          )}
                        </DialogContent>
                        <Typography
                          className={classes.helperText}
                          color={'textSecondary'}
                          variant={'body2'}
                        >
                          {isAutoPaySetupConfirmed || (isManagePayment && isAutoPay && !rowID) ? (
                            t('content.Enrolled in AutoPay body')
                          ) : (
                            <>{paymentID ? '' : t('content.One Time Payment body') + '.'}</>
                          )}
                        </Typography>
                        {((chosenAccount && !paymentID) ||
                          isAutoPaySetupConfirmed ||
                          (isManagePayment && isAutoPay && !rowID)) && (
                          <Typography
                            className={classes.helperText}
                            color={'textSecondary'}
                            variant={'body2'}
                          >
                            {t(
                              'content.There is a $15 fee for any ACH debit not honored by your bank',
                            )}
                            .
                          </Typography>
                        )}
                        {chosenAccount && !isManagePayment ? (
                          <>
                            <PrimaryButton
                              onClick={handlePaymentConfirmation}
                              className={classes.scheduleButton}
                            >
                              {isAutoPaySetupConfirmed
                                ? t('content.Setup AutoPay')
                                : t('content.Schedule Payment')}
                            </PrimaryButton>
                            <Typography
                              className={classes.helperText}
                              color={'textSecondary'}
                              variant={'body1'}
                            >
                              <HttpsIcon style={{ fontSize: 13 }} />{' '}
                              {t('content.Secure Transaction')}.
                            </Typography>
                          </>
                        ) : (
                          <Box className={classes.confirmingBox}></Box>
                        )}
                      </>
                    ) : (
                      <DialogContent className={classes.dialogContent}>
                        <Typography
                          className={classes.selectAmountTitle}
                          color={'textSecondary'}
                          variant={'subtitle2'}
                        >
                          {t('content.Select your payment amount')}
                        </Typography>
                        <CustomListItem
                          primary={
                            !isBilled &&
                            (isAutoPay || isAutoPaySetupConfirmed || !isManagePayment) &&
                            (!isCurrent || dueAmount === 0) &&
                            !pastDueAmount ? (
                              t('content.Regular Payment Amount')
                            ) : (
                              <>
                                {pastDueAmount
                                  ? t('content.Past Due Amount')
                                  : t('content.Amount Due')}
                              </>
                            )
                          }
                          secondary={prettyCurrency(
                            (isAutoPay && isManagePayment) || isAutoPaySetupConfirmed
                              ? amortizedPaymentAmount
                              : isCurrent
                              ? amortizedPaymentAmount
                              : dueAmount,
                          )}
                          recommended={!isAutoPaySetupConfirmed && !isAutoPay}
                          className={pastDueAmount ? classes.pastDueText : ''}
                          onClick={() =>
                            handleAmountChosen(
                              (isAutoPay && isManagePayment) || isAutoPaySetupConfirmed
                                ? amortizedPaymentAmount
                                : isCurrent
                                ? amortizedPaymentAmount
                                : dueAmount,
                            )
                          }
                        />
                        {!isAutoPay && isBilled && (
                          <CustomListItem
                            primary={
                              pastDueAmount || !isCurrent
                                ? t('content.Past Due Amount')
                                : t('content.Regular Payment Amount')
                            }
                            secondary={
                              pastDueAmount || !isCurrent
                                ? prettyCurrency(pastDueAmount)
                                : prettyCurrency(dueAmount)
                            }
                            onClick={() => handleAmountChosen(pastDueAmount)}
                            className={pastDueAmount ? classes.pastDueText : ''}
                          />
                        )}
                        <CustomListItem
                          primary={t('content.Other Amount')}
                          value={otherAmount}
                          onChange={e => setOtherAmount(cleanAmount(e.target.value))}
                          handleAmountChosen={handleAmountChosen}
                          isAutoPay={isAutoPay}
                        />
                        <Typography className={classes.lowerText} color={'textSecondary'}>
                          {isAutoPay &&
                            t(
                              'content.Any amount paid is in addition to your originally scheduled AutoPay payment',
                            ) +
                              '. ' +
                              t(
                                'content.Amount paid will pay down your past due amount first followed by principal',
                              ) +
                              '.'}
                        </Typography>
                      </DialogContent>
                    )}
                  </Box>
                )}
              </>
            )}
          </Drawer>
        </Backdrop>
      </Slide>
      {open && <LoadingDataError open={!loanNumber && !autoPayErrorState} onClose={onClose} />}
      {open && <PreExistingPaymentScheduled open={hasOneTimePayment && !isManagePayment} />}
      {open && <CurrentlyEnrolledAutoPay open={isAutoPay && !isManagePayment} />}
      {open && pastDueAmount && (
        <CurrentlyPastDue
          open={open && Boolean(pastDueAmount) && isAutoPaySetup && !isManagePayment}
          handleAutoPaySetupFail={handleAutoPaySetupFail}
          pastDueAmount={pastDueAmount}
          handleAmountChosen={handleAmountChosen}
        />
      )}
      <AdditionalAmountPrompt
        open={confirmDrawerOpen}
        handleAmountChosen={handleAmountChosen}
        onClose={() => {
          setConfirmDrawerOpen(false);
        }}
        amount={amount}
        totalDueAmount={dueAmount}
      />
      <PayFromAccountPrompt
        open={selectPaymentAccountOpen}
        handleChosenAccount={handleChosenAccount}
        handleCreateNewAccount={handleCreateNewAccount}
        dueDate={dueDate}
        bankAccounts={bankAccounts}
      />
      <SelectPaymentDatePrompt
        open={selectPaymentDateOpen}
        onClose={setSelectPaymentDateOpen}
        dueDate={dueDate}
        setChosenDate={setPayOnDate}
      />
      <NewPaymentAccount
        bankAccounts={bankAccounts}
        setIsNewPaymentAccountModalOpen={setIsNewPaymentAccountModalOpen}
        open={isNewPaymentModalOpen}
        cifNumber={cifNumber}
        onClose={() => setIsNewPaymentAccountModalOpen(false)}
        handleChosenAccount={handleChosenAccount}
      />
      <ConfirmPaymentDetails
        open={paymentConfirm}
        onSuccess={handleSuccess}
        onClose={() => {
          setPaymentConfirm(false);
        }}
        chosenAccount={chosenAccount}
        chosenAmount={amount}
        chosenDate={
          isAutoPaySetupConfirmed || isManagePayment
            ? formattedDisplayDueDateNLS
            : formattedpayOnDate
        }
        isAutoPaySetup={isAutoPaySetupConfirmed}
        billingPeriod={billingPeriod}
        achCompanyID={achCompanyID}
        achLoanNumber={achLoanNumber}
        paymentRowID={paymentID}
      />
      {confirmAutoPayDisable && (
        <CancelAutoPayPrompt
          open={confirmAutoPayDisable}
          onClose={() => setConfirmAutoPayDisable(false)}
          onSuccess={() => {
            setConfirmAutoPayDisable(false);
            setIsAutoPaySetupConfirmed(false);
          }}
          achLoanNumber={achLoanNumber}
          autoPayRecord={autoPayRecord}
        />
      )}
      {confirmPaymentCancel && (
        <CancelPaymentPrompt
          open={confirmPaymentCancel}
          onClose={() => setConfirmPaymentCancel(false)}
          onSuccess={() => {
            setConfirmPaymentCancel(false);
            onSuccess();
          }}
          chosenAccount={chosenAccount}
          chosenAmount={amount}
          chosenDate={formattedpayOnDate}
          achLoanNumber={achLoanNumber}
          autoPayRecord={autoPayRecord}
          paymentRowID={paymentID}
        />
      )}
      <SuccessPrompt
        resetFlow={resetFlow}
        open={paymentSuccess}
        onClose={onClose}
        onSuccess={onSuccess}
        paymentAmount={amount}
        isAutoPaySetup={isAutoPaySetupConfirmed}
        remainingBalance={balanceAmount - amount}
        nextPayment={
          isAutoPaySetupConfirmed || isManagePayment
            ? formattedDisplayDueDateNLS
            : formattedpayOnDate
        }
        chosenAccount={chosenAccount}
      />
    </>
  );
};
export default SubmitPaymentModal;
