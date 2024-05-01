import React, { Component } from 'react'

import './App.css'
import NewTaskForm from './js/new-task-form'
import TaskList from './js/task-list'
import Footer from './js/footer'

class App extends Component {
  maxId = 100

  state = {
    data: [],
    filter: 'all',
  }

  isInputValid(input) {
    return input.trim() !== ''
  }

  createTodoItem(description) {
    return {
      id: this.maxId++,
      description,
      completed: false,
      editing: false,
      timeOfCreation: new Date(),
    }
  }

  addNewTodoItem = (description) => {
    if (this.isInputValid(description)) {
      const newItem = this.createTodoItem(description)
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
      filter: filter,
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
    const itemsLeft = this.state.data.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addNewTodoItem={this.addNewTodoItem} />
        </header>

        <section className="main">
          <TaskList
            className="hidden"
            data={this.state.data}
            deleteItem={this.deleteItem}
            onToggleDone={this.onToggleDone}
            filter={this.state.filter}
            onEdit={this.onEdit}
          />
          <Footer
            itemsLeft={itemsLeft}
            deleteAllCompleted={this.deleteAllCompleted}
            onFilterChange={this.onFilterChange}
            filter={this.state.filter}
          />
        </section>
      </section>
    )
  }
}

export default App
