import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

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

class GetProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
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
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.amount}</TableCell>
                  <TableCell>{project.howmany}</TableCell>
                  <TableCell>{project.peoples}</TableCell>
                  <TableCell>{project.salaries}</TableCell>
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