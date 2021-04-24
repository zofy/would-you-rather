import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calcScore } from '../utils/helpers'

class LeaderBoard extends Component {
    render () {
        return (
            <div className='hero-body'>
                <div className='container has-text-centered'>
                    <div className='column is-7 is-offset-3'>
                        <ul>
                            {this.props.users.map((user) => (
                                <div key={user.id} className='box'>
                                    <div className='columns is-vcentered is-centered has-text-centered'>
                                        <div>
                                            <div className='column is-2'>
                                                <figure className="image is-64x64">
                                                    <img src={user.avatarURL} alt=""/>
                                                </figure>
                                            </div>
                                        </div>

                                        <div className='column mt-3'>
                                            <div className="message-body">
                                                <div className="block level-left">
                                                    <div className='title is-5 level-left'>
                                                        {user.name}
                                                    </div>
                                                </div>
                                                <div className='columns'>
                                                    <div className='column'>
                                                        <div className='block level-left'>
                                                            <div className='subtitle'>
                                                                Answered questions
                                                            </div>
                                                        </div>
                                                        <div className='block level-left'>
                                                            <div className='subtitle'>
                                                                Created questions
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='column is-1'>
                                                        <div className='block level-right'>
                                                            <div className='subtitle'>
                                                                {Object.keys(user.answers).length}
                                                            </div>
                                                        </div>
                                                        <div className='block level-right'>
                                                            <div className='subtitle'>
                                                                {user.questions.length}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className='column is-3 mt-2'>
                                            <div className="message-body is-centered">
                                                <div className='panel'>
                                                    <div className='panel-heading'>Score</div>
                                                    <div className='level-item has-text-centered'>
                                                        <div className='panel-block'>
                                                            <span className="tag is-large is-rounded is-primary is-active">
                                                                {Object.keys(user.answers).length + user.questions.length}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const usersList = Object.values(users)
    return {
        users: usersList.sort((a, b) => calcScore(b) - calcScore(a))
    }
}

export default connect(mapStateToProps)(LeaderBoard)