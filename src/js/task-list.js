import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import propTypes from 'prop-types'

import Task from './task'

import '../css/task-list.css'

class TaskList extends Component {
  onEditTask = (id, description) => {
    const { onEdit } = this.props
    onEdit(id, description)
  }

  render() {
    const {
      data, deleteItem, onToggleDone, filter,
    } = this.props

    let filteredData = data

    if (filter === 'active') {
      filteredData = data.filter((item) => !item.completed)
    } else if (filter === 'completed') {
      filteredData = data.filter((item) => item.completed)
    }

    const elements = filteredData.map((item) => {
      const createdTimeAgo = formatDistanceToNow(
        item.timeOfCreation,
        {
          includeSeconds: true,
          addSuffix: true,
        },
      )
      return (
        <Task
          key={item.id}
          completed={item.completed}
          editing={item.editing}
          description={item.description}
          // time={item.time}
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
    }),
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
