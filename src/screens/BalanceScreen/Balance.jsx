import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Link,
  Paper,
  Grid,
} from '@material-ui/core';
import cn from 'classnames';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SendIcon from '@material-ui/icons/Send';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import dateformat from 'dateformat';
import TimeAgo from 'javascript-time-ago';
import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { balanceStyle } from './style';

import { formatDollar } from '@/utils/format';
import {
  formatDateString,
  formatLongDateString,
  formatLongDateMonthString,
  frequency,
} from '@/properties';
import { queries } from '@/gql';
import { useLoanState } from '@/customHooks';
import {
  LoanGlance,
  LabelValueColumn,
  LabelValueRow,
  SecondaryButton,
  Screen,
  PaymentCurrent,
  PaymentPastDue,
  GridContainer,
  NextPaymentView,
  PastDueToolTip,
  CenteredScreenContent,
} from '@/components';
import { useGlobalStyles } from '@/themes';

const Balance = () => {
  const { t } = useTranslation();
  const styles = balanceStyle();
  const globalStyles = useGlobalStyles();
  const isUpSMScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const isDownMDScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
  const isTabletScreen = isUpSMScreen && isDownMDScreen;
  const { loanNumber } = useParams();

  const history = useHistory();

  const payOffDate = new Date();
  payOffDate.setDate(payOffDate.getDate() + 10);

  const pdate = dateformat(payOffDate, formatLongDateString);
  const formattedPayoffDate = dateformat(payOffDate, formatLongDateMonthString);

  const { data: dataPayoff, loading: loadingPayoff, error: errorPayoff } = useQuery(
    queries.payoffDetails,
    {
      variables: { loan_id: loanNumber, payoffDate: pdate },
    },
  );

  const dataPayoffDetails = dataPayoff?.Loans_GetPayoffDetails?.payload?.data;

  const payoffDetails = useMemo(() => {
    if (dataPayoff) {
      return {
        formattedPayoount: dataPayoffDetails?.Payoount,
      };
    }
  }, [dataPayoffDetails]);

  const { data, loading, error } = useQuery(queries.Balance, {
    variables: { loan_id: loanNumber },
  });

  const { isAutoPay, isBilled, isCurrent, originalLoanAmount } = useLoanState(loanNumber);

  const dataLoans = data?.Loans_Get?.payload?.data;
  const dataLoansPaymentInfo = data?.Loans_GetPaymentInfo?.payload?.data;
  const dataLoansSetup = data?.Loans_GetSetup?.payload?.data;

  const loan = useMemo(() => {
    if (dataLoans && dataLoansPaymentInfo && dataLoansSetup) {
      return {
        balanceAmount: dataLoans?.Current_Payoff_Balance,
        formattedInterestAmount: dataLoans?.Current_Interest_Balance,
        originalLoanAmount: dataLoans?.Original_Note_Amount,
        formattedRegularPrincipalAmount: dataLoans?.Current_Principal_Balance,
        fees:
          dataLoans?.Current_Fees_Balance &&
          dataLoans?.Current_Late_Charge_Balance &&
          dataLoans.Current_Fees_Balance + dataLoans.Current_Late_Charge_Balance,
        interestRate: dataLoans?.Current_Interest_Rate,
        pastDueDays: dataLoans?.Days_Past_Due,
        formattedOriginatedDate:
          dataLoans?.Open_Date && dateformat(dataLoans.Open_Date, formatDateString),
        formattedMaturityDate:
          dataLoans?.Open_Maturity_Date &&
          dateformat(dataLoans.Open_Maturity_Date, formatDateString),
        formattedRegularPaymentAmount: dataLoansPaymentInfo?.Amortized_Payment_Amount,
        term: dataLoansPaymentInfo?.Total_Payments,
        frequency: dataLoansSetup?.Principal_Period && frequency(dataLoansSetup.Principal_Period),
        paymentAmount: dataLoansPaymentInfo?.Amortized_Payment_Amount,
        paymentDate:
          dataLoansPaymentInfo?.Current_Principal_Payment_Date &&
          dataLoansPaymentInfo?.Next_Principal_Payment_Date &&
          !isBilled
            ? dateformat(dataLoansPaymentInfo.Next_Principal_Payment_Date, formatDateString)
            : dateformat(dataLoansPaymentInfo.Current_Principal_Payment_Date, formatDateString),
        nextPaymentDays:
          dataLoansPaymentInfo?.Current_Principal_Payment_Date &&
          new TimeAgo('en-US').format(
            new Date(dataLoansPaymentInfo.Current_Principal_Payment_Date),
          ),
        lastPaymentDate:
          dataLoansPaymentInfo?.Last_Payment_Date &&
          dateformat(dataLoansPaymentInfo.Last_Payment_Date, formatDateString),
        lastPaymentAmount:
          dataLoansPaymentInfo?.Last_Payment_Amount &&
          formatDollar(dataLoansPaymentInfo.Last_Payment_Amount),
        currentDueAmount: dataLoans?.Total_Current_Due_Balance,
        pastDueAmount: dataLoans?.Total_Past_Due_Balance,
      };
    }
  }, [dataLoans, dataLoansPaymentInfo, dataLoansSetup, isBilled, isCurrent, isAutoPay]);

  const formattedInterestRate = `${loan?.interestRate.toFixed(2)}%`;

  const handlePaymentSuccess = useCallback(() => {
    return (location.pathname = `/dashboard/loans/${loanNumber}`);
  }, []);

  if (loading || loadingPayoff) {
    return (
      <Screen title={t('screenNames.balance')} elevated={false}>
        <CenteredScreenContent minHeight="75vh">
          <CircularProgress color="primary" />
        </CenteredScreenContent>
      </Screen>
    );
  }

  if (!data || !dataPayoff || !loan || !payoffDetails || error || errorPayoff) {
    return (
      <Screen title={t('screenNames.balance')} elevated={false}>
        That loan could not be found
      </Screen>
    );
  }

  return (
    <Screen title={t('screenNames.balance')} elevated={false}>
      <GridContainer>
        <Grid sm={7} item className={cn(styles.grid)}>
          <Card className={cn(globalStyles.card, styles.topCard, styles.card)} elevation={2}>
            <CardContent className={styles.cardContent}>
              <Box display="flex" justifyContent="flex-start" alignItems="center">
                <AssignmentIcon className={cn(styles.icon)} />
                <Typography variant="h1" className={cn(styles.loanDetailsText)}>
                  {t('content.Loan Details')}
                </Typography>
              </Box>
            </CardContent>

            <CardContent className={cn(styles.cardContent, styles.containRowDueData)}>
              <LoanGlance background={true} elevation={0} isBalanceScreen={true} />

              <Card elevation={0} className={cn(styles.contain)}>
                <CardContent className={cn(globalStyles.cardBackground)}>
                  <Divider className={cn(styles.dividerWide)} />
                  <Box className={cn(globalStyles.row)}>
                    <Box className={cn(styles.boxSize)}>
                      <LabelValueColumn
                        label={t('content.Principal')}
                        value={formatDollar(loan.formattedRegularPrincipalAmount)}
                      />
                    </Box>
                    <Box className={cn(styles.boxSize)}>
                      <LabelValueColumn
                        label={t('content.Interest')}
                        value={formatDollar(loan.formattedInterestAmount)}
                      />
                    </Box>
                    <Box className={cn(styles.boxSize)}>
                      <LabelValueColumn label={t('content.Fees')} value={formatDollar(loan.fees)} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </CardContent>

            <Box>
              <CardContent className={cn(styles.cardOriginalInterestContent)}>
                <Box className={cn(globalStyles.row)}>
                  <Box className={cn(styles.boxLeft)}>
                    <Card
                      className={cn(globalStyles.card, globalStyles.cardBackground)}
                      elevation={0}
                    >
                      <CardContent className={cn(styles.cardContent)}>
                        <LabelValueColumn
                          label={t('content.Original Loan Amount')}
                          value={formatDollar(originalLoanAmount)}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className={cn(styles.boxPadding)} />
                  <Box className={cn(styles.boxRight)}>
                    <Card
                      className={cn(globalStyles.card, globalStyles.cardBackground)}
                      elevation={0}
                    >
                      <CardContent className={cn(styles.cardContent)}>
                        <LabelValueColumn
                          label={t('content.Interest Rate')}
                          value={formattedInterestRate}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </CardContent>
            </Box>

            <Box className={cn(styles.labelValueRowContainer)}>
              <LabelValueRow
                label={t('content.Origination Date')}
                value={loan.formattedOriginatedDate}
              />
              <Box className={cn(styles.containRow)}>
                <LabelValueRow
                  label={t('content.Maturity Date')}
                  value={loan.formattedMaturityDate}
                />
              </Box>
              <Box className={cn(styles.containRow)}>
                <LabelValueRow
                  label={t('content.Payoff Amount')}
                  value={formatDollar(payoffDetails?.formattedPayoount)}
                />
              </Box>
            </Box>

            <Box>
              <CardContent className={cn(styles.containRow, styles.payoountBody)}>
                <Typography variant="h1" className={cn(styles.pendingText, styles.payoffText)}>
                  {t('content.Payoff Amount Body', {
                    payoffDate: formattedPayoffDate,
                  })}
                  <Link
                    component="button"
                    variant="body2"
                    href="#"
                    onClick={() => history.push(`/dashboard/loans/${loanNumber}/helpCenter`)}
                  >
                    {t('content.contact us')}
                  </Link>
                  {t('content.Payoff Amount body rest')}
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <Card className={cn(globalStyles.card, styles.card)} elevation={2}>
            <Paper>
              <CardContent>
                <Box className={cn(globalStyles.row, globalStyles.assignment)}>
                  <HourglassFullIcon className={cn(styles.icon)} />
                  <Typography variant="h1" className={cn(styles.loanDetailsText)}>
                    {t('content.Due')}
                  </Typography>
                </Box>
              </CardContent>

              <CardContent className={cn(styles.cardContent)}>
                <Box className={cn(loan.pastDueDays > 0 ? globalStyles.row : styles.rowReverse)}>
                  <Box className={cn(loan.pastDueDays > 0 ? styles.boxLeft : styles.boxRight)}>
                    <CardContent
                      className={cn(
                        globalStyles.card,
                        loan.pastDueDays > 0
                          ? globalStyles.pastDueBackground
                          : globalStyles.cardBackground,
                        globalStyles.row,
                      )}
                    >
                      <LabelValueColumn
                        label={t('content.Past Due')}
                        value={formatDollar(loan.pastDueAmount)}
                        classes={{ valueStyle: loan.pastDueDays > 0 && styles.pastDue }}
                      />
                      {loan.pastDueDays > 0 && <PastDueToolTip />}
                    </CardContent>
                  </Box>
                  <Box className={cn(styles.boxPadding)} />
                  <Box className={cn(styles.boxRight)}>
                    <CardContent className={cn(globalStyles.card, globalStyles.cardBackground)}>
                      <Box className={cn(globalStyles.row)}>
                        <LabelValueColumn
                          label={t('content.Amount Due')}
                          value={formatDollar(loan.currentDueAmount)}
                        />
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
              </CardContent>
              {loan.pastDueDays > 0 && (
                <Box className={cn(styles.containRowDueData)}>
                  <CardContent>
                    <PaymentPastDue pastDueDays={loan.pastDueDays} />
                  </CardContent>
                </Box>
              )}
            </Paper>
          </Card>

          {isCurrent && (isAutoPay || (!isAutoPay && !isBilled)) && (
            <>
              <Card elevation={2} className={cn(styles.paymentCurrentCard, styles.card)}>
                <CardContent className={cn(styles.paymentCurrentContainer)}>
                  <PaymentCurrent
                    dueDate={loan.paymentDate}
                    displayAdditionalPayment={false}
                    onSchedulePayment={handlePaymentSuccess}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </Grid>
        <Grid sm={5} item className={cn(styles.grid)}>
          <Card className={cn(globalStyles.card, styles.card)} elevation={2}>
            <CardContent className={styles.paymentCardContainer}>
              <Box className={cn(globalStyles.row, styles.cardContentBox)}>
                <Box className={cn(globalStyles.due, styles.cardContentBoxEle)}>
                  <SendIcon className={cn(styles.icon)} />
                  <Typography variant="h1" className={cn(styles.paymentsText)}>
                    {t('content.Payments')}
                  </Typography>
                </Box>
                <Box className={styles.cardContentBoxEle}>
                  <SecondaryButton
                    onClick={() => {
                      history.push(`/dashboard/loans/${loanNumber}/payments`);
                    }}
                    className={styles.managePaymentButton}
                  >
                    {isTabletScreen ? t('content.Manage') : t('content.Manage payments')}
                  </SecondaryButton>
                </Box>
              </Box>
            </CardContent>

            <Box>
              <CardContent className={globalStyles.cardContent}>
                <NextPaymentView
                  loanDataNextPayment={data}
                  loan={loan}
                  elevation={15}
                  dueDate={loan.paymentDate}
                  due={loan.paymentAmount}
                  isCurrent={isCurrent}
                  isOutlined
                  isAutoPay={isAutoPay}
                  onSchedulePayment={handlePaymentSuccess}
                  onEnrollInAutoPay={handlePaymentSuccess}
                  onManagePayment={handlePaymentSuccess}
                />
              </CardContent>
            </Box>

            <Box className={cn(styles.containRow)}>
              <CardContent className={globalStyles.cardContent}>
                <Box>
                  <Card
                    className={cn(globalStyles.card, globalStyles.cardBackground)}
                    elevation={0}
                  >
                    <CardContent className={cn(globalStyles.cardContent)}>
                      <Box className={cn(globalStyles.row)}>
                        <Box>
                          <Typography variant="h5" className={cn(globalStyles.smallHeader)}>
                            {t('content.Last Payment')}
                          </Typography>
                          <Typography className={cn(styles.value)}>
                            {loan.lastPaymentAmount}
                          </Typography>
                        </Box>
                        <Box flex={1} />
                        <Box>
                          <Typography variant="h6">
                            {t('content.Received On', {
                              receivedDate: loan.lastPaymentDate,
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </CardContent>
            </Box>

            <Box className={cn(styles.containRow)}>
              <CardContent className={cn(globalStyles.cardContent)}>
                <Box className={cn(styles.containRow)}>
                  <LabelValueRow
                    label={t('content.Regular Payment Amount')}
                    value={formatDollar(loan.formattedRegularPaymentAmount)}
                  />
                </Box>
                <Box className={cn(styles.containRow)}>
                  <LabelValueRow label={t('content.Payment Frequency')} value={loan.frequency} />
                </Box>
                <Box className={cn(styles.containRow)}>
                  <LabelValueRow label={t('content.Original Loan Term')} value={loan.term} />
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </GridContainer>
    </Screen>
  );
};

export default Balance;
