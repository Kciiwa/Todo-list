import React, { Component } from 'react'
import propTypes from 'prop-types'
import '../css/new-task-form.css'

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

    const parsedMin = parseInt(min, 10)
    const parsedSec = parseInt(sec, 10)
    if (
      Number.isNaN(parsedMin) ||
      Number.isNaN(parsedSec) ||
      parsedMin < 0 ||
      parsedSec < 0 ||
      parsedSec >= 60
    ) {
      alert('Введите корректное время')
      return
    }

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
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={sec}
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
