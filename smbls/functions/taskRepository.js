// smbls/functions/taskRepository.js
// Data layer - handles persistence (in-memory for this example)
export default function taskRepository() {
    const el = this
    const state = el.state || {}
    // Initialize storage if not exists
    if (!state.tasks) {
        state.tasks = []
    }

    return {
        // Get all non-deleted tasks
        getAll: () => {
            return state.tasks.filter(task => task.deletedAt === null)
        },

        // Get single task by id
        getById: (id) => {
            return state.tasks.find(task => task.id === id && task.deletedAt === null)
        },

        // Create new task
        create: (task) => {
            state.tasks.push(task)
            return task
        },

        // Update existing task
        update: (id, updates) => {
            const index = state.tasks.findIndex(task => task.id === id)
            if (index === -1) return null

            state.tasks[index] = {
                ...state.tasks[index],
                ...updates
            }
            return state.tasks[index]
        },

        // Soft delete
        softDelete: (id) => {
            const index = state.tasks.findIndex(task => task.id === id)
            if (index === -1) return false

            state.tasks[index].deletedAt = new Date()
            return true
        }
    }
}