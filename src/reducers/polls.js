import { RECEIVE_POLLS, CREATE_POLL, REMOVE_POLL, ADD_VOTE } from '../actions/polls'

export default function polls(state={}, action) {
    switch (action.type) {
        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls,
            }
        case CREATE_POLL:
            return {
                ...state,
                [action.poll.id]: action.poll,
            }
        case REMOVE_POLL:
            return state.filter((poll) => poll.id !== action.poll.id)
        case ADD_VOTE:
            return {
                ...state,
                [action.pollID]: {
                    ...state[action.pollID],
                    [action.option]: {
                        ...state[action.pollID][action.option],
                        votes: state[action.pollID][action.option].votes.concat([action.authedUser]),
                    }
                }
            }
        default:
            return state
    }
}