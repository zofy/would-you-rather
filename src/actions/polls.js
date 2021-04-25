import { saveQuestion } from '../utils/api'
import { addPoll } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const CREATE_POLL = 'CREATE_POLL'
export const REMOVE_POLL = 'REMOVE_POLL'
export const ADD_VOTE = 'ADD_VOTE'

export function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}

export function createPoll(poll) {
    return {
        type: CREATE_POLL,
        poll,
    }
}

export function removePoll(poll) {
    return {
        type: REMOVE_POLL,
        poll,
    }
}

export function addVote(authedUser, pollID, option) {
    return {
        type: ADD_VOTE,
        authedUser,
        pollID,
        option,
    }
}

export function handleAddPoll(optionOne, optionTwo) {
    return async (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        saveQuestion({
            authedUser,
            optionOne,
            optionTwo,
        })
        .catch((_) => {
            alert('Something went terribly wrong! Please try again.')
            dispatch(hideLoading())
        }).then((poll) => {
            dispatch(createPoll(poll))
            dispatch(addPoll(poll))
            dispatch(hideLoading())
        })
    }
}