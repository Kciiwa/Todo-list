import React, { Component } from 'react'
import propTypes from 'prop-types'
import './task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: '',
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
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

  onEscDown = (event) => {
    if (event.keyCode === 27) {
      this.setState({ editing: false })
    }
  }

  handleDocumentClick = (event) => {
    const editInput = document.querySelector('.edit')
    if (editInput && !editInput.contains(event.target)) {
      this.setState({ editing: false })
    }
  }

  render() {
    const {
      description,
      deleteItem,
      onToggleDone,
      createdTimeAgo,
      id,
      timer,
      startTimer,
      stopTimer,
    } = this.props
    const { value } = this.state
    const taskStatus = this.getTaskStatus()

    return (
      <li className={taskStatus} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label htmlFor="btn">
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={startTimer} />
              <button className="icon icon-pause" type="button" onClick={stopTimer} />
              {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
            </span>
            <span className="description">{createdTimeAgo}</span>
          </label>
          <button
            id="btn"
            type="button"
            className="icon icon-edit"
            onClick={(event) => {
              event.stopPropagation()
              this.setState((prevState) => ({
                editing: !prevState.editing,
                value: description,
              }))
            }}
          />

          <button type="button" className="icon icon-destroy" onClick={deleteItem} />
        </div>

        {taskStatus === 'editing' && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="edit"
              onChange={this.handleChange}
              value={value}
              onKeyDown={this.onEscDown}
              // onClick={this.onWindowClick}
            />
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
