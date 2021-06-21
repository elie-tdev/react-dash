import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  FormControl,
  Select,
  Box,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { formatDollar } from '@/utils/format';
import { Pagination } from '@/components';
import { StatementGlance, StatementDrawer } from '@/components';

const ROWS_PER_PAGE = 5;
const ORDER_BY = 'Statement_Date';

const useToolbarStyles = makeStyles(theme => ({
  toolbar: {
    alignItems: 'baseline',
    width: '100%',
    padding: '8px 0 24px 0',
    justifyContent: 'space-between',
    '@media (max-width: 425px)': {
      display: 'block',
      paddingTop: '24px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  text: {
    color: theme.palette.text.primary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.common.grey[200],
    background: theme.palette.common.white,
    '@media (max-width: 425px)': {
      width: '100%',
      margin: '16px 0 0 0',
    },
  },
}));

function StatementTableAppBar({ handleChange, options = [] }) {
  const classes = useToolbarStyles();
  const { t } = useTranslation();

  return (
    <Toolbar className={cn(classes.toolbar)}>
      <Box>
        <Typography variant="h1" className={cn(classes.title, classes.text)}>
          {t('content.Statement History')}
        </Typography>
      </Box>
      <FormControl variant="outlined" margin="dense" className={cn(classes.formControl)}>
        <Select native onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function statementYears(statements) {
  const years = Array.from(
    new Set(statements.map(st => new Date(Date.parse(st.Statement_Date)).getFullYear())),
  );
  return years.sort(function (a, b) {
    return b - a;
  });
}

function filterStatements(statements, filterYear) {
  return statements.filter(st => {
    const statementYear = new Date(Date.parse(st.Statement_Date)).getFullYear();
    return statementYear == filterYear;
  });
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    background: 'none',
  },
  table: {
    marginRight: '12px',
  },
  tableContainer: {
    background: theme.palette.common.white,
    boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 1px 5px rgba(0, 0, 0, 0.04)`,
    borderRadius: '12px',
    '@media (max-width: 425px)': {
      boxShadow: 'none',
    },
  },
  tableRow: {
    padding: '4px',
    borderBottom: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  emptyRows: { height: 0 },
  pagination: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(-2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
    },
  },
}));

export default function StatementTable({ allStatements }) {
  const [page, setPage] = useState(1);
  const [, setFilterYear] = useState(0);
  const [years, setYears] = useState([]);
  const [statementsInYear, setStatementsInYear] = useState([]);

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const anchor = fullScreen ? 'bottom' : 'right';

  useEffect(() => {
    const orderedYears = statementYears(allStatements);
    const initialFilterYear = orderedYears[0];
    setYears(orderedYears);
    setFilterYear(initialFilterYear);
    setStatementsInYear(filterStatements(allStatements, initialFilterYear));
  }, [allStatements]);

  const rows = useMemo(() => {
    return stableSort(statementsInYear, (a, b) => descendingComparator(a, b, ORDER_BY)).slice(
      (page - 1) * ROWS_PER_PAGE,
      page * ROWS_PER_PAGE,
    );
  }, [statementsInYear, page]);

  const emptyRows = useMemo(
    () =>
      ROWS_PER_PAGE - Math.min(ROWS_PER_PAGE, statementsInYear.length - (page - 1) * ROWS_PER_PAGE),
    [statementsInYear, page],
  );

  const classes = useStyles({ emptyRows });

  const handleFilterYearUpdate = event => {
    setFilterYear(event.target.value);
    setPage(1);
    setStatementsInYear(filterStatements(allStatements, event.target.value));
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const [selectedStatementIndex, setSelectedStatementIndex] = useState();

  const toggleDrawer = (anchor, open, index) => () => {
    setSelectedStatementIndex(index);
    setState({ ...state, [anchor]: open });
  };

  return (
    <Paper data-testid="StatementTableView" elevation={0} className={classes.paper}>
      <StatementTableAppBar options={years} handleChange={handleFilterYearUpdate} />
      <TableContainer className={cn(classes.tableContainer)}>
        <Table
          data-testid="StatementTable"
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.Statement_Row_Id}>
                <TableCell className={cn(classes.tableRow)}>
                  <StatementGlance
                    isViewStatementEnabled={false}
                    isViewEnabled={true}
                    dense={true}
                    statementDate={row.Statement_Date}
                    statementDueDate={row.Statement_Due_Date}
                    remainingBalance={formatDollar(row.Current_Payoff_Balance)}
                    datePaid={row.Statement_Date}
                    statementId={row.Statement_Row_Id}
                    innerPadding
                    onViewStatement={toggleDrawer(anchor, true, i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={classes.pagination}>
          <Pagination
            count={Math.ceil(statementsInYear.length / ROWS_PER_PAGE)}
            onChange={handleChangePage}
            page={page}
          />
        </Box>
      </TableContainer>
      <StatementDrawer
        anchor={anchor}
        open={state[anchor]}
        toggleDrawer={toggleDrawer(anchor, false)}
        statement={rows[selectedStatementIndex] || {}}
      />
    </Paper>
  );
}
