import React, { Component } from 'react'
import Header from '../components/header'
import HeadCom from '../components/head'
import Footer from '../components/footer'
import Project from '../components/project'

import getAllProjects from '../services/getAllProjects'

import "../styles/stylesheet.css"

class Index extends Component{
    constructor() {
        super()
        this.state = {
            projects: [],
        }
    }

    componentDidMount() {
        getAllProjects().then((projects) => this.setState({projects}))
    }

    render() {
        return (
        <div>
            <div id="layout" >
                <div id="main">
                    <HeadCom />
                    <Header />
                    <div className="content">
                        {this.state.projects.map((e) => 
                            <Project 
                                name={e.name}
                                brief={e.brief}
                                technologies={e.technologies}
                                githubURL={e.githubURL}
                                key={e.name}
                            /> )}
                    </div>
                </div>
            </div>
            <div className="pure-menu pure-menu-horizontal">
                <Footer />
            </div>
        </div>
    )
    }
}

export default Index
