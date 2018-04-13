import React from 'react';
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  button : {
    margin: 30
  },
  div: {
    margin: 'auto',
    width: '15%',
    padding: '10px'
  },
  customWidth: {
    margin: 'auto',
    width: '100%'
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {    
        open: false,
        password:'',
        email:'',
        loading: false
      };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const { redirect } = this.state
    const { isLoading } = this.state

    if (isLoading) {
      return <CircularProgress style={{
        'width': '60px',
        'height': '40px',
        'margin-left': '44%',
        'margin-top': '24%'
      }}/>
    }

    if (redirect) {
      return (
        <Redirect to={{pathname: '/projects' }}/>
      )
    }

    let changeSnackBar = () => {
      this.setState({
        open: true,
      });
      setTimeout(() => {this.setState({redirect: true})}, 1000)
    }

    let changeSnackBarToError = () => {
      this.setState({
        openError: true,
      });
    }

    let object = {
      email: this.state.email,
      password: this.state.password
    }

    let doSomething = () => {
      this.setState({ isLoading: true });
      fetch('https://reactmanagebe.herokuapp.com/login',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(object)
        }
      ).then(response => response)
      .then(() => this.setState({isLoading: false}))
      .then(changeSnackBar)
      .catch(changeSnackBarToError)
    }

    return (
      <div style={styles.div}>
      
        <TextField
          id="email"
          label="Email"
          required='true'
          margin="normal"
          onChange={this.handleChange('email')}
        />

        <TextField
          id="password"
          label="Password"
          required='true'
          margin="normal"
          onChange={this.handleChange('password')}
        />

        <Button color="primary" style={{paddingLeft:'8px', marginTop:'10px'}} onClick={doSomething}>
            Zaloguj się
          </Button>
      
          <Snackbar
            open={this.state.open}
            message="Zalogowano pomyślnie"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

          <Snackbar
            open={this.state.openError}
            message="Błąd logowania"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

      </div>
    );
  }
}

export default (Login);