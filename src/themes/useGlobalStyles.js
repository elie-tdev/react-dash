import { makeStyles } from '@material-ui/core';

import { gradient } from './utils';

export default makeStyles(theme => ({
  importantText: {
    color: theme.palette.primary.main,
  },
  errorText: {
    color: theme.palette.error.main,
  },
  cardBorder: {
    borderRadius: '8px',
  },
  card: {
    borderRadius: '12px',
    marginBottom: theme.spacing(2),
    '@media (max-width: 320px)': {
      marginBottom: theme.spacing(1),
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingTop: '0px',
  },
  caption: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '20px',
    color: theme.palette.text.hint,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  rowCentered: {
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    fontSize: '14px',
    margin: '0 6px',
  },
  titleIcon: {
    fontSize: '16px',
    margin: '0 6px',
  },
  smallHeader: {
    marginBottom: theme.spacing(3),
  },
  divider: {
    margin: '20px 0',
  },
  dividerWide: {
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
  },
  due: {
    fontWeight: 600,
    display: 'flex',
    color: theme.palette.primary.main,
    alignItems: 'center',
  },
  assignment: {
    fontWeight: 600,
    display: 'flex',
    color: theme.palette.text.label,
    alignItems: 'center',
  },
  assignmentIcon: {
    height: '32px',
    width: '32px',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: theme.palette.common.icon,
  },
  cardBackground: {
    backgroundColor: theme.palette.common.grey[50],
  },
  screenPaddingOff: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  screenPaddingOn: {
    padding: '16px',
  },
  box: {
    paddingRight: '16px',
  },
  hourglassIcon: {
    height: '32px',
    width: '32px',
    padding: '8px',
    borderRadius: '50%',
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.error.main,
    }),
  },
  calendarIcon: {
    fontSize: '14px',
    marginRight: '16px',
    marginBottom: '16px',
  },
  fileIcon: {
    height: '26px',
    width: '26px',
    padding: '4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.common.icon,
  },
  pastDueBackground: {
    background: gradient({
      colors: theme.palette.common.gradient.highlight,
      background: theme.palette.error.main,
    }),
  },
  redText: {
    color: theme.palette.error.main,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  modalPaper: {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderTop: '0px solid rgba(0, 0, 0, 0)',
    [theme.breakpoints.up('md')]: {
      float: 'right',
      left: 'initial',
      maxWidth: '480px',
      width: '100%',
    },
  },
}));
