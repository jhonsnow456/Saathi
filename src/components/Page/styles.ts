import { makeStyles, createStyles } from '@material-ui/core/styles';

import isMobile from '../../utils/isMobile';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      paddingLeft: theme.spacing(isMobile ? 1.5 : 3),
      paddingRight: theme.spacing(isMobile ? 1.5 : 3),
    },
  })
);

export default useStyles;
