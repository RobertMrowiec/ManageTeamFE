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

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDrawerOpen: false,
      name:'',
      surname:'',
      email:'',
      projects:[],
      values: []
    }
  }

  handleChange = (event, index, values) => this.setState({values});

  componentDidMount() {
    fetch('http://localhost:8030/api/projects')
      .then( response => response.json())
      .then( data => this.setState({projects: data}))
  }
  
  menuItems(values) {
    const {projects} = this.state;
    return projects.map((project) => (
      <MenuItem
        key={project.name}
        insetChildren={true}
        checked = {values && values.indexOf(project._id) > -1}
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
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      projects: this.state.values
    }
    console.log(this.state);
    
    let doSomething = function(){
      fetch('http://localhost:8030/api/users',
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
    const {values} = this.state;
    return (
      <div style={style.div}>
        <MuiThemeProvider>
          <TextField
            hintText="Imie"
            floatingLabelText="Imie"
            onChange = {(event,newValue) => this.setState({name:newValue})}
          />
          <TextField
            hintText="Nazwisko"
            floatingLabelText="Nazwisko"
            onChange = {(event,newValue) => this.setState({surname:newValue})}
          />
          <br/>
          <br/>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({email:newValue})}
          />
          <br/>

          <SelectField
            multiple={true}
            hintText="Projekty"
            value={values}
            onChange={this.handleChange}
          >
            {this.menuItems(values)}
          </SelectField>

          <RaisedButton label="Dodaj uzytkownika" primary={true} style={style.button} onClick= {doSomething}/>
            <Snackbar
            open={this.state.open}
            message="Dodano uzytkownika"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          /> 
        </MuiThemeProvider>
      </div>
    )
  }
}

export default AddUser;

{/* <SelectField
  floatingLabelText="Projekty"
  value={this.state.value}
  onChange={this.handleChange}
  autoWidth={true}
>
  {projects.map(project =>
    <MenuItem value = {project.name} key = {project.name} primaryText = {project.name}/>
)}
</SelectField> */}