import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Api } from '../services/Api'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/userContext";

const useStyles = makeStyles((theme) => ({
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
}));



export const Profile = () => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState(user.email);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [readOnly, setReadOnly] = useState(true);
    const [error, setError] = useState("");
    const history = useHistory();
    const classes = useStyles();

    const isDisabled = () => {
        if (readOnly)
            return { disabled: true };
        return { disabled: false};
    }

    const switchReadOnly = () => {
        setReadOnly(!readOnly)
    }

    const putProfile = () => {
        if (firstname && lastname && email) {
          let data = {'firstname' : firstname, 'lastname': lastname, 'email': email}

          Api.putProfile(data)
            .then((result) => {
                if (result === 'updated') {
                    history.push('/profile')
                } else {
                    setError('Error during modification')
                }
            })
      }
    }
      
    const renderErrorMessage = () => {
      if (error !== '') {
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
            Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...isDisabled()}
                  defaultValue={firstname}
                  autoComplete="fname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={setFirstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...isDisabled()}
                  defaultValue={lastname}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                  onChange={setLastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...isDisabled()}
                  defaultValue={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={setEmail}
                />
              </Grid>
            </Grid>
            {
              readOnly?
              <div>
              <Button onClick={switchReadOnly}
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
              !readOnly?
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button onClick={switchReadOnly}
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
                    <Button onClick={putProfile}
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
            {renderErrorMessage()}
          </div>
        </div>
      </Container>
    );
}

export default withStyles(useStyles)(Profile);