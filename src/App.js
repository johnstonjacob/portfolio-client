import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Project from './components/project';
import ErrorPage from './components/errorPage';

import getAllProjects from './services/getAllProjects';

import './index.css';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      error: false,
    };
  }

  componentDidMount() {
    getAllProjects()
      .then(res => (res.ok ? { projects: res.data} : { error: true }))
      .then(state => this.setState(state));
  }

  render() {
    return (
      <div>
        <div id="layout">
          <div id="main">
            <Header />
            {this.state.error ? (
              <ErrorPage />
            ) : (
              <div className="content">
                {this.state.projects.map(e => (
                  <Project
                    name={e.project}
                    brief={e.brief}
                    technologies={e.technologies}
                    githubURL={e.githubURL}
                    key={e.project}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="pure-menu pure-menu-horizontal">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Index;
