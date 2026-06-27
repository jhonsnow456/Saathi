import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';

import useStyles from './styles';

interface ScrollBarProps {
  className?: string;
  children?: React.ReactNode;
}

function ScrollBar({ className, children, ...props }: ScrollBarProps) {
  const classes = useStyles();

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      {...props}
      className={clsx(classes.root, className)}
    >
      {children}
    </Scrollbars>
  );
}

export default ScrollBar;
