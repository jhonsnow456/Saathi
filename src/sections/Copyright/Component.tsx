import React from 'react';
import { Typography, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { copyright } from '../../config';

function Copyright() {
  return (
    <Box display="flex" justifyContent="center" pt={2} pb={2}>
      <Typography variant="body2" color="textSecondary" style={{ userSelect: 'none' }}>
        {copyright.title}
        <Link color="inherit" href={copyright.link}>
          {copyright.link}
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Copyright;
