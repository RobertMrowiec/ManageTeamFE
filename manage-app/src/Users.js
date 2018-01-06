import React, { Component } from 'react';
import 'simple-react-button/styles.scss';
import Salaries from './Salaries';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

let addNew = () => {
  <Router>
    <Route path = "/salaries"  />
  </Router>
}

class Users extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

    componentDidMount() {
      fetch('http://localhost:8030/api/users')
        .then( response => response.json())
        .then( data => this.setState({users: data}))
    }
    
    render(){
      const {users} = this.state;
      return (
        <div>
        <button onClick = {addNew()}> Dodaj nowego uzytownika </button>
          {users.map(user =>
            <div key={user.name}>
              <p> {user.name} </p>
              <p> {user.surname}</p>
              <p> ------------</p>
            </div>
          )}
        </div>
      )
    }
  }

export default Users;
