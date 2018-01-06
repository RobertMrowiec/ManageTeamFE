import React, {Component} from 'react';

class Projects extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
    }
  }

    componentDidMount() {
      fetch('http://localhost:8030/api/projects')
        .then( response => response.json())
        .then( data => this.setState({projects: data}))
    }
    
    render(){
      const {projects} = this.state;

      return (
        <div>
          {projects.map(project =>
            <div key={project.name}>
              <p> {project.name} </p>
              <div key={project.value}>
                <p> {project.value}</p>
              </div>
            </div>
          )}
        </div>
      )
    }
  }

export default Projects;
