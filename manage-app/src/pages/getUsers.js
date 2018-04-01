import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import { Redirect } from 'react-router-dom';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';  
import Typography from 'material-ui/Typography';

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
      openDialog: false,
      selectedUser: '',
      userId: ''
    }
  }

  deleteFunction (user, e) {
    fetch('https://reactmanagebe.herokuapp.com/api/users/' + user,{
      method: 'delete'
    }).then(() => {
      this.setState({users: this.state.users.filter(f => f._id !== user)});
      this.setState({openDialog: false})
    })
  }

  redirectFunction (user) {
    this.setState({userId: user._id})
    this.setState({redirect: true})
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/users')
      .then( response => response.json())
      .then( data => this.setState({users: data}))
  }
  handleOpen = (user) => {
    this.setState({ selectedUser: user})
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render () {
    
    const { users } = this.state;
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={{pathname: '/userInfo/' + `${this.state.userId}` }}/>
      )
    }

    return (
      <div>
        <div style={{marginLeft: '-5%', marginBottom: '-2%'}}>
          <Typography variant = 'headline' align='center'> Programiści: </Typography>
        </div>

        <div style = {{marginLeft: '94%', marginBottom: '0.5%'}}>
          <Button size='small' color="primary" aria-label="add" className={styles.button} component={Link} to="/addUsers">
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
                  <TableCell onClick={ () => this.redirectFunction(user)} >{user.name}</TableCell> 
                  <TableCell onClick={ () => this.redirectFunction(user)} >{user.surname}</TableCell>
                  <TableCell onClick={ () => this.redirectFunction(user)} >{user.email}</TableCell>
                  <TableCell onClick={ () => this.redirectFunction(user)} >{user.projects.length}</TableCell>
                  <TableCell>

                    {/* edycja */}
                    <Button size='small' color="primary" aria-label="add" style={{width:'35px', height:'23px'}} href={'/editUsers/' +`${user._id}`} >
                      <ModeEditIcon />
                    </Button>

                  </TableCell>
                  <TableCell>

                    {/* usuwanie  */}
                    <Button size='small' color="secondary" aria-label="add" style={{width:'35px', height:'23px'}} onClick={() => this.handleOpen(user._id)}>
                      <DeleteIcon />
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
                    <Button onClick={() => this.deleteFunction(this.state.selectedUser)} color="secondary" autoFocus>
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