import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

export default useStyles;
