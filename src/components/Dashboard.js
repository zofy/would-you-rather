import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ANSWERED = 'answered'
const UNANSWERED = 'unanswered'

function PollsList(props) {
    const { user, polls, users } = props
    return (
        <ul>
            {polls.map((p) => (
                <li key={p.id}>
                    <div className='box'>
                            <div className='panel-heading level-left'>
                                {(user === p.author) ? "You ask" : `${users[p.author].name} asks` }
                            </div>
                            <div className='box'>
                                <div className='columns is-vcentered is-centered'>
                                    <div>
                                        <div className='column is-3'>
                                            <figure className="image is-64x64">
                                                <img src={users[p.author].avatarURL} alt=""/>
                                            </figure>
                                        </div>
                                    </div>

                                    <div className='column mt-3'>
                                        <div className="message-body">
                                            <div className="block level-left">
                                                <div className='title is-5 level-left'>Would you rather</div>
                                            </div>
                                            <div className='block'>
                                                ...{p.optionOne.text.substring(0, 20)}...
                                            </div>
                                            <Link
                                                className='button is-success is-outlined is-fullwidth'
                                                to={`/poll/${p.id}`}>
                                                View Poll
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

class Dashboard extends Component {
    state = {
        category: UNANSWERED,
    }

    setCategory = (category) => {
        this.setState({category})
    }

    render() {
        const { authedUser, users, answered, unAnswered } = this.props
        return (
            <div className='hero-body'>
                <div className='container has-text-centered'>
                    <div className='column is-6 is-offset-3'>
                        <div className='tabs is-centered is-toggle is-boxed is-fullwidth'>
                            <ul>
                                <li className={(this.state.category === UNANSWERED) ? 'is-active' : ''}>
                                    <a onClick={() => this.setCategory(UNANSWERED)}>
                                        Unanswered Questions
                                    </a>
                                </li>
                                <li className={(this.state.category === ANSWERED) ? 'is-active' : ''}>
                                    <a onClick={() => this.setCategory(ANSWERED)}>
                                        Answered Questions
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <PollsList user={authedUser} users={users}
                            polls={(this.state.category === ANSWERED)
                            ? answered : unAnswered
                        }/>
                    </div>
                </div>
            </div>
        )
    } 
}

function mapStateToProps({ authedUser, users, polls }) {
    const user = users[authedUser]
    const answered = Object.keys(user.answers)
                        .map((pollID) => polls[pollID])
                        .sort((a, b) => b.timestamp - a.timestamp)
    const unAnswered = Object.values(polls)
                        .filter((poll) => user.answers[poll.id] === undefined)
                        .sort((a, b) => b.timestamp - a.timestamp)
    return {
        authedUser,
        users,
        answered,
        unAnswered,
    }
}

export default connect(mapStateToProps)(Dashboard)