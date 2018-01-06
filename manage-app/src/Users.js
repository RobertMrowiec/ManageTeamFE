import React, { Component } from 'react';

class Users extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
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
          {users.map(user =>
            <div key={user.name}>
              <p> {user.name} </p>
              <div key={user.surname}>
                <p> {user.surname}</p>
              </div>
            </div>
          )}
        </div>
      )
    }
  }

export default Users;
