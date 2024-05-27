import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import propTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: {},
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if (prevProps.data !== data) {
      this.setupTimers()
    }
  }

  componentWillUnmount() {
    this.clearTimers()
  }

  setupTimers() {
    const { data } = this.props
    const { timers } = this.state
    data.forEach((item) => {
      if (!timers[item.id]) {
        const intervalId = setInterval(() => this.updateTimer(item.id), 1000)
        this.setState((prevState) => ({
          timers: {
            ...prevState.timers,
            [item.id]: {
              time: item.time || 0,
              intervalId,
            },
          },
        }))
      }
    })
  }

  updateTimer = (taskId) => {
    this.setState((prevState) => {
      const currentTime = prevState.timers[taskId].time
      if (currentTime > 0) {
        return {
          timers: {
            ...prevState.timers,
            [taskId]: {
              ...prevState.timers[taskId],
              time: currentTime - 1,
            },
          },
        }
      }
      clearInterval(prevState.timers[taskId].intervalId)
      return {
        timers: {
          ...prevState.timers,
          [taskId]: {
            ...prevState.timers[taskId],
            intervalId: null,
          },
        },
      }
    })
  }

  startTimer = (taskId) => {
    const { data } = this.props
    this.setState((prevState) => {
      const timers = { ...prevState.timers }
      if (!timers[taskId]) {
        timers[taskId] = {
          time: data.find((task) => task.id === taskId).time || 0,
          intervalId: null,
        }
      }
      if (!timers[taskId].intervalId) {
        const intervalId = setInterval(() => this.updateTimer(taskId), 1000)
        timers[taskId].intervalId = intervalId
      }
      return { timers }
    })
  }

  stopTimer = (taskId) => {
    this.setState((prevState) => {
      const timers = { ...prevState.timers }
      if (timers[taskId] && timers[taskId].intervalId) {
        clearInterval(timers[taskId].intervalId)
        timers[taskId].intervalId = null
      }
      return { timers }
    })
  }

  onEditTask = (id, description) => {
    const { onEdit } = this.props
    onEdit(id, description)
  }

  clearTimers() {
    const { timers } = this.state
    Object.values(timers).forEach((timer) => {
      clearInterval(timer.intervalId)
    })
  }

  render() {
    const { data, deleteItem, onToggleDone, filter } = this.props
    const { timers } = this.state

    let filteredData = data

    if (filter === 'active') {
      filteredData = data.filter((item) => !item.completed)
    } else if (filter === 'completed') {
      filteredData = data.filter((item) => item.completed)
    }

    const elements = filteredData.map((item) => {
      const createdTimeAgo = formatDistanceToNow(item.timeOfCreation, {
        includeSeconds: true,
        addSuffix: true,
      })
      return (
        <Task
          key={item.id}
          id={item.id}
          completed={item.completed}
          editing={item.editing}
          description={item.description}
          timer={timers[item.id] ? timers[item.id].time : item.time}
          startTimer={() => this.startTimer(item.id)}
          stopTimer={() => this.stopTimer(item.id)}
          deleteItem={() => deleteItem(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onEdit={(value) => this.onEditTask(item.id, value)}
          createdTimeAgo={createdTimeAgo}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}

TaskList.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      editing: propTypes.bool.isRequired,
      description: propTypes.string.isRequired,
      timeOfCreation: propTypes.instanceOf(Date).isRequired,
      time: propTypes.number.isRequired,
    })
  ),
  deleteItem: propTypes.func.isRequired,
  onToggleDone: propTypes.func.isRequired,
  filter: propTypes.oneOf(['all', 'active', 'completed']),
  onEdit: propTypes.func.isRequired,
}

TaskList.defaultProps = {
  data: [],
  filter: 'all',
}

export default TaskList
