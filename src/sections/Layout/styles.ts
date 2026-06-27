import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    spacer: theme.mixins.toolbar,
    wrapper: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
    },
    content: {
      width: '100%',
      height: `calc(100% - ${theme.mixins.toolbar as unknown as number + theme.spacing(1)}px)`,
    },
  })
);

export default useStyles;
