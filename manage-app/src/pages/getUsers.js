import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  button: {
    marginRight: theme.spacing.unit
  },
  buttonEdit: {
    width: '30px',
    height: 30
  }
});

class GetUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      openDialog: false
    }
  }

  deleteFunction (user, e) {
    fetch('http://localhost:8030/api/users/' + user._id,{
      method: 'delete'
    }).then(() => {
      this.setState({users: this.state.users.filter(f => f._id !== user._id)});
      this.setState({openDialog: false})
    })
  }

  componentDidMount() {
    fetch('http://localhost:8030/api/users')
      .then( response => response.json())
      .then( data => this.setState({users: data}))
  }
  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render () {
    const {users} = this.state;
      
    return (
      <div>
        <div style = {{marginLeft: '95%', marginBottom: '0.5%'}}>
          <Button fab mini color="primary" aria-label="add" className={styles.button} component={Link} to="/addUsers">
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
              <TableCell>Edycja</TableCell>
              <TableCell>Usuwanie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{user.name}</TableCell> 
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.projects.length}</TableCell>
                  <TableCell>

                    {/* edycja */}
                    <Button fab mini color="primary" aria-label="add" style={{width:'35px', height:'23px'}} href={'/editUsers/' +`${user._id}`}>
                      <ModeEditIcon style = {{width:'60%', height:'60%'}}/>
                    </Button>

                  </TableCell>
                  <TableCell>

                    {/* usuwanie  */}
                    <Button fab mini color="accent" aria-label="add" style={{width:'35px', height:'23px'}} onClick={this.handleOpen} >
                      <DeleteIcon style = {{width:'60%', height:'60%'}}/>
                    </Button>

                  </TableCell>

                  <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                  >
                  <DialogTitle>{"Czy na pewno chcesz usunąć tego uzytkownika?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Anuluj
                    </Button>
                    <Button onClick={(e) => this.deleteFunction(user, e)} color="accent" autoFocus>
                      Usuń
                    </Button>
                  </DialogActions>
                </Dialog>


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