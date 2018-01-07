import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

const Home = () => {
  return (
    <MuiThemeProvider>
      <List>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent mail"  />
            <ListItem primaryText="Drafts"  />
            <ListItem primaryText="Inbox" />
        </List>
    <div>
      <h1> Home Page!</h1>
    </div>
    </MuiThemeProvider>
  )
}

export default Home;
