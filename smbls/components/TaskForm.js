// smbls/components/TaskForm.js
export const TaskForm = {
    extends: 'Flex',
    flexDirection: 'column',
    gap: 'B',
    padding: 'B',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: 'B',

    onRender: (el, state) => {
        // Populate form if editing
        if (state.editingTaskId) {
            console.log({el})
            const service = el.call('taskService')
            const task = service.getTask(state.editingTaskId)

            if (task) {
                state.formTitle = task.title
                state.formDescription = task.description
                state.formDueDate = task.dueDate.toISOString().split('T')[0]
                state.formStatus = task.status
            }
        } else {
            // Reset form for new task
            state.formTitle = ''
            state.formDescription = ''
            state.formDueDate = new Date().toISOString().split('T')[0]
            state.formStatus = 'PENDING'
        }
    },

    FormTitle: {
        extends: 'Text',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: 'A',
        text: (el, state) => state.editingTaskId ? 'Edit Task' : 'Create New Task'
    },

    // Title input
    TitleField: {
        extends: 'Flex',
        flexDirection: 'column',
        gap: '4px',

        Label: {
            extends: 'Text',
            text: 'Title *',
            fontSize: '14px',
            fontWeight: '600'
        },

        Input: {
            extends: 'Input',
            tag: 'input',
            type: 'text',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            value: (el, state) => state.formTitle || '',

            onInput: (el, state) => {
                state.formTitle = el.node.value
            }
        }
    },

    // Description input
    DescriptionField: {
        extends: 'Flex',
        flexDirection: 'column',
        gap: '4px',

        Label: {
            extends: 'Text',
            text: 'Description',
            fontSize: '14px',
            fontWeight: '600'
        },

        Input: {
            extends: 'Input',
            tag: 'textarea',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            minHeight: '80px',
            value: (el, state) => state.formDescription || '',

            onInput: (el, state) => {
                state.formDescription = el.node.value
            }
        }
    },

    // Due date input
    DueDateField: {
        extends: 'Flex',
        flexDirection: 'column',
        gap: '4px',

        Label: {
            extends: 'Text',
            text: 'Due Date *',
            fontSize: '14px',
            fontWeight: '600'
        },

        Input: {
            extends: 'Input',
            tag: 'input',
            type: 'date',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            value: (el, state) => state.formDueDate || '',

            onChange: (el, state) => {
                state.formDueDate = el.node.value
            }
        }
    },

    // Status select
    StatusField: {
        extends: 'Flex',
        flexDirection: 'column',
        gap: '4px',

        Label: {
            extends: 'Text',
            text: 'Status',
            fontSize: '14px',
            fontWeight: '600'
        },

        Select: {
            extends: 'Input',
            tag: 'select',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            value: (el, state) => state.formStatus || 'PENDING',

            children: [
                { tag: 'option', value: 'PENDING', text: 'Pending' },
                { tag: 'option', value: 'DONE', text: 'Done' }
            ],

            onChange: (el, state) => {
                state.formStatus = el.node.value
            }
        }
    },

    // Error messages
    ErrorMessages: {
        extends: 'Flex',
        flexDirection: 'column',
        gap: '4px',
        display: (el, state) => state.formErrors?.length > 0 ? 'flex' : 'none',

        childExtends: 'Text',
        color: '#f44336',
        fontSize: '13px',

        children: (el, state) => {
            return (state.formErrors || []).map(error => ({
                text: `• ${error}`
            }))
        }
    },

    // Form actions
    Actions: {
        extends: 'Flex',
        gap: 'A',
        marginTop: 'A',

        SubmitButton: {
            extends: 'Button',
            text: (el, state) => state.editingTaskId ? 'Update Task' : 'Create Task',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',

            onClick: (el, state) => {
                const service = el.call('taskService')

                const data = {
                    title: state.formTitle,
                    description: state.formDescription,
                    dueDate: new Date(state.formDueDate),
                    status: state.formStatus
                }

                let result
                if (state.editingTaskId) {
                    result = service.updateTask(state.editingTaskId, data)
                } else {
                    result = service.createTask(data)
                }

                if (result.success) {
                    // Clear form and close
                    state.showTaskForm = false
                    state.editingTaskId = null
                    state.formErrors = []
                    state.taskListVersion = (state.taskListVersion || 0) + 1
                    el.ctx.update()
                } else {
                    state.formErrors = result.errors
                    el.ctx.update()
                }
            }
        },

        CancelButton: {
            extends: 'Button',
            text: 'Cancel',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#999',
            color: '#fff',
            border: 'none',

            onClick: (el, state) => {
                state.showTaskForm = false
                state.editingTaskId = null
                state.formErrors = []
                el.ctx.update()
            }
        }
    }
}