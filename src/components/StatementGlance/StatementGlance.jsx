import { Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import dateformat from 'dateformat';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import useGlobalStyles from '@/themes/useGlobalStyles';
import { formatDateString, formatDateMonthYearString, formatMonthYearString } from '@/properties';
import { LabelValueColumn, PrimaryButton, SecondaryButton } from '@/components';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '14px',
    alignItems: 'center',
    marginBottom: '0px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
  boxLeft: {
    justifyContent: 'flex-start',
    paddingRight: theme.spacing(1),
    flex: 1,
  },
  boxRight: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    '&:last-child': {
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(0),
      },
      paddingBottom: theme.spacing(2),
    },
  },
  contentLeft: {
    flex: 2,
    '@media (max-width: 768px)': {
      flex: 3,
    },
  },
  contentRight: {
    flex: 10,
    '@media (max-width: 768px)': {
      flex: 9,
    },
  },
  cardContent: {
    padding: '8px 12px 8px 12px',
    '&:last-child': {
      paddingBottom: '0px',
    },
  },
  viewLeft: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(1),
  },
  viewRight: {
    justifyContent: 'flex-end',
  },
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  valueLeft: {
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    width: 'max-content',
    '@media (max-width: 425px)': {
      width: 'fit-content',
    },
  },
  button: {
    maxWidth: '68px',
    maxHeight: '40px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      maxWidth: '100%',
    },
  },
  labelValueColumnDense: {
    marginBottom: theme.spacing(1),
  },
  labelValueRowDense: {
    paddingTop: theme.spacing(2),
  },
  viewButton: {
    paddingTop: '16px',
  },
  formattedStatementDate: {
    paddingLeft: theme.spacing(1),
    width: 'max-content',
    '@media (max-width: 425px)': {
      width: 'fit-content',
    },
  },
  labelStyle: {
    width: 'max-content',
    '@media (max-width: 425px)': {
      width: 'fit-content',
    },
  },
  mainBox: {
    flex: 10,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(0),
    },
  },
  dateIssued: {
    marginTop: '0px',
  },
  statementidBox: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  viewBoxButton: {
    maxHeight: '40px',
  },
  headerBox: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
  cardBackground: {
    backgroundColor: theme.palette.common.grey[100],
  },
  innerPadding: {
    '@media (max-width: 425px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  cardBox: {
    marginBottom: '0px',
  },
}));

const StatementGlance = ({
  isViewStatementEnabled = true,
  isViewEnabled = false,
  onViewStatement,
  variant = null,
  dense = false,
  statementDate,
  statementDueDate,
  remainingBalance,
  statementId,
  elevation = 0,
  innerPadding = false,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  const formattedStatementDate = dateformat(statementDate, formatDateString);
  const formattedPaidDate = dateformat(statementDueDate, formatDateMonthYearString);
  const formattedStatementMonth = dateformat(statementDate, formatMonthYearString);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box data-testid="StatementGlance">
      <Card
        elevation={elevation}
        className={cn(styles.card, !fullScreen && globalStyles.row)}
        variant={variant}
      >
        <CardContent
          className={cn(
            styles.content,
            styles.contentLeft,
            dense && styles.viewButton,
            innerPadding && styles.innerPadding,
          )}
        >
          <Box className={cn(globalStyles.row, styles.headerBox)}>
            <Box className={cn(styles.viewLeft)}>
              <Box className={cn(globalStyles.due)}>
                <InsertDriveFileIcon className={cn(globalStyles.fileIcon)} />
                <Typography variant="body1" className={cn(styles.formattedStatementDate)}>
                  {formattedStatementDate}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" className={cn(styles.dateIssued)}>
                  {fullScreen
                    ? `${t('content.Statement')} #${statementId}`
                    : t('content.Date Issued')}
                </Typography>
              </Box>
            </Box>

            {fullScreen && isViewEnabled && (
              <Box className={cn(styles.viewRight)}>
                <SecondaryButton
                  size="medium"
                  variant="outlined"
                  onClick={onViewStatement}
                  className={styles.viewBoxButton}
                >
                  {t('content.View')}
                </SecondaryButton>
              </Box>
            )}
          </Box>
        </CardContent>
        <CardContent
          className={cn(
            innerPadding && styles.innerPadding,
            styles.content,
            styles.contentRight,
            !fullScreen && globalStyles.row,
            dense && styles.labelValueRowDense,
          )}
        >
          <Box className={cn(globalStyles.row, styles.mainBox)}>
            <Box className={cn(styles.boxLeft)}>
              <Card
                className={cn(
                  globalStyles.card,
                  fullScreen && styles.cardBackground,
                  dense && styles.labelValueColumnDense,
                  styles.cardBox,
                )}
                elevation={0}
              >
                <CardContent className={cn(styles.cardContent)}>
                  <LabelValueColumn
                    label={t('content.Date Due')}
                    value={formattedPaidDate}
                    classes={{
                      containerStyle: styles.container,
                      valueStyle: styles.valueLeft,
                      labelStyle: styles.labelStyle,
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
            <Box className={cn(styles.boxRight)}>
              <Card
                className={cn(
                  globalStyles.card,
                  fullScreen && styles.cardBackground,
                  dense && styles.labelValueColumnDense,
                  styles.cardBox,
                )}
                elevation={0}
              >
                <CardContent className={cn(styles.cardContent)}>
                  <LabelValueColumn
                    label={t('content.Remaining Balance')}
                    value={remainingBalance}
                    classes={{
                      containerStyle: styles.container,
                      valueStyle: styles.valueLeft,
                      labelStyle: styles.labelStyle,
                    }}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box className={cn(styles.boxRight, styles.statementidBox)}>
              <Card
                className={cn(
                  globalStyles.card,
                  dense && styles.labelValueColumnDense,
                  styles.cardBox,
                )}
                elevation={0}
              >
                <CardContent className={cn(styles.cardContent)}>
                  <LabelValueColumn
                    label={t('content.Statement No')}
                    value={`#${statementId}`}
                    classes={{
                      containerStyle: styles.container,
                      valueStyle: styles.valueLeft,
                      labelStyle: styles.labelStyle,
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
          {isViewStatementEnabled && (
            <PrimaryButton className={cn(styles.button)} onClick={onViewStatement}>
              {fullScreen
                ? `${t('content.View Statements')} - ${formattedStatementMonth}`
                : t('content.View')}
            </PrimaryButton>
          )}

          {!fullScreen && isViewEnabled && (
            <Box className={cn(styles.viewRight)}>
              <SecondaryButton
                size="medium"
                variant="outlined"
                className={styles.viewBoxButton}
                onClick={onViewStatement}
              >
                {t('content.View')}
              </SecondaryButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatementGlance;
