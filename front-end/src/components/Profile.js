import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Profile extends Component{
  constructor() {
    super();

    this.state = {
      firstname: 'callas',
      lastname: 'iyad',
      email: 'iyad.callas@epitech.eu',
      password: 'test1234',
      readOnly: true
    };
    
    this.isDisabled = this.isDisabled.bind(this);
    this.switch = this.switch.bind(this);
  }

    isDisabled() {
        if (this.state.readOnly) {
            return { disabled: true };
        }
        return { disabled: false};
    }

    switch() {
        if (this.state.readOnly) {
            this.setState({ readOnly: false })
        }
        else {
            this.setState({ readOnly: true })
        }
    }

    render () {
      const {classes} = this.props;
      
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...this.isDisabled()}
                    defaultValue={this.state.firstname}
                    autoComplete="fname"
                    name="firstname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...this.isDisabled()}
                    defaultValue={this.state.lastname}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...this.isDisabled()}
                    defaultValue={this.state.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...this.isDisabled()}
                    defaultValue={this.state.password}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button onClick={this.switch}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit
              </Button>
            </form>
          </div>
        </Container>
      );
    }
}

export default withStyles(useStyles)(Profile);