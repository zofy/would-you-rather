export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_POLL = 'ADD_POLL'
export const DROP_POLL = 'DROP_POLL'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users: users,
    }
}

export function addPoll(poll) {
    return {
        type: ADD_POLL,
        poll,
    }
}

export function dropPoll(poll) {
    return {
        type: DROP_POLL,
        poll,
    }
}

export function addAnswer(authedUser, pollID, option) {
    return {
        type: ADD_ANSWER,
        authedUser,
        pollID,
        option,
    }
}