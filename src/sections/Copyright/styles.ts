import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    copyright: {
      userSelect: 'none',
    },
  })
);

export default useStyles;
