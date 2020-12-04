import React, { Component, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Api } from '../services/Api'
import GoogleButton from 'react-google-button'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { UserContext } from "../context/userContext";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
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
}));


export const Login = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {user, setUser} = useContext(UserContext);
    const history = useHistory();

    const updateUserContext = async () => {

      const response = await Api.getProfile();

      if (response.status !== 200 || !response.data || !response.data.content) {
          setError("Error during profile recuperation.")
          return false;
      }

      setUser(response.data.content.user);

      return true;
    }

    const signIn = async () => {
        if (email && password) {
            let data = {'email': email, 'password': password}
            const token = await Api.login(data)

            if (token) {
                localStorage.setItem("token", token);
                const status = await updateUserContext()
    
                if (status)
                    history.push('/')

            } else {
                setError("Wrong credentials")
            }
        }
    }

    const signInWithGoogle = async () => {
        const token = await Api.getGoogleToken();

        if (token) {
            localStorage.setItem("token", token);
            const response = await Api.signInWithProvider('google');
            
            if (response.status === 200) {
                localStorage.setItem("token", response.data.content.token);
                const status = await updateUserContext()
            
                if (status)
                    history.push('/')
            }
        }
    }

    const onEmailChange = (e) => {
      setEmail(e.target.value);
    }
    
    const onPasswordChange = (e) => {
      setPassword(e.target.value);
    }

    const renderErrrorMessage = () => {
        if (error !== ''){
            return (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error} — <strong>check it out!</strong>
                </Alert>
            )
        }
        else return '';
    }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />          
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>          
          
          <form className={classes.form} noValidate>
            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus onChange={onEmailChange}/>
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={onPasswordChange}/>
            <Button onClick={signIn} fullWidth variant="contained" color="primary" className={classes.submit}>
              Login
            </Button>
            <Grid container>
            </Grid>
          </form>

          <div>
            <GoogleButton type="dark" onClick={signInWithGoogle}/>
          </div>

          <div>              
            {renderErrrorMessage()}
          </div>

        </div>
      </Container>
    );
}

export default withStyles(useStyles)(Login);