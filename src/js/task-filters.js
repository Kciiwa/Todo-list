import propTypes from 'prop-types'
import '../css/tasks-filter.css'

function TaskFilters({ onFilterChange, filter = 'all' }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'active' ? 'selected' : ''} onClick={() => onFilterChange('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'completed' ? 'selected' : ''} onClick={() => onFilterChange('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilters.propTypes = {
  onFilterChange: propTypes.func.isRequired,
  filter: propTypes.string,
}

export default TaskFilters
