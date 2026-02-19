// smbls/pages/todo.js
export const todo = {
    extends: 'Page',
    padding: 'C',
    maxWidth: '800px',
    margin: '0 auto',

    onRender: (el, state) => {
        // Initialize state
        if (!state.showTaskForm) {
            state.showTaskForm = false
        }
    },

    // Header
    Header: {
        extends: 'Flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'C',

        Title: {
            extends: 'Text',
            tag: 'h1',
            fontSize: '32px',
            fontWeight: '700',
            text: 'To-Do App'
        },

        AddButton: {
            extends: 'Button',
            text: '+ New Task',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',

            onClick: (el, state) => {
                state.showTaskForm = !state.showTaskForm
                state.editingTaskId = null
                el.ctx.update()
            }
        }
    },

    // Task form (conditionally rendered)
    TaskFormContainer: {
        extends: 'Flex',
        display: (el, state) => state.showTaskForm ? 'flex' : 'none',

        TaskForm: {
            extends: 'TaskForm'
        }
    },

    // Sort controls
    SortControlsContainer: {
        extends: 'SortControls'
    },

    // Task list
    TaskList: {
        extends: 'Flex',
        flexDirection: 'column',

        // Render task list dynamically
        onRender: (el, state) => {
            const service = el.call('taskService')

            // Build sort configuration
            const sortConfig = []
            if (state.primarySortField) {
                sortConfig.push({
                    field: state.primarySortField,
                    direction: state.primarySortDirection || 'ASC'
                })
            }
            if (state.secondarySortField) {
                sortConfig.push({
                    field: state.secondarySortField,
                    direction: state.secondarySortDirection || 'ASC'
                })
            }

            // Get sorted tasks
            const tasks = service.listTasks(sortConfig)

            // Clear and rebuild children
            if (el.TaskItems) {
                el.TaskItems.remove()
            }

            if (tasks.length === 0) {
                el.update({
                    EmptyMessage: {
                        extends: 'Text',
                        fontSize: '16px',
                        color: '#999',
                        textAlign: 'center',
                        padding: 'C',
                        text: 'No tasks yet. Create your first task!'
                    }
                })
            } else {
                // Create task items
                const taskItems = {}
                tasks.forEach((task, index) => {
                    taskItems[`Task_${task.id}`] = {
                        extends: 'TaskListItem',
                        taskId: task.id,
                        status: task.status,

                        // Pass task data to children
                        Header: {
                            StatusCheckbox: {
                                checked: task.status === 'DONE'
                            },
                            Title: {
                                text: task.title
                            },
                            StatusBadge: {
                                text: task.status
                            }
                        },
                        Description: {
                            text: task.description || 'No description'
                        },
                        Footer: {
                            DueDate: {
                                text: `Due: ${task.dueDate.toLocaleDateString()}`
                            }
                        }
                    }
                })

                el.update({
                    TaskItems: {
                        extends: 'Flex',
                        flexDirection: 'column',
                        ...taskItems
                    }
                })
            }
        }
    }
}