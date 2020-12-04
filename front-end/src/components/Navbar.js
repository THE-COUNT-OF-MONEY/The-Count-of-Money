import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const navigationItems = [
    {
        'url': "/",
        'label': "Crypto Monnaies",
        'index': 0
    },
    {
        'url': "/feeds",
        'label': "Articles",
        'index': 1
    },
]

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" width="100%">
        <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Count of Money
                </Typography>

                <Grid container item xs={2}></Grid>
                {
                    navigationItems.map((navigationItem, key) => {
                        return (
                            <Button
                                color="inherit"
                                className={classes.menuButton}
                                component={Link}
                                to={navigationItem.url}
                                key={key}
                            >
                                {navigationItem.label}
                            </Button>
                        )
                    })
                }
                <Grid container item xs={4}></Grid>
                <Button color="inherit" component={Link} to={"/users"} className={classes.menuButton}>Users</Button>
                <Button color="inherit" component={Link} to={"/login"} className={classes.menuButton}>Login</Button>
                <Button color="inherit" component={Link} to={"/register"} className={classes.menuButton}>Register</Button>
                <Button color="inherit" component={Link} to={"/profile"} className={classes.menuButton}>Profile</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;