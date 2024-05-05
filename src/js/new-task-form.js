import React, { Component } from 'react'
import propTypes from 'prop-types'
import '../css/new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    description: '',
  }

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  onSubmit = (event) => {
    const { addNewTodoItem } = this.props
    const { description } = this.state
    event.preventDefault()
    addNewTodoItem(description)
    this.setState({
      description: '',
    })
  }

  render() {
    const { description } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={description}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addNewTodoItem: propTypes.func.isRequired,
}
