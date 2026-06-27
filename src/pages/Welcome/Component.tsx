import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { FaReact as ReactIcon } from 'react-icons/fa';

import Fb from '../../components/Fb';
import Meta from '../../components/Meta';

import useStyles from './styles';

function Welcome() {
  const matchSmallScreen = useMediaQuery('(max-width: 600px)');
  const classes = useStyles();

  return (
    <>
      <Meta title="Welcome" description="Welcome to Saathi - Learning Disability Analyser" />
      <Container maxWidth="sm" className={classes.wrapper}>
        <Fb justifyCenter alignCenter className={classes.wrapper}>
          <Fb className={classes.iconBox}>
            <ReactIcon className={classes.icon} />
          </Fb>
          <Typography
            variant={matchSmallScreen ? 'h4' : 'h3'}
            className={classes.title}
          >
            Saathi - Learning Disability Analyser
          </Typography>
        </Fb>
      </Container>
    </>
  );
}

export default Welcome;
