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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  buttonEdit: {
    width: '30px',
    height: 30
  }
});

// let deleteFunction = (project, e) => {
//   console.log(project._id);
//   fetch('http://localhost:8030/api/projects/' + project._id,{
//     method: 'delete'
//   }).then(() => {
//     this.state.projects = this.state.projects.filter(f => f._id !== project._id)
//   })
// }

class GetProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  deleteFunction (project, e) {
    console.log(project._id);
    fetch('http://localhost:8030/api/projects/' + project._id,{
      method: 'delete'
    }).then(() => {
      this.state.projects = this.state.projects.filter(f => f._id !== project._id)
      console.log(this.state.projects);
      
    })
  }

  componentDidMount() {
    fetch('http://localhost:8030/api/projects')
      .then( response => response.json())
      .then( data => this.setState({projects: data}))
  }
  render () {
    const {projects} = this.state;
      
    return (
      <div>
        <div style = {{marginLeft: '95%', marginBottom: '0.5%'}}>
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
                  <TableCell>{project.amount}</TableCell>
                  <TableCell>{project.howmany}</TableCell>
                  <TableCell>{project.peoples}</TableCell>
                  <TableCell>{project.salaries}</TableCell>
                  <TableCell>
                    {/* edycja */}

                    <Button fab mini color="primary" aria-label="add" style={{width:'35px', height:'23px'}} component={Link} to="/addProjects">
                      <ModeEditIcon style = {{width:'60%', height:'60%'}}/>
                    </Button>

                  </TableCell>
                  <TableCell>
                    {/* usuwanie  */}

                    <Button fab mini color="primary" aria-label="add" style={{width:'35px', height:'23px'}} onClick={(e) => this.deleteFunction(project, e)}>
                      <DeleteIcon style = {{width:'60%', height:'60%'}}/>
                    </Button>

                  </TableCell>
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