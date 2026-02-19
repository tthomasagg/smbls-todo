// smbls/components/SortControls.js
export const SortControls = {
    extends: 'Flex',
    gap: 'B',
    padding: 'B',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: 'B',

    Label: {
        extends: 'Text',
        text: 'Sort by:',
        fontSize: '14px',
        fontWeight: '600'
    },

    // Primary sort field
    PrimarySortField: {
        extends: 'Input',
        tag: 'select',
        padding: '6px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',

        children: [
            { tag: 'option', value: '', text: 'None' },
            { tag: 'option', value: 'status', text: 'Status' },
            { tag: 'option', value: 'dueDate', text: 'Due Date' },
            { tag: 'option', value: 'createdAt', text: 'Created Date' },
            { tag: 'option', value: 'title', text: 'Title' }
        ],

        value: (el, state) => state.primarySortField || '',

        onChange: (el, state) => {
            state.primarySortField = el.node.value
            el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
        }
    },

    PrimarySortDirection: {
        extends: 'Input',
        tag: 'select',
        padding: '6px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        display: (el, state) => state.primarySortField ? 'block' : 'none',

        children: [
            { tag: 'option', value: 'ASC', text: 'Ascending' },
            { tag: 'option', value: 'DESC', text: 'Descending' }
        ],

        value: (el, state) => state.primarySortDirection || 'ASC',

        onChange: (el, state) => {
            state.primarySortDirection = el.node.value
            el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
        }
    },

    Separator: {
        extends: 'Text',
        text: 'then by:',
        fontSize: '14px',
        marginLeft: 'B',
        display: (el, state) => state.primarySortField ? 'block' : 'none'
    },

    // Secondary sort field
    SecondarySortField: {
        extends: 'Input',
        tag: 'select',
        padding: '6px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        display: (el, state) => state.primarySortField ? 'block' : 'none',

        children: [
            { tag: 'option', value: '', text: 'None' },
            { tag: 'option', value: 'status', text: 'Status' },
            { tag: 'option', value: 'dueDate', text: 'Due Date' },
            { tag: 'option', value: 'createdAt', text: 'Created Date' },
            { tag: 'option', value: 'title', text: 'Title' }
        ],

        value: (el, state) => state.secondarySortField || '',

        onChange: (el, state) => {
            state.secondarySortField = el.node.value
            el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
        }
    },

    SecondarySortDirection: {
        extends: 'Input',
        tag: 'select',
        padding: '6px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        display: (el, state) => state.secondarySortField ? 'block' : 'none',

        children: [
            { tag: 'option', value: 'ASC', text: 'Ascending' },
            { tag: 'option', value: 'DESC', text: 'Descending' }
        ],

        value: (el, state) => state.secondarySortDirection || 'ASC',

        onChange: (el, state) => {
            state.secondarySortDirection = el.node.value
            el.ctx.update({ taskListVersion: (state.taskListVersion || 0) + 1 })
        }
    }
}