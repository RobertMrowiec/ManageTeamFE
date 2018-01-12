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

class AddSalaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDrawerOpen: false,
      projectId: '',
      title: '',
      userId:'',
      projectId: '',
      projects: [],
      users: []
    }
  }

  handleChange = (event, index, projectId) => this.setState({projectId});
  handleChangeUser = (event, index, userId) => this.setState({userId});

  componentDidMount() {
    fetch('http://localhost:8030/api/projects')
      .then( response => response.json())
      .then( data => this.setState({projects: data}))
      .then(() => {
        fetch('http://localhost:8030/api/users')
        .then( response => response.json())
        .then( data => this.setState({users: data}))
      })
  }
  
  menuItems(values) {
    const {projects} = this.state;
    return projects.map((project) => (
      <MenuItem
        key={project.name}
        insetChildren={true}
        checked={values && values.indexOf(project._id) > -1}
        value={project._id}
        primaryText={project.name}
      />
    ));
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

  render(){
    let change = () => {
        this.setState({
          open: true,
      });
    }

    let object = {
      value: this.state.value,
      userId: this.state.userId,
      title: this.state.title,
      projectId: this.state.projectId
    }
    console.log(this.state);
    
    let doSomething = function(){
      console.log('asd');
      fetch('http://localhost:8030/api/salaries',
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

    const {projects} = this.state;
    const {users} = this.state;
    const {values} = this.state;

    return (
      <div style={style.div}>
        <MuiThemeProvider>

          <TextField
            hintText="Tytuł przelewu"
            floatingLabelText="Tytuł przelewu"
            onChange = {(event,newValue) => this.setState({title:newValue})}
          />
          <TextField
            hintText="Kwota"
            floatingLabelText="Kwota"
            type='Number'
            onChange = {(event,newValue) => this.setState({value:newValue})}
          />


          <br/>
          <br/>


          <SelectField
            floatingLabelText="Uzytkownik"
            value={this.state.userId}
            onChange={this.handleChangeUser}
            autoWidth={true}
          >
            {users.map(user =>
              <MenuItem value = {user._id} key = {user.name} primaryText = {user.name}/>
            )}
          </SelectField>

          <SelectField
            floatingLabelText="Projekty"
            value={this.state.projectId}
            onChange={this.handleChange}
            autoWidth={true}
          >
            {projects.map(project =>
              <MenuItem value = {project._id} key = {project.name} primaryText = {project.name}/>
            )}
          </SelectField>

          <RaisedButton label="Dodaj wypłatę" primary={true} style={style.button} onClick= {doSomething}/>
          
          <Snackbar
            open={this.state.open}
            message="Dodano wypłatę"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          /> 

        </MuiThemeProvider>
      </div>
    )
  }
}

export default AddSalaries;