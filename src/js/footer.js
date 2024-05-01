import React from 'react'
import propTypes from 'prop-types'

import '../css/footer.css'
import TaskFilters from './task-filters'

function Footer({ itemsLeft = 0, deleteAllCompleted, onFilterChange, filter = 'all' }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} item(s) left</span>
      <TaskFilters onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={deleteAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  itemsLeft: propTypes.number,
  deleteAllCompleted: propTypes.func.isRequired,
  onFilterChange: propTypes.func.isRequired,
  filter: propTypes.string,
}

export default Footer
