import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      width: 250,
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default useStyles;
