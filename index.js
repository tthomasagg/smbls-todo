
import { create } from 'smbls'

// Import the todo page
import { todo } from './smbls/pages/todo.js'

// Import all components
import { TaskListItem } from './smbls/components/TaskListItem.js'
import { TaskForm } from './smbls/components/TaskForm.js'
import { SortControls } from './smbls/components/SortControls.js'

// Import all functions
import taskRepository from './smbls/functions/taskRepository.js'
import taskService from './smbls/functions/taskService.js'
import taskSorter from './smbls/functions/taskSorter.js'
import { Task } from './smbls/types/Task.js'

// Register all components and functions globally
const components = {
    TaskListItem,
    TaskForm,
    SortControls
}

const functions = {
    taskRepository,
    taskService,
    taskSorter,
    Task
}

// Create and render the app
create({
    ...todo,
    parent: document.body
}, {
    components,
    functions,
    state: {
        tasks: [],
        showTaskForm: false,
        editingTaskId: null,
        primarySortField: '',
        primarySortDirection: 'ASC',
        secondarySortField: '',
        secondarySortDirection: 'ASC',
        taskListVersion: 0,
        formTitle: '',
        formDescription: '',
        formDueDate: new Date().toISOString().split('T')[0],
        formStatus: 'PENDING',
        formErrors: []
    }
})