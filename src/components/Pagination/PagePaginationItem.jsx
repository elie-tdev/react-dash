import { makeStyles } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { PaginationItem } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  li: {
    display: 'flex',
    alignItems: 'center',
  },
  page: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    alignSelf: 'center',
    '&.Mui-selected': {
      color: theme.palette.info.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  moreContainer: {
    width: '38px',
    display: 'flex',
    justifyContent: 'center',
  },
  moreIconContainer: {
    height: '16px',
    width: '24px',
    backgroundColor: theme.palette.common.grey[100],
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    width: '10px',
    color: theme.palette.text.secondary,
  },
}));

const PagePaginationitem = ({ item }) => {
  const styles = useStyles();

  let children = null;
  if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
    children = (
      <div className={styles.moreContainer}>
        <div className={styles.moreIconContainer}>
          <MoreHoriz className={styles.moreIcon} />
        </div>
      </div>
    );
  } else if (item.type === 'page') {
    children = (
      <PaginationItem
        shape="rounded"
        {...item}
        classes={{
          page: styles.page,
        }}
      />
    );
  }

  return (
    <li data-testid="PaginationItem" className={styles.li}>
      {children}
    </li>
  );
};

export default PagePaginationitem;
