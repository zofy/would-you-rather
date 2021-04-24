import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA'

export async function getInitialData() {
    const [users, questions] = await Promise.all([_getUsers(), _getQuestions()])
    return {
        users,
        questions,
    }
}

export async function saveQuestion({ authedUser, optionOne, optionTwo }) {
    return _saveQuestion({
        author: authedUser,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
    })
}

export async function submitAnswer({ authedUser, pollID, option }) {
    return _saveQuestionAnswer({
        authedUser: authedUser,
        qid: pollID,
        answer: option,
    })
}