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
import {Api} from '../services/Api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 100,
    display: "flex",
    justifyContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(1),
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
]

export const Navbar = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const logout = async () => {
    await Api.logout();
    window.location.reload();
    return true
  }

  return (
    <div>
      <AppBar position="static" width="100%" className={classes.root}>
        <Toolbar>

              <Grid container justify="flex-start" alignItems="center" item xs={3}>
                <Grid item >
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
                </Grid>

                <Grid item >
                  <Typography variant="h6" className={classes.title}>
                      CountOfMoney
                  </Typography>
                </Grid>
              </Grid>


                {/*    START MIDDLE APP BUTTONS     */}
                <Grid container justify="center" item xs={6}>

                  {/*   COMMONS BUTTON    */}
                  {
                      navigationItems.map((navigationItem, key) => {
                          return (
                              <Grid item key={key}>
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

                  {/*   DISPLAY PROFILE BUTTON IF LOGIN   */}
                  {
                    user.role !== "" &&
                    <Grid item>
                      <Button
                          color="inherit"
                          className={classes.menuButton}
                          component={Link}
                          to={"/profile"}
                      >
                          Profile
                      </Button>
                    </Grid>

                  }

                  {/*   DISPLAY CyptoBank BUTTON IF LOGIN   */}
                  {
                    user.role !== "" &&
                    <Grid item>
                      <Button
                          color="inherit"
                          className={classes.menuButton}
                          component={Link}
                          to={"/CryptoBank"}
                      >
                          CyptoBank
                      </Button>
                    </Grid>

                  }

                  {/*   ADMINS BUTTON IF LOGIN    */}
                  {
                    (user.role === "ROLE_ADMIN") &&
                    <div>
                      <Grid item>
                        <Button color="inherit" component={Link} to={"/users"} className={classes.menuButton}>Users</Button>
                        <Button color="inherit" component={Link} to={"/settings"} className={classes.menuButton}>Settings</Button>
                      </Grid>
                    </div>
                  }
  
                </Grid>
                {/*    END OF MIDDLE APP BUTTONS     */}


                {/*    START RIGHTS APP BUTTONS     */}
                {
                    user.role === ""  &&
                      <Grid container justify="flex-end" direction="row"  item xs={3}>
                        <Button color="inherit" component={Link} to={"/login"} className={classes.menuButton}>Login</Button>
                        <Button color="inherit" component={Link} to={"/register"} className={classes.menuButton}>Register</Button>
                      </Grid>
                }

                {
                  user.role !== "" &&
                      <Grid container justify="flex-end" direction="row"  alignItems="center" item xs={3}>

                          <Grid item style={{textAlign: "center"}}>
                            <Typography variant="h6">
                              {user.firstname + ' ' + user.lastname }
                            </Typography>
                          </Grid>
                          <Grid item style={{textAlign: "center"}}>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={logout}>
                              <ExitToAppIcon />
                            </IconButton>
                          </Grid>

                      </Grid>
                }
                {/*    END RIGHTS APP BUTTONS     */}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;