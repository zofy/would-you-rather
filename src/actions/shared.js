import { receiveUsers, addAnswer } from './users'
import { getInitialData, submitAnswer } from '../utils/api'
import { receivePolls, addVote } from './polls'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
    return async (dispatch) => {
        dispatch(showLoading())
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receivePolls(questions))
        dispatch(hideLoading())
    }
}

export function handleAnswerSubmit(pollID, option) {
    return async (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        submitAnswer({authedUser, pollID, option})
            .catch((_) => {
                alert('Error occurred, please try again!')
                dispatch(hideLoading())
            })
            .then((_) => {
                dispatch(addAnswer(authedUser, pollID, option))
                dispatch(addVote(authedUser, pollID, option))
                dispatch(hideLoading())
            })
    }
}