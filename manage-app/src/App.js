import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
});

class Index extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;

    return (
        <List>
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
        </List>
      <div className={classes.root}>
        <Typography type="display1" gutterBottom>
          Material-UI
        </Typography>
        <Typography type="subheading" gutterBottom>
          example project
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
