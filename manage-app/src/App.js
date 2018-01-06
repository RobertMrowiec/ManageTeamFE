import Users from './Users';
import Home from './Home';
import Projects from './Projects';
import Salaries from './Salaries';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class App extends Component {
 
  render () {
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar title="My AppBar" />
    </MuiThemeProvider>
    return (
      <Router>
        <div className = "container">
        <ul>
            <li>
              <Link to="/">Strona główna</Link>
            </li>
            <li>
              <Link to="/users">Uzytkownicy</Link>
            </li>
            <li>
              <Link to="/projects">Projekty</Link>
            </li>
            <li>
              <Link to="/salaries">Wypłaty</Link>
            </li>
          </ul>
        <Route exact path = "/" component = {Home} />
        <Route path = "/users" component = {Users} />           
        <Route path = "/projects" component = {Projects} />           
        <Route path = "/salaries" component = {Salaries} />
        </div>
      </Router>
    )
  }
}

export default App;