import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerSubmit } from '../actions/shared'

function PollForm(props) {
    const {submitCB, poll} = props
    return (
        <form onSubmit={submitCB}>
            <div className="block">
                <label className="panel-block">
                    <input className='mx-2' type="radio" name="option" defaultChecked/>
                    {poll.optionOne.text}
                </label>
                <label className="panel-block">
                    <input className='mx-2' type="radio" name="option"/>
                    {poll.optionTwo.text}
                </label>
            </div>
            <input
                type='submit'
                className="button is-success is-fullwidth"
                defaultValue='Submit'/>
        </form>        
    )
}

function Option(props) {
    const {text, votes, allVotes, votedFor } = props
    const percentage = Math.round((votes / allVotes + Number.EPSILON) * 100)
    return (
        <div className={`box ${(votedFor === true) ? 'has-background-primary-light' : ''}`}>
            <div className='field has-text-centered'>
                <label className={`label ${(votedFor === true) ? 'has-text-primary-dark' : ''}`}>
                    Would you rather {text}?
                </label>
                <progress className='progress' value={votes} max={allVotes}></progress>
                <label className='label'>{votes} out of {allVotes} votes ({percentage}%)</label>
            </div>
        </div>
    )
}

function PollResults(props) {
    const { poll, votedFor } = props
    const o1 = poll.optionOne.votes.length
    const o2 = poll.optionTwo.votes.length
    const votes = o1 + o2
    return (
        <div className='block'>
            <Option
                text={poll.optionOne.text}
                votes={o1}
                allVotes={votes}
                votedFor={votedFor === 'optionOne'} />
            <Option
                text={poll.optionTwo.text}
                votes={o2}
                allVotes={votes}
                votedFor={votedFor === 'optionTwo'} />
        </div>
    )
}

class Poll extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, poll } = this.props
        const option = (e.target.option[0].checked) ? 'optionOne' : 'optionTwo'
        dispatch(handleAnswerSubmit(poll.id, option))
    }

    render() {
        const { user, author, poll, answered } = this.props
        return (
            <div className='hero-body'>
                <div className='container has-text-centered'>
                    <div className='column is-6 is-offset-3'>
                        <div className='panel-heading is-4'>
                            {(answered === true) ? `Asked by ${author.name}` : `${author.name} asks`}
                        </div>
                        <div className='box'>
                            <div className='columns is-vcentered is-centered'>
                                <div>
                                    <div className='column is-3'>
                                        <figure className="image is-128x128 is-vcentered">
                                            <img src={author.avatarURL} alt=""/>
                                        </figure>
                                    </div>
                                </div>

                                <div className='column'>
                                    <div className='message-body'>
                                        <div className="block level-left">
                                            <div className='title level-left'>
                                                {(answered === true) ? 'Results:' : 'Would You Rather ...'}
                                            </div>
                                        </div>
                                        {(answered === true)
                                            ? <PollResults poll={poll} votedFor={user.answers[poll.id]}/>
                                            : <PollForm submitCB={this.handleSubmit} poll={poll}/>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, polls}, props) {
    const { id } = props.match.params
    const user = users[authedUser]
    const poll = polls[id]
    const author = users[poll.author]
    const answered = user.answers[poll.id] !== undefined
    return {
        user,
        author,
        poll,
        answered,
    }
}

export default connect(mapStateToProps)(Poll)