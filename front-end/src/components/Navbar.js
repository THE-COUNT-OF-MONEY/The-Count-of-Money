import {React, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { UserContext } from "../context/userContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 100,
    display: "flex",
    justifyContent: "center"
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
        'label': "Cryptos",
    },
    {
        'url': "/feeds",
        'label': "Feeds",
    },
    {
      'url': "/profile",
      'label': "Profile",
  },
]

export const Navbar = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  console.log("user gotten: ", user);

  return (
    <div>
      <AppBar position="static" width="100%" className={classes.root}>
        <Toolbar>

              <Grid container justify="flex-start" alignItems="center">
                <Grid item xs={1}>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="h6" className={classes.title}>
                      CountOfMoney
                  </Typography>
                </Grid>
              </Grid>

                <Grid container justify="center">
                {
                    navigationItems.map((navigationItem, key) => {
                        return (
                            <Grid item>
                              <Button
                                  color="inherit"
                                  className={classes.menuButton}
                                  component={Link}
                                  to={navigationItem.url}
                                  key={key}
                              >
                                  {navigationItem.label}
                              </Button>
                            </Grid>
                        )
                    })
                }
                </Grid>
                {/* <Button color="inherit" component={Link} to={"/users"} className={classes.menuButton}>Users</Button> */}


                <Grid container direction="row">
                  {
                    user === null &&
                      <div>
                        <Button color="inherit" component={Link} to={"/login"} className={classes.menuButton}>Login</Button>
                        <Button color="inherit" component={Link} to={"/register"} className={classes.menuButton}>Register</Button>
                      </div>
                  }

                  {
                    user &&
                      <div>
                        <Grid item>
                          <Typography variant="h6" spacing={1}>
                            {user.firstname + ' ' + user.lastname }
                          </Typography>

                          <IconButton className={classes.menuButton} color="inherit" aria-label="menu" spacing={1}>
                            <ExitToAppIcon />
                          </IconButton>

                        </Grid>


                      </div>
                  }
                </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;