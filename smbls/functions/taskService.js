// smbls/functions/taskService.js
// Application layer - coordinates business logic
export default function taskService(){
    const el = this
    const repo = el.call('taskRepository')
    const sorter = el.call('taskSorter')
    const { Task } = el.call('Task')

    return {
        // Get all tasks with optional sorting
        listTasks: (sortConfig = []) => {
            const tasks = repo.getAll()
            return sorter.sort(tasks, sortConfig)
        },

        // Get single task
        getTask: (id) => {
            return repo.getById(id)
        },

        // Create new task with validation
        createTask: (data) => {
            const task = Task.create(data)
            const validation = Task.validate(task)

            if (!validation.valid) {
                return {
                    success: false,
                    errors: validation.errors
                }
            }

            const created = repo.create(task)
            return {
                success: true,
                task: created
            }
        },

        // Update task with validation
        updateTask: (id, updates) => {
            const existing = repo.getById(id)
            if (!existing) {
                return {
                    success: false,
                    errors: ['Task not found']
                }
            }

            const merged = { ...existing, ...updates }
            const validation = Task.validate(merged)

            if (!validation.valid) {
                return {
                    success: false,
                    errors: validation.errors
                }
            }

            const updated = repo.update(id, updates)
            return {
                success: true,
                task: updated
            }
        },

        // Soft delete task
        deleteTask: (id) => {
            const success = repo.softDelete(id)
            return {
                success,
                errors: success ? [] : ['Task not found']
            }
        },

        // Toggle task status
        toggleTaskStatus: (id) => {
            const task = repo.getById(id)
            if (!task) {
                return { success: false, errors: ['Task not found'] }
            }

            const newStatus = task.status === 'PENDING' ? 'DONE' : 'PENDING'
            return this.updateTask(id, { status: newStatus })
        }
    }
}