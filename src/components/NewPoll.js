import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddPoll } from '../actions/polls'

class NewPoll extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const optionOne = e.target.option1.value
        const optionTwo = e.target.option2.value
        this.props.dispatch(handleAddPoll(optionOne, optionTwo))
        e.target.option1.value = ''
        e.target.option2.value = ''
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='hero is-medium'>
                <div className='hero-body has-centered-text'>
                    <div className='columns is-centered'>
                        <div className='column is-5'>
                            <div className='panel'>
                                <div className='panel-heading has-text-centered'>Create New Question</div>
                                <div className='box'>
                                    <div className='block'>
                                        <div className='subtitle'>Complete the question:</div>
                                    </div>
                                    <div className="title level-left is-3">Would you rather ...</div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    name='option1'
                                                    type="text"
                                                    placeholder="Enter Option One Text Here"
                                                />
                                            </div>
                                        </div>
                                        <div className='subtitle has-text-centered'>OR</div>
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    name='option2'
                                                    type="text"
                                                    placeholder="Enter Option Two Text Here"
                                                />
                                            </div>
                                        </div>                                        
                                        <button
                                            className='button is-primary is-fullwidth'
                                            type='submit'>
                                            Submit
                                        </button> 
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(NewPoll))