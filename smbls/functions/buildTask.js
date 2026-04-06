// Domain layer — pure task factory, no side effects

/**
 * Constructs a new Task domain object from raw input.
 * Caller is responsible for validating first (see validateTask).
 * @param {object} data - { title, description, dueDate, status }
 * @returns {Task}
 */
export const buildTask = function buildTask(data) {
  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description ? data.description.trim() : '',
    dueDate: new Date(data.dueDate),
    createdAt: new Date(),
    deletedAt: null,
    status: data.status || 'PENDING',
  }
}
