// smbls/components/TaskListItem.js
export const TaskListItem = {
    extends: 'Flex',
    padding: 'B',
    marginBottom: 'A',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
    gap: 'A',

    // Status indicator & title row
    Header: {
        extends: 'Flex',
        alignItems: 'center',
        gap: 'A',

        // Status checkbox
        StatusCheckbox: {
            extends: 'Input',
            tag: 'input',
            type: 'checkbox',
            cursor: 'pointer',
            width: '20px',
            height: '20px',

            onChange: (el, state) => {
                const taskId = el.parent.parent.props.taskId
                const service = el.call('taskService')
                const result = service.toggleTaskStatus(taskId)

                if (result.success) {
                    // Re-render task list
                    el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
                }
            }
        },

        // Task title
        Title: {
            extends: 'Text',
            flex: 1,
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: (el, state) => {
                return el.parent.parent.props.status === 'DONE' ? 'line-through' : 'none'
            },
            color: (el, state) => {
                return el.parent.parent.props.status === 'DONE' ? '#999' : '#000'
            }
        },

        // Status badge
        StatusBadge: {
            extends: 'Text',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: (el, state) => {
                return el.parent.parent.props.status === 'DONE' ? '#4CAF50' : '#FF9800'
            },
            color: '#fff'
        }
    },

    // Description
    Description: {
        extends: 'Text',
        fontSize: '14px',
        color: '#666',
        marginLeft: '28px'
    },

    // Due date and actions row
    Footer: {
        extends: 'Flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '28px',
        marginTop: 'A',

        DueDate: {
            extends: 'Text',
            fontSize: '13px',
            color: '#888'
        },

        Actions: {
            extends: 'Flex',
            gap: 'A',

            EditButton: {
                extends: 'Button',
                text: 'Edit',
                padding: '4px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '4px',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',

                onClick: (el, state) => {
                    const taskId = el.parent.parent.parent.props.taskId
                    state.editingTaskId = taskId
                    state.showTaskForm = true
                    el.ctx.update()
                }
            },

            DeleteButton: {
                extends: 'Button',
                text: 'Delete',
                padding: '4px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '4px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',

                onClick: (el, state) => {
                    const taskId = el.parent.parent.parent.props.taskId
                    const service = el.call('taskService')
                    const result = service.deleteTask(taskId)

                    if (result.success) {
                        el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
                    }
                }
            }
        }
    }
}