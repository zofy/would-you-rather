import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class AuthRoute extends Route {
    render() {
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        return <this.props.component match={{params: this.props.computedMatch.params}}/>
    }
}

export default connect(({ authedUser }) => ({ authedUser }))(AuthRoute)