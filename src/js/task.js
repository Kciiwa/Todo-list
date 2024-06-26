import React, { Component } from 'react'
import propTypes from 'prop-types'
import '../css/task.css'

export default class Task extends Component {
  state = {
    editing: false,
    value: '',
  }

  getTaskStatus = () => {
    const { completed } = this.props
    const { editing } = this.state
    let str
    if (completed) {
      str = 'completed'
    } else if (editing) {
      str = 'editing'
    } else {
      str = null
    }
    return str
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { onEdit } = this.props
    const { value } = this.state
    onEdit(value)
    this.setState({ value: '', editing: false })
  }

  render() {
    const { description, deleteItem, onToggleDone, createdTimeAgo, id } = this.props
    const { value } = this.state
    const taskStatus = this.getTaskStatus()

    return (
      <li className={taskStatus} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label htmlFor="btn">
            <span className="description">{description}</span>
            <span className="created">{createdTimeAgo}</span>
          </label>
          <button
            id="btn"
            type="button"
            className="icon icon-edit"
            onClick={() => this.setState((prevState) => ({
              editing: !prevState.editing,
              value: description,
            }))}
          />

          <button type="button" className="icon icon-destroy" onClick={deleteItem} />
        </div>

        {taskStatus === 'editing' && (
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" onChange={this.handleChange} value={value} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  completed: false,
  description: '',
  createdTimeAgo: 'some time ago',
}

Task.propTypes = {
  completed: propTypes.bool,
  description: propTypes.string,
  deleteItem: propTypes.func.isRequired,
  onToggleDone: propTypes.func.isRequired,
  onEdit: propTypes.func.isRequired,
  createdTimeAgo: propTypes.string,
}
