import React from 'react';
import { CircularProgress, Paper } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './styles';

interface LoadingProps {
  size?: number;
  withoutBackground?: boolean;
  position?: 'absolute' | 'relative';
}

function Loading({ size = 50, withoutBackground = false, position = 'absolute' }: LoadingProps) {
  const classes = useStyles({ position });

  return (
    <Paper
      elevation={0}
      square
      className={clsx(classes.preloader, withoutBackground && classes.open)}
    >
      <CircularProgress thickness={1.5} color="inherit" size={size} />
    </Paper>
  );
}

export default Loading;
