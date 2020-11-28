import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {RegisterPost} from '../services/ApiFunctions'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

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

class Register extends Component{
  constructor() {
    super();

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errorMessage: '',
      redirect: false
    };
    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  register()
  {
    if(this.state.firstname && this.state.lastname && this.state.email && this.state.password )
    {
      let data = {'firstname' : this.state.firstname, 'lastname': this.state.lastname, 'email': this.state.email, 'password': this.state.password}
      let dataJson = JSON.stringify(data)
      RegisterPost(dataJson).then((result)=>{
        if(result === 'created')
        {
          this.setState({redirect: true});
        }
        else{
          this.setState({errorMessage: result});
        }
      })
     }
  }
   validateForm() {
    return this.email !== '' && this.password !== '';
  }    
    
    onChange(e){
    this.setState({[e.target.name]: e.target.value});
    }
    renderErrrorMessage(){
      if(this.state.errorMessage !== ''){
        return <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
          {this.state.errorMessage} — <strong>check it out!</strong>
      </Alert>
      }
      else return '';
    }

    render () {
      const {classes} = this.props;
      
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lname"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChange}
                  />
                </Grid>
              </Grid>
              <Button onClick={this.register}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
            <div>              
              {this.renderErrrorMessage()}
            </div>
          </div>
        </Container>
      );
    }
}

export default withStyles(useStyles)(Register);