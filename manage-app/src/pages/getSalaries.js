import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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

class GetSalaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaries: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8030/api/salaries')
      .then( response => response.json())
      .then( data => this.setState({salaries: data}))
  }
  render () {
    const {salaries} = this.state;
      
    return (
      <div>
        <div style = {{marginLeft: '95%', marginBottom: '0.5%'}}>
          <Button fab mini color="primary" aria-label="add" className={styles.button} component={Link} to="/projects/add">
            <AddIcon />
          </Button>
        </div>
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Odbiorca</TableCell>
              <TableCell>Projekt</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((salary, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i+1}</TableCell>
                  <TableCell>{salary.userId.name} {salary.userId.surname}</TableCell>
                  <TableCell>{salary.projectId.name}</TableCell>
                  <TableCell>{salary.value}</TableCell>
                  <TableCell>{salary.date}</TableCell>
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

export default withStyles(styles)(GetSalaries);