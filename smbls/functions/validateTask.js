// Domain layer — pure validation, no side effects

/**
 * Validates task input data.
 * @param {object} data - { title, dueDate, description, status }
 * @returns {string[]} Array of error messages (empty = valid)
 */
export const validateTask = function validateTask(data) {
  const errors = []

  if (!data.title || !data.title.trim()) {
    errors.push('Title is required')
  } else if (data.title.trim().length > 200) {
    errors.push('Title must be 200 characters or fewer')
  }

  if (!data.dueDate) {
    errors.push('Due date is required')
  } else {
    const d = new Date(data.dueDate)
    if (isNaN(d.getTime())) errors.push('Due date is not a valid date')
  }

  if (data.status && !['PENDING', 'DONE'].includes(data.status)) {
    errors.push('Status must be PENDING or DONE')
  }

  return errors
}
