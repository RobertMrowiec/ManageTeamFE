import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Typography from 'material-ui/Typography';
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
  }
});

class GetProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      openDialog: false,
      selectedProject: ''
    }
  }

  deleteFunction (project) {    
    fetch('https://reactmanagebe.herokuapp.com/api/projects/' + project,{
      method: 'delete'
    }).then(() => {
      this.setState({projects: this.state.projects.filter(f => f._id !== project)});
      this.setState({openDialog: false})
    })
  }

  componentDidMount() {
    fetch('https://reactmanagebe.herokuapp.com/api/projects')
      .then( response => response.json())
      .then( data => this.setState({projects: data}))
  }
  handleOpen = (project) => {
    this.setState({ selectedProject: project})
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render () {
    const {projects} = this.state;
    return (
      <div>
        <div style={{marginLeft: '-5%', marginBottom: '-2%'}}>
          <Typography variant = 'headline' align='center'> Projekty: </Typography>
        </div>

        <div style = {{marginLeft: '94%', marginBottom: '0.5%'}}>
          <Button fab mini color="primary" aria-label="add" className={styles.button} component={Link} to="/addProjects">
            <AddIcon />
          </Button>
        </div>
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Ile pozostało</TableCell>
              <TableCell>Ilość programistów</TableCell>
              <TableCell>Ilość wypłat</TableCell>
              <TableCell>Edycja</TableCell>
              <TableCell>Usuwanie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{project.name}</TableCell> 
                  <TableCell>{project.amount.toFixed(2)} zł</TableCell>
                  <TableCell>{project.howmany.toFixed(2)} zł</TableCell>
                  <TableCell>{project.peoples}</TableCell>
                  <TableCell>{project.salaries}</TableCell>
                  <TableCell>

                    {/* edycja */}
                    <Button size='small' color="primary" aria-label="edit" style={{width:'35px', height:'23px'}} href={'/editProjects/' +`${project._id}`}>
                      <ModeEditIcon />
                    </Button>

                  </TableCell>
                  <TableCell>
                    
                    {/* usuwanie  */}
                    <Button size='small' color="secondary" aria-label="delete" style={{width:'35px', height:'23px'}} onClick={() => this.handleOpen(project._id)}>
                      <DeleteIcon />
                    </Button>

                  </TableCell>

                  <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                  >
                    <DialogTitle>{"Czy na pewno chcesz usunąć ten projekt?"}</DialogTitle>
                    <DialogActions>
                      <Button onClick={() => this.handleClose()} color="primary">
                        Anuluj
                      </Button>
                      <Button onClick={() => this.deleteFunction(this.state.selectedProject)}
                        color="secondary" autoFocus>
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

export default withStyles(styles)(GetProjects);