import { useState, useMemo } from 'react';
import dateformat from 'dateformat';
import TimeAgo from 'javascript-time-ago';

import ScheduledPayment from './ScheduledPayment';
import EnrollInAutoPay from './EnrollInAutoPay';
import NextPaymentCard from './NextPaymentCard';
import AutoPayCard from './AutoPayCard';

import { formatDollar } from '@/utils/format';
import { formatDateString } from '@/properties';

const PaymentView = ({
  loan,
  isAutoPay,
  dueDate,
  isCurrent,
  paymentAmount,
  elevation = 15,
  isOutlined = false,
  onSchedulePayment,
  onEnrollInAutoPay,
  isBilled,
}) => {
  const [isScheduled, _setIsScheduled] = useState(false);

  const timeAgo = useMemo(() => new TimeAgo('en-US'), []);
  const formattedDueDate = useMemo(() => dateformat(dueDate, formatDateString), [dueDate]);
  const memoizedPaymentAmount = useMemo(() => formatDollar(paymentAmount), [paymentAmount]);

  return (
    <>
      {isAutoPay && (
        <AutoPayCard
          paymentDate={loan.paymentDate}
          paymentValue={loan.paymentAmount}
          nextPaymentDays={loan.nextPaymentDays}
          paymentType={'autoPay'}
          dark
        />
      )}
      {isScheduled && (
        <ScheduledPayment
          scheduledPaymentDate={formattedDueDate}
          paymentDate={formattedDueDate}
          scheduledPaymentDays={timeAgo.format(new Date(dueDate))}
        />
      )}
      {isBilled && (
        <NextPaymentCard
          nextPaymentDays={timeAgo.format(new Date(dueDate))}
          paymentAmount={memoizedPaymentAmount}
          dueDate={formattedDueDate}
          isCurrent={isCurrent}
          isOutlined={isOutlined}
          elevation={elevation}
          onSchedulePayment={onSchedulePayment}
          onEnrollInAutoPay={onEnrollInAutoPay}
        />
      )}
      {!isAutoPay && <EnrollInAutoPay onEnrollInAutoPay={onEnrollInAutoPay} />}
    </>
  );
};

export default PaymentView;
