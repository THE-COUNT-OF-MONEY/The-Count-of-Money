import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Api } from '../services/Api'
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

class Profile extends Component{
  constructor() {
    super();

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      readOnly: true,
      errorMessage: '',
      redirect: false
    };
    
    this.isDisabled = this.isDisabled.bind(this);
    this.switch = this.switch.bind(this);
    this.putProfile = this.putProfile.bind(this);
    this.onChange = this.onChange.bind(this);
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

    handleSubmit(event) {
      event.preventDefault();
    }
    putProfile()
    {
      if(this.state.firstname && this.state.lastname && this.state.email && this.state.password )
      {
        let data = {'firstname' : this.state.firstname, 'lastname': this.state.lastname, 'email': this.state.email, 'password': this.state.password}
        let dataJson = JSON.stringify(data)
        Api.putProfile(dataJson).then((result)=>{
          if(result === 'updated')
          {
            this.setState({redirect: true});
            this.props.history.push('/profile')
          }
          else{
            this.setState({errorMessage: result});
          }
        })
       }
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
                  />
                </Grid>
              </Grid>
              {
                this.state.readOnly?
                <div>
                <Button onClick={this.switch}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Edit
                </Button>
                </div>
                :null
              }
              {
                !this.state.readOnly?
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button onClick={this.switch}
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<CancelIcon/>}
                        className={classes.submit}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button onClick={this.putProfile}
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon/>}
                        className={classes.submit}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </div>
                :null
              }
            </form>
            <div>              
              {this.renderErrrorMessage()}
            </div>
          </div>
        </Container>
      );
    }
}

export default withStyles(useStyles)(Profile);