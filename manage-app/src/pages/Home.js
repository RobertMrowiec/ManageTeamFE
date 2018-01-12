import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isDrawerOpen: false,
          username:'',
          password:''
      }
  }
  render(){
    return (
      <div>
        <MuiThemeProvider>
          <TextField
            hintText="Wpisz email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({username:newValue})}
          />  
        </MuiThemeProvider>
      </div>
      
    )
  }
}

export default Home;
