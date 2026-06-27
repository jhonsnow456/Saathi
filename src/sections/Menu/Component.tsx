import React from 'react';
import { SwipeableDrawer, ListItemIcon, ListItemText, List, MenuItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaHome as WelcomeIcon,
  FaJsSquare as JSIcon,
  FaReact as ReactIcon,
  FaGithub as GithubIcon,
  FaBug as BugIcon,
} from 'react-icons/fa';

import useStyles from './styles';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

function Menu({ isOpen, onClose, onOpen }: MenuProps) {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={30}
      disableBackdropTransition
    >
      <List className={classes.list}>
        <div className={classes.toolbar} />
        <MenuItem onClick={onClose} component={RouterLink} to="/">
          <ListItemIcon>
            <WelcomeIcon />
          </ListItemIcon>
          <ListItemText primary="Welcome" />
        </MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/page-1">
          <ListItemIcon>
            <JSIcon />
          </ListItemIcon>
          <ListItemText primary="Page 1" />
        </MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/page-2">
          <ListItemIcon>
            <ReactIcon />
          </ListItemIcon>
          <ListItemText primary="Page 2" />
        </MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/page-3">
          <ListItemIcon>
            <GithubIcon />
          </ListItemIcon>
          <ListItemText primary="Page 3" />
        </MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/page-4">
          <ListItemIcon>
            <BugIcon />
          </ListItemIcon>
          <ListItemText primary="Page 4" />
        </MenuItem>
      </List>
    </SwipeableDrawer>
  );
}

export default Menu;
