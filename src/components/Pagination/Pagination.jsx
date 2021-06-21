import { makeStyles } from '@material-ui/core';
import { PaginationItem } from '@material-ui/lab';
import { usePagination } from '@material-ui/lab/Pagination';

import PagePaginationItem from './PagePaginationItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  ul: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
  },
  previousNext: {
    backgroundColor: 'rgba(37, 68, 143, 0.08)',
    color: theme.palette.info.main,
  },
}));

const Pagination = ({ count = 10, page, onChange }) => {
  const { items } = usePagination({
    count,
    page,
    onChange,
  });
  const styles = useStyles();
  const previous = items.find(item => item.type === 'previous');
  const next = items.find(item => item.type === 'next');

  return (
    <div data-testid="Pagination" className={styles.root}>
      <PaginationItem shape="rounded" {...previous} className={styles.previousNext} />
      <ul className={styles.ul}>
        {items
          .filter(item => item.type !== 'previous' && item.type !== 'next')
          .map((item, index) => (
            <PagePaginationItem key={index} item={item} />
          ))}
      </ul>
      <PaginationItem shape="rounded" {...next} className={styles.previousNext} />
    </div>
  );
};

export default Pagination;
