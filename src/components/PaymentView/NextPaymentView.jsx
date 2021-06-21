import { useMemo } from 'react';
import dateformat from 'dateformat';
import { useParams } from 'react-router';
import TimeAgo from 'javascript-time-ago';

import { useLoanState, useOneTimePayments } from '@/customHooks';
import { formatDollar } from '@/utils/format';
import { formatDateString } from '@/properties';
import { ScheduledPayment, AutoPayCard, NextPaymentCard } from '@/components';

const NextPaymentView = ({
  loanNumberProp,
  isPaymentHistory = false,
  loanDataNextPayment,
  isLoanOverviewScreen,
  onSchedulePayment,
  onEnrollInAutoPay,
  onManagePayment,
}) => {
  const { loanNumber } = loanNumberProp ? loanNumberProp : useParams();

  const {
    isAutoPay,
    isCurrent,
    isBilled,
    hasOneTimePayment,
    oneTimePaymentRowIds,
    nextPayment,
    autoPayRecord,
    achLoanNumber,
  } = useLoanState(loanNumber);
  const { oneTimePayments } = useOneTimePayments(oneTimePaymentRowIds);

  const nextPaymentData = useMemo(() => {
    if (nextPayment.Date_Due) {
      const nextPaymentDays = new TimeAgo('en-US').format(nextPayment.Date_Due);
      const paymentAmount = formatDollar(nextPayment.Payment_Amount);
      const dueDate = dateformat(nextPayment.Date_Due, formatDateString);
      return { nextPaymentDays, paymentAmount, dueDate };
    }
  }, [nextPayment]);

  const isBetweenDays = (scheduledDate, daysNum) => {
    const timeDiff = new Date(scheduledDate) - new Date();

    return timeDiff <= daysNum * 24 * 60 * 60 * 1000 && timeDiff >= 0;
  };

  const oneTimePaymentsData = useMemo(() => {
    if (!hasOneTimePayment || oneTimePayments.error || !oneTimePayments.activePayments.length) {
      return;
    }

    const futureOneTimePayments = oneTimePayments.activePayments.filter(payment => {
      return new Date(payment.scheduledDate) - new Date() >= 1;
    });

    const activeOneTimePayments =
      futureOneTimePayments && futureOneTimePayments.length > 1
        ? futureOneTimePayments.sort(
            (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate),
          )
        : futureOneTimePayments;

    const pendingPayments =
      activeOneTimePayments &&
      activeOneTimePayments.length >= 1 &&
      activeOneTimePayments.filter(payment => {
        return isBetweenDays(payment.scheduledDate, 2);
      });

    const isOneTimePaymentPending =
      activeOneTimePayments &&
      activeOneTimePayments.length >= 1 &&
      isBetweenDays(activeOneTimePayments[0].scheduledDate, 2);

    const activePendingPayments =
      pendingPayments &&
      pendingPayments.length > 0 &&
      pendingPayments.map(payment => {
        return {
          scheduledPaymentDays: new TimeAgo('en-US').format(
            new Date(payment.scheduledDate).getTime() +
              new Date(payment.scheduledDate).getTimezoneOffset() * 60000 * 4,
          ),
          scheduledDate: dateformat(new Date(payment.scheduledDate), formatDateString),
          amount: payment.amount,
          accountNumber: payment.accountNumber,
          isViewOnly: isBetweenDays(payment.scheduledDate, 2),
          paymentRowId: payment.rowId,
        };
      });
    const activePaymentsNum = activeOneTimePayments.length ?? 0;
    const pendingPaymentsNum = activePendingPayments.length ?? 0;

    const pending = isOneTimePaymentPending
      ? {
          scheduledPaymentDays: new TimeAgo('en-US').format(
            new Date(activeOneTimePayments[0].scheduledDate).getTime() +
              new Date(activeOneTimePayments[0].scheduledDate).getTimezoneOffset() * 60000 * 4,
          ),
          scheduledDate: dateformat(
            new Date(activeOneTimePayments[0].scheduledDate),
            formatDateString,
          ),
          amount: activeOneTimePayments[0].amount,
          accountNumber: activeOneTimePayments[0].accountNumber,
          isViewOnly: true,
          paymentRowId: activeOneTimePayments[0].rowId,
        }
      : {};

    let scheduled;
    if (
      activeOneTimePayments &&
      activeOneTimePayments.length >= 1 &&
      activePaymentsNum - pendingPaymentsNum >= 1
    ) {
      scheduled = {
        scheduledPaymentDays: new TimeAgo('en-US').format(
          new Date(activeOneTimePayments[pendingPaymentsNum].scheduledDate).getTime() +
            new Date(activeOneTimePayments[pendingPaymentsNum].scheduledDate).getTimezoneOffset() *
              60000 *
              4,
        ),
        scheduledDate: dateformat(
          new Date(activeOneTimePayments[pendingPaymentsNum].scheduledDate),
          formatDateString,
        ),
        amount: activeOneTimePayments[pendingPaymentsNum].amount,
        accountNumber: activeOneTimePayments[pendingPaymentsNum].accountNumber,
        isViewOnly: isBetweenDays(activeOneTimePayments[pendingPaymentsNum].scheduledDate, 2),
        paymentRowId: activeOneTimePayments[pendingPaymentsNum].rowId,
      };
    }
    const otherOneTimePaymentsNum =
      activeOneTimePayments.length - (pendingPaymentsNum > 0 ? pendingPaymentsNum + 1 : 1);

    const otherOneTimePayments =
      otherOneTimePaymentsNum >= 1 &&
      activeOneTimePayments &&
      activeOneTimePayments.length > 1 &&
      activeOneTimePayments.slice(-otherOneTimePaymentsNum).map(payment => {
        return {
          scheduledPaymentDays: new TimeAgo('en-US').format(
            new Date(payment.scheduledDate).getTime() +
              new Date(payment.scheduledDate).getTimezoneOffset() * 60000 * 4,
          ),
          scheduledDate: dateformat(new Date(payment.scheduledDate), formatDateString),
          amount: payment.amount,
          accountNumber: payment.accountNumber,
          isViewOnly: isBetweenDays(payment.scheduledDate, 2),
          paymentRowId: payment.rowId,
        };
      });

    return {
      isOneTimePaymentPending,
      otherOneTimePaymentsNum,
      otherOneTimePayments,
      pending,
      scheduled,
      activePendingPayments,
    };
  }, [hasOneTimePayment, oneTimePayments]);

  const autoPayData = useMemo(() => {
    if (!loanDataNextPayment || !isAutoPay) {
      return;
    }
    let paymentDate;
    if (!isBilled) {
      paymentDate =
        loanDataNextPayment.Loans_GetPaymentInfo.payload.data.Next_Principal_Payment_Date;
    } else {
      paymentDate =
        loanDataNextPayment.Loans_GetPaymentInfo.payload.data.Current_Principal_Payment_Date;
    }
    return {
      paymentAmount: loanDataNextPayment.Loans_GetPaymentInfo.payload.data.Amortized_Payment_Amount,
      paymentDate: dateformat(new Date(paymentDate), formatDateString),
      nextPaymentDays: new TimeAgo('en-US').format(new Date(paymentDate)),
    };
  }, [loanDataNextPayment, isBilled, isCurrent, isAutoPay]);

  return (
    <>
      {isAutoPay && autoPayData && (
        <AutoPayCard
          paymentType="autoPay"
          paymentDate={autoPayData.paymentDate}
          paymentValue={autoPayData.paymentAmount}
          nextPaymentDays={autoPayData.nextPaymentDays}
          dark
          autoPayRecord={autoPayRecord}
        />
      )}
      {oneTimePaymentsData &&
        oneTimePaymentsData?.activePendingPayments &&
        oneTimePaymentsData?.activePendingPayments.length > 0 &&
        oneTimePaymentsData?.activePendingPayments.map((pendingPayment, index) => (
          <ScheduledPayment
            key={index}
            scheduledPaymentDate={pendingPayment.scheduledDate}
            paymentAmount={pendingPayment.amount}
            scheduledPaymentDays={pendingPayment.scheduledPaymentDays}
            isPending
            isViewOnly={pendingPayment.isViewOnly}
            isPaymentHistory={isPaymentHistory}
            accountNumber={pendingPayment.accountNumber}
            paymentRowId={pendingPayment.paymentRowId}
            achLoanNumber={achLoanNumber}
            onManagePayment={onManagePayment}
          />
        ))}
      {oneTimePaymentsData && oneTimePaymentsData?.scheduled && (
        <ScheduledPayment
          scheduledPaymentDays={oneTimePaymentsData.scheduled.scheduledPaymentDays}
          scheduledPaymentDate={oneTimePaymentsData.scheduled.scheduledDate}
          paymentAmount={oneTimePaymentsData.scheduled.amount}
          otherOneTimePaymentsNum={oneTimePaymentsData.otherOneTimePaymentsNum}
          isViewOnly={oneTimePaymentsData.scheduled.isViewOnly}
          isPaymentHistory={isPaymentHistory}
          accountNumber={oneTimePaymentsData.scheduled.accountNumber}
          paymentRowId={oneTimePaymentsData.scheduled.paymentRowId}
          achLoanNumber={achLoanNumber}
          onManagePayment={onManagePayment}
        />
      )}
      {oneTimePaymentsData &&
        oneTimePaymentsData?.otherOneTimePayments.length >= 1 &&
        isPaymentHistory &&
        oneTimePaymentsData?.otherOneTimePaymentsNum >= 1 &&
        oneTimePaymentsData.otherOneTimePayments.map((otherOneTimePayment, index) => (
          <ScheduledPayment
            key={index}
            scheduledPaymentDays={otherOneTimePayment.scheduledPaymentDays}
            scheduledPaymentDate={otherOneTimePayment.scheduledDate}
            paymentAmount={otherOneTimePayment.amount}
            isViewOnly={otherOneTimePayment.isViewOnly}
            isPaymentHistory={isPaymentHistory}
            accountNumber={otherOneTimePayment.accountNumber}
            paymentRowId={otherOneTimePayment.paymentRowId}
            achLoanNumber={achLoanNumber}
            onManagePayment={onManagePayment}
          />
        ))}
      {((!isAutoPay && !hasOneTimePayment) || !isCurrent) && isBilled && (
        <NextPaymentCard
          nextPaymentDays={nextPaymentData.nextPaymentDays}
          paymentAmount={nextPaymentData.paymentAmount}
          dueDate={nextPaymentData.dueDate}
          isCurrent={isCurrent}
          isOutlined
          isAutoPay={isAutoPay}
          isLoanOverviewScreen={isLoanOverviewScreen}
          onSchedulePayment={onSchedulePayment}
          onEnrollInAutoPay={onEnrollInAutoPay}
        />
      )}
    </>
  );
};

export default NextPaymentView;
