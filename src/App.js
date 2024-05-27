import React, { Component } from 'react'

import './App.css'
import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer'

class App extends Component {
  maxId = 100

  state = {
    data: [],
    filter: 'all',
  }

  // eslint-disable-next-line
  isInputValid(input) {
    return typeof input === 'string' && input.trim() !== ''
  }

  createTodoItem(description, min, sec) {
    return {
      id: this.maxId++,
      description,
      completed: false,
      editing: false,
      timeOfCreation: new Date(),
      time: Number(min) * 60 + Number(sec),
    }
  }

  addNewTodoItem = (description, min, sec) => {
    if (this.isInputValid(description)) {
      const newItem = this.createTodoItem(description, min, sec)
      this.setState(({ data }) => {
        const newArr = [...data, newItem]
        return {
          data: newArr,
        }
      })
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((el) => el.id === id)
      const newArray = [...data.slice(0, index), ...data.slice(index + 1)]
      return {
        data: newArray,
      }
    })
  }

  deleteAllCompleted = () => {
    this.setState(({ data }) => {
      const newArr = data.filter((item) => !item.completed)
      return {
        data: newArr,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter,
    })
  }

  onToggleDone = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((el) => el.id === id)
      const oldItem = data[index]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
      return {
        data: newArray,
      }
    })
  }

  onEdit = (id, value) => {
    if (this.isInputValid(value)) {
      this.setState(({ data }) => {
        const index = data.findIndex((el) => el.id === id)
        const oldItem = data[index]
        const updatedItem = { ...oldItem, editing: true, description: value }
        const newData = [...data.slice(0, index), updatedItem, ...data.slice(index + 1)]

        return {
          data: newData,
        }
      })
    }
  }

  render() {
    const { data, filter } = this.state
    const itemsLeft = data.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addNewTodoItem={this.addNewTodoItem} />
        </header>

        <section className="main">
          <TaskList
            className="hidden"
            data={data}
            deleteItem={this.deleteItem}
            onToggleDone={this.onToggleDone}
            filter={filter}
            onEdit={this.onEdit}
          />
          <Footer
            itemsLeft={itemsLeft}
            deleteAllCompleted={this.deleteAllCompleted}
            onFilterChange={this.onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    )
  }
}

export default App
