import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    horizontal: {
      margin: `${theme.spacing(1)}px 0`,
    },
    vertical: {
      margin: `0 ${theme.spacing(1)}px`,
    },
  })
);

export default useStyles;
