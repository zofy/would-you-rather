import { RECEIVE_USERS, ADD_POLL, DROP_POLL, ADD_ANSWER } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_POLL:
            return {
                ...state,
                [action.poll.author]: {
                    ...state[action.poll.author],
                    questions: state[action.poll.author].questions.concat(action.poll.id),
                }
            }
        case DROP_POLL:
            return {
                ...state,
                [action.poll.author]: {
                    ...state[action.poll.author],
                    questions: state[action.poll.author].questions.filter((qid) => qid !== action.poll.id),
                    answers: Object.keys(state[action.poll.author].answers)
                                .filter(qid => qid !== action.poll.id)
                                .reduce((obj, qid) => {
                                    obj[qid] = state[action.poll.author].answers[qid];
                                    return obj;
                                }, {}),
                }
            }
        case ADD_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.pollID]: action.option,
                    }
                }
            }
        default:
            return state
    }
}