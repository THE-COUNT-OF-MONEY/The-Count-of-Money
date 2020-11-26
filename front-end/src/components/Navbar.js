import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  login: {
    marginLeft: theme.spacing(190),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/login" color="inherit" className={classes.login}>Login</Button>
          <Button component={Link} to="/register" color="inherit" className={classes.register}>Register</Button>
          <Button color="inherit" className={classes.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
