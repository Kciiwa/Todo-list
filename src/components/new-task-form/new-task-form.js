import React, { Component } from 'react'
import propTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    description: '',
    min: '',
    sec: '',
  }

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  onMinChange = (event) => {
    this.setState({
      min: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      sec: event.target.value,
    })
  }

  onSubmit = (event) => {
    const { addNewTodoItem } = this.props
    const { description, min, sec } = this.state
    event.preventDefault()

    addNewTodoItem(description, min, sec)
    this.setState({
      description: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { description, min, sec } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={description}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          value={min}
          type="number"
          min={0}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={sec}
          type="number"
          min={0}
          required
        />
        <button type="submit" />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addNewTodoItem: propTypes.func.isRequired,
}
