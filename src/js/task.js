import React, { Component } from 'react'
import propTypes from 'prop-types'
import '../css/task.css'

export default class Task extends Component {
  state = {
    editing: false,
    value: '',
  }
  getTaskStatus = () => {
    return this.props.completed ? 'completed' : this.state.editing ? 'editing' : null
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onEdit(this.state.value)
    this.setState({ value: '', editing: false })
  }

  render() {
    const { description, deleteItem, onToggleDone, createdTimeAgo } = this.props
    let taskStatus = this.getTaskStatus()

    return (
      <li className={taskStatus} key={this.props.id}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{description}</span>
            <span className="created">{createdTimeAgo}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState((prevState) => ({
                editing: !prevState.editing,
                value: this.props.description,
              }))
            }
          ></button>

          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>

        {taskStatus === 'editing' && (
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" onChange={this.handleChange} value={this.state.value} autoFocus />
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
