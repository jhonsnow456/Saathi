import React from 'react';
import { AppBar as MUIAppBar, Toolbar, IconButton, Button, Tooltip } from '@material-ui/core';
import { FaBrush as BrushIcon, FaRedo as RedoIcon, FaBars as MenuIcon, FaGithub as GithubIcon } from 'react-icons/fa';

import Link from '../../components/Link';
import Fb from '../../components/Fb';
import Divider from '../../components/Divider';
import useTheme from '../../store/theme';
import useSW from '../../store/sw';
import { title, repository } from '../../config';

import useStyles from './styles';

interface AppBarProps {
  onMenuOpen: () => void;
}

function AppBar({ onMenuOpen }: AppBarProps) {
  const classes = useStyles();
  const [, themeActions] = useTheme();
  const [swState, swActions] = useSW();

  const handleToggleTheme = () => {
    themeActions.toggle();
  };

  const handleAppUpdate = () => {
    swActions.update();
  };

  return (
    <MUIAppBar
      position="absolute"
      className={classes.appBar}
      color="transparent"
      elevation={1}
    >
      <Toolbar className={classes.toolbar}>
        <Fb className={classes.main}>
          <IconButton edge="start" aria-label="open menu" onClick={onMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Button aria-label="go to home" className={classes.title}>
              {title}
            </Button>
          </Link>
        </Fb>
        <Fb>
          {swState.isUpdated && (
            <>
              <Tooltip title="The application has newer version; press to update" arrow>
                <IconButton
                  aria-label="update the application"
                  color="secondary"
                  onClick={handleAppUpdate}
                >
                  <RedoIcon />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <Tooltip title="It's open source" arrow>
            <IconButton
              aria-label="go to github page"
              component="a"
              target="_blank"
              rel="noreferrer"
              href={repository}
            >
              <GithubIcon />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Change theme" arrow>
            <IconButton aria-label="toggle theme" edge="end" onClick={handleToggleTheme}>
              <BrushIcon />
            </IconButton>
          </Tooltip>
        </Fb>
      </Toolbar>
    </MUIAppBar>
  );
}

export default AppBar;
