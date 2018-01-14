import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class GetUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8030/api/users')
      .then( response => response.json())
      .then( data => this.setState({users: data}))
  }
  render () {
    const {users} = this.state;
      
    return (
      <div>
        <div style = {{marginLeft: '95%', marginBottom: '0.5%'}}>
          <Button fab mini color="primary" aria-label="add" className={styles.button}>
            <AddIcon />
          </Button>
        </div>
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imie</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ilość projektów</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i+1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.projects.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(GetUsers);