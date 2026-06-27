import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

import useStyles from './styles';

interface PageProps extends BoxProps {
  children?: React.ReactNode;
}

const Page = ({ children, ...props }: PageProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      {children}
    </Box>
  );
};

export default Page;
