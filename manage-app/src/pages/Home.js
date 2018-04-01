import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Line} from 'react-chartjs-2';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          users: [],
          salaries: []
      }
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/projects')
      .then( response => response.json())
      .then( data => this.setState({values: data}))
  }

  render(){
    let data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  
    return (
      <div style = {{marginLeft:'11%'}}>
        <Line data={data} width="600" height="250"/>
      </div>
      
    )
  }
}

export default Home;
