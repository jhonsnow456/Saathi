import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

export default useStyles;
