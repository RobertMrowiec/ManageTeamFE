import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/Menu/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { Link, Redirect } from 'react-router-dom';

const style = {
  div: {
    margin: 'auto',
    width: '15%',
    padding: '10px'
  },
  customWidth: {
    margin: 'auto',
    width: '100%'
  }
}


class AddProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openError: false,
      name: '',
      amount: '',
      redirect: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:8030/api/projects/' + this.props.match.params.id)
      .then( response => response.json())
      .then( data => this.setState({
        name: data.name,
        amount: data.amount
      }))
  }

  
  handleRequestClose = () => {
    this.setState({
      open: false,
      openError: false
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render(){
    const { redirect } = this.state

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
      name: this.state.name,
      amount: this.state.amount
    }
    
    let Edit = () => {
      fetch('http://localhost:8030/api/projects/' + this.props.match.params.id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
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
    
    let Cancel = () => {
     {this.setState({redirect: true})}
    }

    return (
      
      <div style={style.div}>
          <TextField
            id="name"
            label= 'Nazwa projektu'
            placeholder= {this.state.name}
            margin="normal"
            onChange={this.handleChange('name')}
          />
          
          <TextField
            id="number"
            label="Kwota"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            placeholder= {this.state.amount}
            margin="normal"
            onChange={this.handleChange('amount')}
          />
          
          <Button raised color="primary" style={{marginLeft:'4.7%', marginTop:'10px'}} onClick={Cancel}>
            Cofnij
          </Button>
          <Button raised color="primary" style={{marginLeft:'4.7%', marginTop:'10px'}} onClick={Edit}>
            Edytuj
          </Button>
          <Snackbar
            open={this.state.open}
            message="Edytowano projekt"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

          <Snackbar
            open={this.state.openError}
            message="Bląd podczas edycji"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />
      </div>
    )
  }
}

export default AddProjects;