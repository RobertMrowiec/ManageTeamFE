import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';

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

const tags = [
  {name:'material-ui', _id:'1'},
  {name:'material-design', _id:'2'},
  {name:'material', _id:'3'}
];

class AddUser extends React.Component {
  constructor(props) {
    super(props);
      this.state = {    
        open: false,
        isDrawerOpen: false,
        name:'',
        surname:'',
        email:'',
        values: [],
        tag: new Set()
      };
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/projects')
      .then( response => response.json())
      .then( data => this.setState({values: data}))
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

    if (redirect) {
      return (
        <Redirect to={{pathname: '/users' }}/>
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

    let changeSnackBarName = () => {
      this.setState({
        openName: true,
      });
    }

    let changeSnackBarSurname = () => {
      this.setState({
        openSurname: true,
      });
    }

    let changeSnackBarEmail = () => {
      this.setState({
        openEmail: true,
      });
    }

    let object = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
    }

    let doSomething = () => {
      if (!object.name) return changeSnackBarName()
      if (!object.surname) return changeSnackBarSurname()
      if (!object.email) return changeSnackBarEmail()
      
      let array = Array.from(this.state.tag);
      object.projects = array
      fetch('https://reactmanagebe.herokuapp.com/api/users',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(object)
        }
      ).then(response => {
        if (!response.ok){
          throw Error(response.statusText)
        }
        return response
      }).then(changeSnackBar)
        .catch(changeSnackBarToError)
    }

    return (
      <div style={styles.div}>
        <TextField
          id="name"
          label="Imie"
          placeholder="Np. Jan"
          required='true'
          margin="normal"
          onChange={this.handleChange('name')}
        />
        <TextField
          id="surname"
          label="Nazwisko"
          placeholder="Np. Kowalski"
          required='true'
          margin="normal"
          onChange={this.handleChange('surname')}
        />
        <TextField
          id="email"
          label="Email"
          required='true'
          placeholder="Np. kowalski@gmail.com"
          margin="normal"
          onChange={this.handleChange('email')}
        />

        <Button color="primary" style={{paddingLeft:'8px', marginTop:'10px'}} onClick={doSomething}>
            Dodaj uzytkownika
          </Button>
      
          <Snackbar
            open={this.state.open}
            message="Dodano uzytkownika"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

          <Snackbar
            open={this.state.openError}
            message="Błąd serwera"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

          <Snackbar
            open={this.state.openName}
            message="Nie wpisano imienia"
            autoHideDuration={1000}
          />
          
          <Snackbar
            open={this.state.openSurname}
            message="Nie wpisano nazwiska"
            autoHideDuration={1000}
          />

          <Snackbar
            open={this.state.openEmail}
            message="Nie wpisano emaila"
            autoHideDuration={1000}
          />
      </div>
    );
  }
}

export default (AddUser);