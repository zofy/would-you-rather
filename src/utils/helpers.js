export function calcScore(user) {
    return user.questions.length + Object.keys(user.answers).length
}
