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
        <h1>Strona główna</h1>
      </div>
      
    )
  }
}

export default Home;
