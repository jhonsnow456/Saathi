import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      zIndex: theme.zIndex.modal,
    },
    open: {
      position: 'relative',
      minHeight: '100vh',
    },
  })
);

export default useStyles;
