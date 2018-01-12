import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

let style = {
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
}

class AddProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDrawerOpen: false,
      name: '',
      amount: ''
    }
  }

  handleChange = (event, index, projectId) => this.setState({projectId});
  handleChangeUser = (event, index, userId) => this.setState({userId});


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

  render(){
    let change = () => {
        this.setState({
          open: true,
      });
    }

    let object = {
      name: this.state.name,
      amount: this.state.amount
    }
    console.log(this.state);
    
    let doSomething = function(){
      console.log('asd');
      fetch('http://localhost:8030/api/projects',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(object)
        }
      ).then(() => {
        change()
      })
    }

    return (
      <div style={style.div}>
        <MuiThemeProvider>

          <TextField
            hintText="Nazwa projektu"
            floatingLabelText="Nazwa projektu"
            onChange = {(event,newValue) => this.setState({name:newValue})}
          />
          <TextField
            hintText="Kwota projektu"
            floatingLabelText="Kwota projektu"
            type='Number'
            onChange = {(event,newValue) => this.setState({amount:newValue})}
          />


          <br/>
          <br/>


          <RaisedButton label="Dodaj projekt" primary={true} style={style.button} onClick= {doSomething}/>
          
          <Snackbar
            open={this.state.open}
            message="Dodano projekt"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          /> 

        </MuiThemeProvider>
      </div>
    )
  }
}

export default AddProjects;