import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField'
import { Input, InputLabel } from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { ListItemText } from 'material-ui/List';

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


class EditSalaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDrawerOpen: false,
      amount: '',
      title: '',
      userId:'',
      projectId: '',
      userName: '',
      projectName: '',
      projects: [],
      users: []
    }
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/salaries/' + this.props.match.params.id, {credentials: 'include'})
      .then( response => response.json())
      .then( data => {
        if (data.projectId) this.setState({
          projectId: data.projectId._id,
          projectName: data.projectId.name
        })

        this.setState({
          title: data.title,
          amount: data.amount,
          userId: data.userId._id,
          userName: data.userId.name
        })
        
      }).then(() => {
        fetch('https://reactmanagebe.herokuapp.com/api/projects', {credentials: 'include'})
        .then( response => response.json())
        .then( data => {
          this.setState({
            projects: data
          })
        })
      }).then(() => {
        fetch('https://reactmanagebe.herokuapp.com/api/users', {credentials: 'include'})
        .then( response => response.json())
        .then( data => {
          this.setState({
            users: data
          })
        })
      }).catch(err => {
        if (err == 'TypeError: Failed to fetch') return this.setState({redirectLogin: true})
      })
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
    const { redirectLogin } = this.state

    if (redirectLogin) {
      return (
        <Redirect to={{pathname: '/login' }}/>
      )
    }
    if (redirect) {
      return (
        <Redirect to={{pathname: '/salaries' }}/>
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
      title: this.state.title,
      amount: this.state.amount,
      projectId: this.state.projectId,
      userId: this.state.userId,
    }
    
    let Edit = () => {
      fetch('https://reactmanagebe.herokuapp.com/api/salaries/' + this.props.match.params.id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          credentials: 'include',
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
          id="title"
          label="Tytuł"
          placeholder={this.state.title}
          margin="normal"
          onChange={this.handleChange('title')}
        />
        
        <TextField
          id="amount"
          label="Kwota"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          placeholder={this.state.amount}
          margin="normal"
          onChange={this.handleChange('amount')}
        />

        <FormControl  style={{minWidth:166, maxWidth: 166}}>
          <InputLabel htmlFor="projects-simple"> Projekt </InputLabel>
          <Select
            value={this.state.projectId}
            onChange={this.handleChange('projectId')}
            inputProps={{
              name: 'projects',
              id: 'projects-simple',
            }}
          >
            {this.state.projects.map(proj => (
              <MenuItem key = {proj._id} value = {proj._id}>
                <ListItemText primary = {proj.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl  style={{minWidth:166, maxWidth: 166}}>
          <InputLabel htmlFor="users-simple"> Odbiorca </InputLabel>
          <Select
            value={this.state.userId}
            onChange={this.handleChange('userId')}
            inputProps={{
              name: 'users',
              id: 'users-simple',
            }}
          >
            {this.state.users.map(user => (
              <MenuItem key = {user._id} value = {user._id}>
                <ListItemText primary = {user.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br/>

          <Button color="primary" style={{marginLeft:'unset', marginTop:'10px'}} onClick={Cancel}>
            Cofnij
          </Button>
          <Button color="primary" style={{marginLeft:'4.7%', marginTop:'10px'}} onClick={Edit}>
            Edytuj
          </Button>

          <Snackbar
            open={this.state.open}
            message="Edytowano wypłatę"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />

          <Snackbar
            open={this.state.openError}
            message="Błąd podczas edytowania"
            autoHideDuration={2000}
            onClose={this.handleRequestClose}
          />
      </div>    )
  }
}

export default EditSalaries;