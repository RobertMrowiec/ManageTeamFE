import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'; 
import injectTapEventPlugin from 'react-tap-event-plugin';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import Hidden from 'material-ui/Hidden';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';  


//  import AddUsers from './pages/AddUsers';
// import AddSalaries from './pages/AddSalaries';
// import AddProjects from './pages/AddProjects';
import GetProjects from './pages/getProjects';
// import Users from './pages/Users';
import Home from './pages/Home';
// import Projects from './pages/Projects';
// import Salaries from './pages/Salaries';
// import About from './pages/About';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth
  },
  container: {
    marginTop:'100%'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '-webkit-fill-available',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});



// import AddUsers from './pages/AddUsers';
// import AddSalaries from './pages/AddSalaries';
// import AddProjects from './pages/AddProjects';
// import GetProjects from './pages/getProjects';
// import Users from './pages/Users';
// import Home from './pages/Home';
// import Projects from './pages/Projects';
// import Salaries from './pages/Salaries';
// import About from './pages/About';

injectTapEventPlugin();


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDrawerOpen: false,
          anchor: 'left',
          mobileOpen: false
        }
    }
    handleToggle = () => this.setState({isDrawerOpen: true});
    closeDrawer = () => this.setState({ isDrawerOpen: false });

    handleChange = event => {
      this.setState({
        anchor: event.target.value,
      });
    };

    handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    };
  
    render() {
      const { classes, theme } = this.props;
      const { anchor } = this.state;

      const drawer = (
        <Hidden smDown implementation="css">
          <div>
            <div className={classes.drawerHeader} />
              <Drawer
                type="permanent"
                className={classes.drawerHeader}
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor={anchor}
              >
                <Divider />
                <ListItem button component="a" href="users">
                  <ListItemText primary="Uzytkownicy" />
                </ListItem>
                <ListItem button component="a" href="projects">
                  <ListItemText primary="Projekty" />
                </ListItem>
                <ListItem button component="a" href="salaries">
                  <ListItemText primary="Wypłaty" />
                </ListItem>
              </Drawer>
            </div>
        </Hidden>
      );
  
      return (
        <div>
          <div className={classes.appFrame}>
            <AppBar title={<img src="https://unsplash.it/40/40"/>} className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
              <Toolbar>
                <Typography type="title" color="inherit" noWrap>
                  Surprise.Design
                </Typography>
              </Toolbar>
            </AppBar>

            {drawer}
            
            <Router>
              <div style={{marginTop:'70px', width:'2000px'}}>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={GetProjects} />
                {/* <Route path="/users" component={Users} /> */}
                {/* <Route path="/addUsers" component={AddUsers} />
                <Route path="/addSalaries" component={AddSalaries} />
                <Route path="/addProjects" component={AddProjects} />
                <Route path="/projects" component={GetProjects} />
                <Route path="/salaries" component={Salaries} /> */}
              </div>
            </Router>

          </div>
            
        </div>
      );
    }

}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);