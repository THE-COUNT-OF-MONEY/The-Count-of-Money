import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { UserContext } from '../../context/userContext';
import { Api } from '../../services/Api';
import { parse } from 'querystring';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

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



export const Settings = () => {

    const [maxFeeds, setMaxFeeds] = useState(undefined);
    const [maxCurrencies, setMaxCurrencies] = useState(undefined);
    const [readOnly, setReadOnly] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const classes = useStyles();
    const {user} = useContext(UserContext)

    useEffect(() => {

        const getData = async () => {
            const response = await Api.getSettings(user.id)
            const data = response.data[0];

            setMaxFeeds(data.feedLimit)
            setMaxCurrencies(data.cryptoLimit)

            setIsLoading(false)
        }

        if (isLoading === true) {
            getData();
        }
    })

    const onMaxFeedsChange = (e) => {
        setMaxFeeds(e.target.value);
    }

    const onMaxCurrenciesChange = (e) => {
        setMaxCurrencies(e.target.value);
    }

    const isPositiveNumber = (number) => {
        if (!Number.isInteger(number) && parseInt(number) < 0)
            return false;
        return true;
    }

    const putSettings = () => {

        if (!isPositiveNumber(maxFeeds) || !isPositiveNumber(maxCurrencies)) {
            console.log("error")
            setError("The numbers must be positive");
            return;
        }

        // const userId = user.id;

        // console.log("user: ", user.id);

        // const data = {
        //     maxFeeds: maxFeeds,
        //     maxCurrencies: maxCurrencies
        // }
        // console.log("data: ", data)
        setReadOnly(!readOnly)
    }
      

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Display limit
          </Typography>

            {
                error &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error} — <strong>check it out!</strong>
                </Alert>
            }
            <form className={classes.form} noValidate>
            
                  {
                      (maxCurrencies !== undefined && maxFeeds !== undefined) &&
                      <div>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled={readOnly}
                                    type="number"
                                    defaultValue={maxFeeds}
                                    autoComplete="maxFeeds"
                                    name="maximum feeds"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="maxFeeds"
                                    label="Maximum Feeds"
                                    onChange={onMaxFeedsChange}
                                />  
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                disabled={readOnly}
                                defaultValue={maxCurrencies}
                                variant="outlined"
                                required
                                fullWidth
                                id="maxCurrencies"
                                label="Maximum Currencies"
                                name="maxCurrencies"
                                autoComplete="lmaxCurrencies"
                                onChange={onMaxCurrenciesChange}
                                />
                            </Grid>
                        </Grid>
                      </div>
                }
              


            {
              readOnly?
              <div>
              <Button onClick={() => {setReadOnly(!readOnly)}}
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
                    <Button onClick={() => {setReadOnly(!readOnly)}}
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
                    <Button onClick={putSettings}
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
        </div>

      </Container>
    );
}

export default withStyles(useStyles)(Settings);