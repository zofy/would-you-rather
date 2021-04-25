import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { clearAuthedUser } from '../actions/authedUser'

const Tabs = [
    {route: '/', name: 'Home'},
    {route: '/add', name: 'New Question'},
    {route: '/leaderboard', name: 'Leader Board'},
]

class Nav extends Component {
    logout = (e) => {
        e.preventDefault()
        const { dispatch, history } = this.props
        dispatch(clearAuthedUser())
        history.push('/login')
    }

    render() {
        const { user } = this.props
        const currentURL = this.props.history.location.pathname
        return (
            <div className="hero-head">
                <div className='hero has-text-centered'>
                    <p className="title is-4">React App</p>
                </div>
                <div className="container">
                    <span className="navbar-burger" data-target="navbarMenuHeroA">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                
                    <div id="navbarMenuHeroA">
                        <nav className="tabs is-boxed is-fullwidth">
                            <div className="container">
                                <ul>
                                    {Tabs.map((tab) => (
                                        <li
                                            key={tab.name}
                                            className={(currentURL === tab.route) ? 'is-active' : ''}>
                                            <NavLink to={tab.route} exact activeClassName='is-active'>
                                                {tab.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li>
                                    </li>
                                    <li>
                                        {user && <div className='columns is-vcentered'>
                                                    <span>Hello, {user.name}</span>
                                                    <div className='column'>
                                                        <figure className='image is-48x48 mb-4'>
                                                            <img className='is-rounded' src={user.avatarURL} alt=""/>
                                                        </figure>
                                                    </div>
                                                </div>}
                                    </li>
                                    <li>
                                        {user && <a href="/logout" onClick={this.logout}>Logout</a>}
                                    </li>
                                </ul>
                            </div>
                        </nav>                    
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        user: (authedUser === null ? null : users[authedUser]),
    }
}

export default withRouter(connect(mapStateToProps)(Nav))