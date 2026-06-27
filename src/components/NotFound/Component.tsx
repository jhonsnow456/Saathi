import React from 'react';
import { Container, Typography } from '@material-ui/core';

import Divider from '../Divider';
import Fb from '../Fb';
import { giphy404, messages } from '../../config';

import useStyles from './styles';

function NotFound() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Fb column alignCenter justifyCenter className="full-height">
        <iframe
          title="404"
          src={giphy404}
          className={classes.giphy}
          frameBorder="0"
          allowFullScreen
        >
        </iframe>
        <Fb column className={classes.message}>
          <Typography variant="h4" color="secondary">
            404 Not Found
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h4" color="textSecondary">
            {messages[404]}
          </Typography>
        </Fb>
      </Fb>
    </Container>
  );
}

export default NotFound;
