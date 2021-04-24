import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg';
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        selectedUser: null,
    }

    setUser = (user) => {
        this.setState({
            selectedUser: user,
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        if (e.target.users.value === "") { return }
        this.props.dispatch(setAuthedUser(e.target.users.value))
        this.props.history.push('/')
    }

    render() {
        const { users } = this.props
        return (
            <div className="hero">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className='columns is-centered'>
                            <div className="column is-4">
                                <h3 className="title has-text">Welcome to the Would You Rather App!</h3>
                                <hr className="login-hr"/>
                                <p className="subtitle has-text">Please sign in to continue</p>
                                <div className="box">
                                    <img src={logo} className="App-logo" alt="logo" />
                                    <p className="title has-text-primary">Sign In</p>
                                    <form onSubmit={this.handleLogin}>
                                        <div className="field">
                                            <div className="control">
                                                <div className='select is-primary is-fullwidth'>
                                                    <select id='users' name='users' onChange={(e) => this.setUser(e.target.value)}>
                                                        <option hidden value="">Choose User</option>
                                                        {Object.values(users).map((u) => (
                                                            <option key={u.id} value={u.id}>
                                                                {u.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className='button is-primary is-fullwidth'
                                            disabled={this.state.selectedUser === null}
                                        >Sign in</button>
                                    </form>                                
                                </div>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({users}) => ({users}))(Login)