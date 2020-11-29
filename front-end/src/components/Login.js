import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginPost, signInWithGoogle} from '../services/ApiFunctions'
//import {GoogleLogin} from 'react-google-login'
import GoogleButton from 'react-google-button'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
});

class Login extends Component{
  constructor(){
    super();
   
    this.state = {
     email: '',
     password: '',
     errorMessage: '',
     redirect: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

   handleSubmit(event) {
    event.preventDefault();
  }
  login()
  {
    if(this.state.email && this.state.password)
    {
      let data = {'email': this.state.email, 'password': this.state.password}
      let dataJson = JSON.stringify(data)
      loginPost(dataJson).then((result) =>{
        console.log(result);
        if(result)
        {          
          if(result === 'logined')
        {
          this.setState({redirect: true});
          this.props.history.push('/')
        }
        else{
          this.setState({errorMessage: result});
        }
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

  render()
  {
    const {classes} = this.props;
    return (
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />          
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>          
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.onChange}
            />
            <Button onClick={this.login}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}                        
            >
              Login
            </Button>
            <Grid container>
            </Grid>
          </form>
            <div>
              <GoogleButton
                type="dark" // can be light or dark
                onClick={() => { signInWithGoogle() }}
              />
            </div>
            <div>              
              {this.renderErrrorMessage()}
            </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);