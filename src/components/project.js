import React from 'react'
const Project = props => (
  <div className="project-container">
    <h2>{props.name}</h2>
    <h3 className="project-header">Project Brief</h3>
    <p>{props.brief}</p>
    <h3 className="project-header">Technologies Used</h3>
    <p>{props.technologies}</p>
    <a className="pure-button project-button" href={props.githubURL}>
      View Github Repo
    </a>
  </div>
);

export default Project;
