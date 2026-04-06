import { create } from 'smbls'

// Pages
import { main } from './smbls/pages/main.js'

// Components — all UI building blocks
import {
  AppHeader,
  PendingBadge,
  DoneBadge,
  TaskCard,
  EmptyState,
  SortBar,
  TaskFormModal,
  ErrorItem,
} from './smbls/components/index.js'

// Domain functions — pure logic + imperative list renderer
import {
  validateTask,
  buildTask,
  listTasks,
  renderTaskList,
} from './smbls/functions/index.js'

// Design system — AirBnB-inspired tokens
import designSystem from './smbls/designSystem/index.js'

create(
    {
      extends: 'Page',
      ...main,
      parent: document.body,
    },
    {
      designSystem,
      components: {
        AppHeader,
        PendingBadge,
        DoneBadge,
        TaskCard,
        EmptyState,
        SortBar,
        TaskFormModal,
        ErrorItem,
      },
      functions: {
        validateTask,
        buildTask,
        listTasks,
        renderTaskList,
      },
      state: {
        // Data layer — in-memory task store
        tasks: [],

        // UI state — sort controls
        primarySort: '',
        primaryDir: 'ASC',
        secondarySort: '',
        secondaryDir: 'ASC',

        // UI state — form
        editingTaskId: null,
        formTitle: '',
        formDescription: '',
        formDueDate: new Date().toISOString().split('T')[0],
        formStatus: 'PENDING',
        formErrors: [],
      },
    }
)
