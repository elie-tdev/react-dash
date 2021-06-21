import { makeStyles } from '@material-ui/core';

export const balanceStyle = makeStyles(theme => ({
  loanDetailsText: {
    margin: '2px 0px',
    paddingLeft: '8px',
    fontWeight: 500,
    color: theme.palette.text.label,
  },
  paymentsText: {
    margin: '2px 0px',
    paddingLeft: '8px',
    fontWeight: 500,
    width: 'max-content',
    color: theme.palette.text.primary,
  },
  card: {
    '@media (max-width: 425px)': {
      boxShadow: 'none',
    },
  },
  topCard: {
    '@media (max-width: 425px)': {
      borderTopRightRadius: theme.spacing(1),
      borderTopLeftRadius: theme.spacing(1),
    },
  },
  paymentCardContainer: {
    padding: '24px 24px 0 24px',
  },
  cardContentBox: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing(-3),
  },
  cardContentBoxEle: {
    marginTop: theme.spacing(3),
    flex: 1,
    minWidth: 'max-content',
  },
  container: {
    flex: 1,
    marginRight: '13px',
  },
  contain: {
    marginTop: '-48px',
  },
  containRow: {
    marginTop: '-32px',
  },
  labelValueRowContainer: {
    marginTop: '-32px',
    marginLeft: '-8px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  containRowDueData: {
    marginTop: '-16px',
  },
  containRowDue: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  containRowData: {
    marginTop: '-72px',
  },
  dividerWide: {
    margin: '16px 8px',
  },
  boxSize: {
    marginLeft: '8px',
    flex: 1,
  },
  boxPadding: {
    paddingRight: '8px',
  },
  boxLeft: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  boxRight: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttonFancy: {
    alignItems: 'center',
    padding: '12px 30px',
    width: '100%',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  value: {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  paper: {
    marginTop: '16px',
  },
  containerMargin: {
    margin: '16px',
  },
  pastDue: {
    color: theme.palette.error.main,
  },
  dueButton: {
    background: theme.palette.error.main,
    color: theme.palette.text.secondary,
    marginTop: '16px',
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
  pendingText: {
    color: theme.palette.text.hint,
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '20px',
    paddingBottom: '16px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  infoTitle: {
    marginBottom: '8px',
  },
  darkText: {
    color: theme.palette.text.label,
  },
  payoffText: {
    marginTop: '-48px',
    display: 'inline',
  },
  icon: {
    fontSize: '16px',
    marginRight: '4px',
    height: '32px',
    width: '32px',
    padding: '6px',
    borderRadius: '40px',
    backgroundColor: theme.palette.primary.lightGrey,
    color: theme.palette.secondary.main,
  },
  iconErrorLightBg: {
    backgroundColor: theme.palette.error.lightBackground,
  },
  divider: {
    height: '4px',
  },
  infoIcon: {
    color: theme.palette.action.selected,
    height: '16px',
    width: '16px',
  },
  paymentCurrentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  rowReverse: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  grid: {
    width: '100%',
  },
  paymentCurrentBox: {
    margin: '4px 24px 0',
  },
  managePaymentButton: {
    height: '40px',
  },
  cardOriginalInterestContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px 0 24px',
    marginTop: '-12px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  payoountBody: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  paymentCurrentCard: {
    borderRadius: '12px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: '-8px',
    },
  },
}));
