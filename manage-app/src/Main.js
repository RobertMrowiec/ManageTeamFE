import React, {Component} from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'; 
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ListItem, ListItemText } from 'material-ui/List';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';  


import GetProjects from './pages/getProjects';
import AddProjects from './pages/AddProjects';
import EditProjects from './pages/EditProjects';
import GetUsers from './pages/getUsers';
import GetUserInfo from './pages/getUserInfo';
import AddUsers from './pages/AddUsers';
import EditUsers from './pages/EditUsers';
import Home from './pages/Home';
import GetSalaries from './pages/getSalaries';
import AddSalaries from './pages/AddSalaries';
import EditSalaries from './pages/EditSalaries';

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
  list: {
    width: 250,
  },
  menuButton: {
    marginLeft: '-10px'
  }
});

injectTapEventPlugin();

const sideList = (
  <div className={styles.list}>
    <ListItem button component="a" href="/users">
      <ListItemText primary="Uzytkownicy" />
    </ListItem>
    <ListItem button component="a" href="/projects">
      <ListItemText primary="Projekty" />
    </ListItem>
    <ListItem button component="a" href="/salaries">
      <ListItemText primary="Wypłaty" />
    </ListItem>
  </div>
)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDrawerOpen: false,
          anchor: 'left',
          mobileOpen: false,
          left: false
        }
    }
    toggleDrawer = (open) => () => {
      this.setState({
        left: open,
      });
    };
  
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
  
    log = () => {
      console.log('asd');
    }
    render() {
      const { classes, theme } = this.props;
      const { anchor } = this.state;

      const drawer = (
          <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
              style={{width:'155px'}}
            >
            {sideList}
            </div>
          </Drawer>
      )
  
      return (
        <div>
          <div className={classes.appFrame}>
            <AppBar title={<img src="https://unsplash.it/40/40"/>} className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
              <Toolbar>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  className = {classNames(styles.menuButton)}
                  onClick = {this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  Surprise.Design
                </Typography>
              </Toolbar>
            </AppBar>
            {drawer}
            <Router>
              <div style={{marginTop:'5%', width:'100%', marginLeft:'0.9%', marginRight:'0.9%'}}>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={GetProjects} />
                <Route path="/addProjects" component={AddProjects} />
                <Route path="/editProjects/:id" component={EditProjects} />
                <Route path="/users" component={GetUsers} />
                <Route path="/userInfo/:id" component={GetUserInfo} />
                <Route path="/addUsers" component={AddUsers} />
                <Route path="/editUsers/:id" component={EditUsers} />
                <Route path="/salaries" component={GetSalaries} />
                <Route path="/addSalaries" component={AddSalaries} />
                <Route path="/editSalaries/:id" component={EditSalaries} />

                {/* <Route path="/salaries/add" component={AddSalaries} /> */}
                {/* <Route path="/users/add" component={AddUsers} /> */}
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