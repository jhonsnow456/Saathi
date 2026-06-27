import React from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

import useFlexStyles from './styles';

interface FbProps {
  row?: boolean;
  wrap?: boolean;
  grow?: boolean;
  column?: boolean;
  noGrow?: boolean;
  shrink?: boolean;
  noWrap?: boolean;
  inline?: boolean;
  alignEnd?: boolean;
  noShrink?: boolean;
  className?: string;
  rowReverse?: boolean;
  alignStart?: boolean;
  justifyEnd?: boolean;
  alignCenter?: boolean;
  justifyStart?: boolean;
  justifyCenter?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyBetween?: boolean;
  children?: React.ReactNode;
  component?: React.ElementType;
  [key: string]: unknown;
}

function Fb(props: FbProps) {
  const flexClasses = useFlexStyles();
  const {
    row = false,
    wrap = false,
    grow = false,
    column = false,
    noGrow = false,
    shrink = false,
    noWrap = false,
    inline = false,
    alignEnd = false,
    noShrink = true,
    className = '',
    rowReverse = false,
    alignStart = false,
    justifyEnd = false,
    alignCenter = false,
    justifyStart = false,
    justifyCenter = false,
    justifyAround = false,
    justifyEvenly = false,
    justifyBetween = false,
    children,
    ...otherProps
  } = props;

  const combinedClassNames = clsx(className, {
    [flexClasses.main]: !inline,
    [flexClasses.inline]: inline,
    [flexClasses.row]: row,
    [flexClasses.wrap]: wrap,
    [flexClasses.grow]: grow,
    [flexClasses.column]: column,
    [flexClasses.noGrow]: noGrow,
    [flexClasses.shrink]: shrink,
    [flexClasses.noWrap]: noWrap,
    [flexClasses.alignEnd]: alignEnd,
    [flexClasses.noShrink]: noShrink,
    [flexClasses.rowReverse]: rowReverse,
    [flexClasses.alignStart]: alignStart,
    [flexClasses.justifyEnd]: justifyEnd,
    [flexClasses.alignCenter]: alignCenter,
    [flexClasses.justifyStart]: justifyStart,
    [flexClasses.justifyCenter]: justifyCenter,
    [flexClasses.justifyAround]: justifyAround,
    [flexClasses.justifyEvenly]: justifyEvenly,
    [flexClasses.justifyBetween]: justifyBetween,
  });

  return (
    <Box className={combinedClassNames} {...otherProps}>
      {children}
    </Box>
  );
}

export default Fb;
