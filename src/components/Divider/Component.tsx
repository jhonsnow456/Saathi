import React from 'react';
import { Divider as MUIDivider, DividerProps } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './styles';

interface CustomDividerProps extends DividerProps {
  withoutMargins?: boolean;
}

function Divider({ className, withoutMargins, orientation, ...props }: CustomDividerProps) {
  const classes = useStyles();

  return (
    <MUIDivider
      {...props}
      orientation={orientation}
      className={clsx(
        !withoutMargins && (orientation === 'vertical' ? classes.vertical : classes.horizontal),
        className
      )}
    />
  );
}

export default Divider;
