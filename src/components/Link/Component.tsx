import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import useStyles from './styles';

interface LinkProps {
  className?: string;
  children?: React.ReactNode;
  to?: string;
  href?: string;
  [key: string]: unknown;
}

function Link({ className, children, to, href, ...props }: LinkProps) {
  const classes = useStyles();

  if (href) {
    return (
      <a href={href} className={clsx(classes.root, className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to || '/'} className={clsx(classes.root, className)} {...props}>
      {children}
    </RouterLink>
  );
}

export default Link;
