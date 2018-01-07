import React from 'react';
import { withStyles } from 'material-ui/styles';
import {List, ListItem} from 'material-ui/List';

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
});

class Index extends React.Component {
  render() {
    return (
        <List>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent mail"  />
            <ListItem primaryText="Drafts"  />
            <ListItem primaryText="Inbox" />
        </List>
    )
  }
}

export default withStyles(styles)(Index);
