// smbls/types/Task.js
export function Task() {
    return {
        // Type definition for Task model
        schema: {
            id: 'string',
            title: 'string',
            description: 'string',
            dueDate: 'Date',
            createdAt: 'Date',
            deletedAt: 'Date | null',
            status: 'TaskStatus' // PENDING | DONE
        },

        // Factory function to create a new task
        create: (data) => ({
            id: crypto.randomUUID(),
            title: data.title || '',
            description: data.description || '',
            dueDate: data.dueDate || new Date(),
            createdAt: new Date(),
            deletedAt: null,
            status: data.status || 'PENDING'
        }),

        // Validation
        validate: (task) => {
            const errors = []

            if (!task.title || task.title.trim().length === 0) {
                errors.push('Title is required')
            }

            if (task.title && task.title.length > 200) {
                errors.push('Title must be less than 200 characters')
            }

            if (!task.dueDate || !(task.dueDate instanceof Date)) {
                errors.push('Valid due date is required')
            }

            return {
                valid: errors.length === 0,
                errors
            }
        }
    }
}