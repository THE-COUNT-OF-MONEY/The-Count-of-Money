import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginPost} from '../services/ApiFunctions'
//import axios from 'axios';

const useStyles = {
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    //marginTop: theme.spacing(1),
  },
  submit: {
    //margin: theme.spacing(3, 0, 2),
  }
}

// function login() {
//   const classes = useStyles();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

 

    
//}

class Login extends Component{
  constructor(){
    super();
   
    this.state = {
     email: '',
     password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

   handleSubmit(event) {
    event.preventDefault();
    if(this.state.email && this.state.password)
    {
      loginPost(this.state);
    //   let dataJson = JSON.stringify(this.state);
    //   console.log(dataJson);
    //   const Response = () =>{
    //     React.useEffect(() =>{
    //       axios.post('http://locahost:8000/users/login', {dataJson},
    //   {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json'
    //   },
    //   {withCredentials: true})
    //       .then((res) => {
    //           console.log(res.data)
    //       }).catch((error) => {
    //           console.log('insideError');
    //           console.log(error.config)
    //           console.log(error.status)
    //           console.log(error.code)
    //       });
    //   })
    //   }
    //   console.log(Response)
     }
  }
   validateForm() {
    return this.email !== '' && this.password !== '';
  }    
    
    onChange(e){
    this.setState({[e.target.name]: e.target.value});
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
          <form className={classes.form} noValidate onSubmit={this.handleSubmit} >
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
            <Button
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
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);