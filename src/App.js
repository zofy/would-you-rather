import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import './App.css';
import AuthRoute from './components/AuthRoute'
import LeaderBoard from './components/LeaderBoard'
import Dashboard from './components/Dashboard'
import Poll from './components/Poll'
import NewPoll from './components/NewPoll'
import Login from './components/Login'
import Nav from './components/Nav'
import NotFound from './components/NotFound';
import { handleInitialData } from './actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render () {
    return (
      <Router>
          <Fragment>
            <LoadingBar />
            <Switch>
              <Route exact path='/login' component={Login} />
              <AuthRoute exact path='/404' component={NotFound}/>
              <Route>
                <div className='container'>
                  {this.props.loading === true
                    ? null
                    : (<div>
                        <Nav />
                        <Switch>
                          <AuthRoute exact path='/' component={Dashboard} />
                          <AuthRoute exact path='/add' component={NewPoll}/>
                          <AuthRoute exact path='/leaderboard' component={LeaderBoard} />
                          <AuthRoute path='/questions/:id' component={Poll}/>
                          <Redirect to='/404'/>
                        </Switch>
                    </div>)}
                  </div>
                </Route>
              </Switch>
            </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar.default === 1,
  }
}

export default connect(mapStateToProps, {handleInitialData})(App);
