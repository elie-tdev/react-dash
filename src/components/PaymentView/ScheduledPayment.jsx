import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Link,
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useTranslation } from 'react-i18next';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory, useParams } from 'react-router';

import PaymentInfo from './PaymentInfo';

import useGlobalStyles from '@/themes/useGlobalStyles';
import {
  LabelValueColumn,
  SecondaryButton,
  PaymentHistoryModal,
  SubmitPaymentModal,
} from '@/components';
import { formatDollar } from '@/utils/format';
import { useAuthUser } from '@/customHooks';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: '2px',
    '&:last-child': {
      paddingBottom: '12px',
    },
  },
  headerContent: {
    marginTop: '8px',
    marginLeft: '8px',
    marginRight: '8px',
  },
  headerRow: {
    padding: '16px',
    backgroundColor: theme.palette.common.grey[100],
    alignItems: 'center',
    borderRadius: '8px',
  },
  iconLabel: {
    display: 'flex',
    flex: 1,
    color: theme.palette.success.main,
    alignItems: 'center',
  },
  icon: {
    fontSize: '14px',
    marginRight: '8px',
    color: props => (props.isPending ? theme.palette.text.secondary : theme.palette.success.main),
  },
  iconText: {
    marginLeft: '0',
  },
  text: {
    color: theme.palette.text.primary,
  },
  sentText: {
    color: props => (props.isPending ? theme.palette.text.secondary : theme.palette.success.main),
    marginRight: '8px',
  },
  paymentCardContent: {
    padding: '16px 24px 0px 24px',
  },
  paymentInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px',
  },
  paymentRow: {
    marginTop: '0px',
  },
  managePaymentButton: {
    marginTop: '16px',
    backgroundColor: 'rgba(50, 70, 100, 0.1)',
    height: '48px',
  },
  managePaymentTextColor: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  dividerColor: {
    backgroundColor: 'rgba(159, 168, 198, 0.5)',
  },
  otherPaymentsRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8px',
  },
  chevronRightIcon: {
    fontSize: '18px',
    cursor: 'pointer',
  },
  dividerPadding: {
    marginBottom: '12px',
  },
  managePayment: {
    marginBottom: '8px',
    marginTop: '16px',
  },
  paymentText: {
    color: theme.palette.text.secondary,
  },
  pendingTextContainer: {
    marginTop: '8px',
  },
}));

const ScheduledPayment = ({
  scheduledPaymentDays,
  scheduledPaymentDate,
  paymentAmount,
  isPending,
  otherOneTimePaymentsNum = 0,
  isViewOnly,
  isPaymentHistory,
  accountNumber,
  paymentRowId,
  onManagePayment,
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles({ isPending });
  const { t } = useTranslation();

  const history = useHistory();
  const { loanNumber } = useParams();
  const { contactId } = useAuthUser();

  const [isModalOpen, setIsModalOpen] = useState();
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false);

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const closePaymentHistoryModal = useCallback(() => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  const handlePayment = useCallback(() => {
    if (isViewOnly && isPending) {
      //View Details button text will show up and PaymentHistory Modal will show up
      setIsModalOpen(true);
    } else {
      // Manage Payment button text will show up and Edit Payment Prompt will show up
      setIsEditPaymentOpen(true);
    }
  }, [isViewOnly, isPending, isEditPaymentOpen]);

  const handleSuccess = useCallback(() => {
    setIsEditPaymentOpen(false);
    onManagePayment();
  }, []);

  scheduledPaymentDays = scheduledPaymentDays.includes('hours') ? 'in 1 day' : scheduledPaymentDays;

  return (
    <Card data-testid="ScheduledPayment" className={cn(globalStyles.card)} elevation={1}>
      <CardContent className={cn(globalStyles.cardContent, styles.cardContent)}>
        <Box className={cn(globalStyles.row, styles.headerRow, styles.headerContent)}>
          <Box className={cn(styles.iconLabel)}>
            {isPending ? (
              <>
                <AccessTimeIcon className={cn(globalStyles.icon, styles.icon)} />
                <Typography variant="h5" noWrap className={cn(styles.text)}>
                  {t('content.Pending Payment')}
                </Typography>
              </>
            ) : (
              <>
                <CheckCircleOutlineIcon className={cn(globalStyles.icon, styles.icon)} />
                <Typography variant="h5" noWrap className={cn(styles.text)}>
                  {t('content.Scheduled Payment')}
                </Typography>
              </>
            )}
          </Box>
          <Box>
            <Typography variant="h5" noWrap className={cn(styles.sentText)}>
              {t('content.Scheduled Payment Sent', {
                days: scheduledPaymentDays,
              })}
            </Typography>
          </Box>
        </Box>
        <Box className={cn(globalStyles.column, styles.paymentCardContent)}>
          <Box className={cn(globalStyles.row, styles.paymentRow)}>
            <LabelValueColumn
              highlight
              label={t('content.Payment Amount')}
              value={formatDollar(paymentAmount)}
            />
            <LabelValueColumn label={t('content.Payment Date')} value={scheduledPaymentDate} />
          </Box>
          <Divider
            className={cn(globalStyles.divider, globalStyles.dividerWide, styles.dividerColor)}
          />
          {isPending ? (
            <>
              <Box className={cn(styles.iconLabel)}>
                <CheckCircleOutlineIcon
                  className={cn(globalStyles.icon, styles.icon, styles.iconText)}
                />
                <Typography variant="h5" noWrap className={cn(styles.text)}>
                  {t('content.Scheduled Payment')}
                </Typography>
              </Box>
              <Box className={cn(styles.pendingTextContainer)}>
                <Typography className={cn(styles.paymentText)} variant="body2" display="inline">
                  {t('content.Next Payment Pending Body')}
                </Typography>
              </Box>
            </>
          ) : (
            <PaymentInfo paymentAmount={paymentAmount} paymentDate={scheduledPaymentDate} />
          )}

          <Box className={cn(styles.managePayment)}>
            <SecondaryButton onClick={handlePayment}>
              {isViewOnly && isPending ? t('content.View Details') : t('content.Manage Payment')}
            </SecondaryButton>
          </Box>
          {!isPending && otherOneTimePaymentsNum > 0 && !isPaymentHistory && (
            <>
              <Divider
                className={cn(
                  globalStyles.divider,
                  globalStyles.dividerWide,
                  styles.dividerPadding,
                )}
              />
              <Box
                className={cn(
                  globalStyles.row,
                  globalStyles.importantText,
                  styles.otherPaymentsRow,
                )}
              >
                <Link
                  className={cn(styles.managePaymentTextColor)}
                  variant="h5"
                  onClick={() => {
                    history.push(`/dashboard/loans/${loanNumber}/payments`);
                  }}
                >
                  {t('content.other payments scheduled', {
                    num: otherOneTimePaymentsNum,
                  })}
                  <ChevronRightIcon className={cn(styles.chevronRightIcon)} />
                </Link>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
      <PaymentHistoryModal
        open={isModalOpen}
        onClose={closePaymentHistoryModal}
        payment={{
          paymentAmount: paymentAmount,
          accountNumber: accountNumber,
          paidDate: scheduledPaymentDate,
          status: 'Pending',
        }}
        isFullScreen={isFullScreen}
      />
      <SubmitPaymentModal
        open={isEditPaymentOpen}
        isManagePayment={true}
        rowID={paymentRowId}
        onClose={() => {
          setIsEditPaymentOpen(false);
        }}
        onSuccess={() => {
          handleSuccess();
        }}
      />
    </Card>
  );
};

export default ScheduledPayment;
