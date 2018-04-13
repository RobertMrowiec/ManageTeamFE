import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          users: [],
          salaries: []
      }
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/dashboards/salaries', {credentials: 'include'})
      .then( response => response.json())
      .then( data => {
        this.setState({users: data.imiona})
        this.setState({salaries: data.sumy})
      })
      .then(() => this.setState({isLoading: false}))
      .catch(err => {
        if (err == 'TypeError: Failed to fetch') return this.setState({redirectLogin: true})
      })
  }

  render(){
    const { redirectLogin } = this.state
    const { isLoading } = this.state

    if (isLoading) {
      return <CircularProgress style={{
        'width': '60px',
        'height': '40px',
        'margin-left': '44%',
        'margin-top': '24%'
      }}/>
    }
    if (redirectLogin) {
      return (
        <Redirect to={{pathname: '/login' }}/>
      )
    }
    let data = {
      labels: this.state.users,
      datasets: [{
        label: "Zarobki z tego miesiąca",
        data: this.state.salaries
      }]
    }
  
    return (
      <div style = {{marginLeft:'2.2%'}}>
        <Line data={data} />
      </div>
      
    )
  }
}

export default Home;
