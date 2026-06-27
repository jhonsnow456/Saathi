import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    giphy: {
      minWidth: 768,
      minHeight: 324,
      width: '100%',
    },
    message: {
      marginTop: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

export default useStyles;
