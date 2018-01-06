import Users from './Users';
import Home from './Home';
import Projects from './Projects';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <Router>
        <div className = "container">
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        <Route exact path = "/" component = {Home} />
        <Route path = "/users" component = {Users} />           
        <Route path = "/projects" component = {Projects} />           
        </div>
      </Router>
    )
  }
}


  // class App extends Component {
  //   constructor(props) {
  //     super(props)

  //     this.state = {
  //       hits: [],
  //     }
  //   }
  //     componentDidMount() {
  //       fetch('http://localhost:8030/api/users')
  //         .then( response => response.json())
  //         .then( data => this.setState({hits: data}))
  //     }
      
  //     render(){
  //       const {hits} = this.state;

  //       return (
  //         <div>
  //           {hits.map(hit =>
  //             <div key={hit.objectID}>
  //               <p> {hit.name} </p>
  //               <p> {hit.surname} </p>
  //             </div>
  //           )}
  //         </div>
  //       )
  //     }
  //   }
export default App;