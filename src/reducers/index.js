import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authedUser from './authedUser'
import users from './users'
import polls from './polls'

export default combineReducers({
    authedUser: authedUser,
    users: users,
    polls: polls,
    loadingBar: loadingBarReducer,
})