// Presentation layer — create / edit task modal form
// Shown/hidden via DOM ID 'form-overlay' (not reactive display)
// Reads/writes form fields through root state (formTitle, formDescription, etc.)

export const TaskFormModal = {
  extends: 'Flex',
  flexDirection: 'column',
  background: 'formBg',
  borderRadius: '20px',         // Airbnb large card radius
  padding: 'D',                 // 24px
  width: '480px',
  maxWidth: '92vw',
  gap: 'C',
  // Airbnb card shadow — elevated modal appearance
  boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.18) 0px 12px 32px',

  // Modal header
  ModalHeader: {
    extends: 'Flex',
    flexAlign: 'center space-between',

    FormTitle: {
      extends: 'Text',
      tag: 'h2',
      fontSize: '22px',
      fontWeight: '700',
      color: 'textPrimary',
      letterSpacing: '-0.44px',
      text: (el, s) => s.root.editingTaskId ? 'Edit Task' : 'New Task',
    },

    CloseBtn: {
      extends: 'Flex',
      tag: 'button',
      flexAlign: 'center center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',          // circular control
      background: 'surface',
      border: 'none',
      cursor: 'pointer',

      Svg: {
        viewBox: '0 0 24 24',
        width: '16',
        height: '16',
        html: '<path d="M18 6L6 18M6 6l12 12" stroke="#222222" stroke-width="2" stroke-linecap="round"/>',
      },

      onClick: (e, el) => {
        const overlay = document.getElementById('form-overlay')
        if (overlay) overlay.style.display = 'none'
      },
    },
  },

  // Title field
  TitleField: {
    extends: 'Flex',
    flexDirection: 'column',
    gap: '6px',

    Label: {
      extends: 'Text',
      tag: 'label',
      text: 'Title *',
      fontSize: '14px',
      fontWeight: '600',
      color: 'textPrimary',
    },

    Input: {
      extends: 'Input',
      tag: 'input',
      type: 'text',
      placeholder: 'What needs to be done?',
      fontSize: '16px',
      fontWeight: '400',
      color: 'textPrimary',
      background: 'white',
      padding: 'B C',
      borderRadius: '8px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'borderGray',

      value: (el, s) => s.root.formTitle || '',

      onInput: (e, el, s) => {
        s.root.update({ formTitle: el.node.value })
      },
    },
  },

  // Description field
  DescriptionField: {
    extends: 'Flex',
    flexDirection: 'column',
    gap: '6px',

    Label: {
      extends: 'Text',
      tag: 'label',
      text: 'Description',
      fontSize: '14px',
      fontWeight: '600',
      color: 'textPrimary',
    },

    Input: {
      extends: 'Input',
      tag: 'textarea',
      placeholder: 'Add more details (optional)…',
      fontSize: '14px',
      color: 'textPrimary',
      background: 'white',
      padding: 'B C',
      borderRadius: '8px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'borderGray',
      minHeight: '80px',
      resize: 'vertical',

      value: (el, s) => s.root.formDescription || '',

      onInput: (e, el, s) => {
        s.root.update({ formDescription: el.node.value })
      },
    },
  },

  // Due date + status row
  DateStatusRow: {
    extends: 'Flex',
    gap: 'B',

    DueDateField: {
      extends: 'Flex',
      flexDirection: 'column',
      gap: '6px',
      flex: '1',

      Label: {
        extends: 'Text',
        tag: 'label',
        text: 'Due Date *',
        fontSize: '14px',
        fontWeight: '600',
        color: 'textPrimary',
      },

      Input: {
        extends: 'Input',
        tag: 'input',
        type: 'date',
        fontSize: '14px',
        color: 'textPrimary',
        background: 'white',
        padding: 'B C',
        borderRadius: '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'borderGray',

        value: (el, s) => s.root.formDueDate || '',

        onChange: (e, el, s) => {
          s.root.update({ formDueDate: el.node.value })
        },
      },
    },

    StatusField: {
      extends: 'Flex',
      flexDirection: 'column',
      gap: '6px',
      flex: '1',

      Label: {
        extends: 'Text',
        tag: 'label',
        text: 'Status',
        fontSize: '14px',
        fontWeight: '600',
        color: 'textPrimary',
      },

      Select: {
        extends: 'Input',
        tag: 'select',
        fontSize: '14px',
        color: 'textPrimary',
        background: 'white',
        padding: 'B C',
        borderRadius: '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'borderGray',
        cursor: 'pointer',

        children: [
          { tag: 'option', value: 'PENDING', text: 'Pending' },
          { tag: 'option', value: 'DONE', text: 'Done' },
        ],

        value: (el, s) => s.root.formStatus || 'PENDING',

        onChange: (e, el, s) => {
          s.root.update({ formStatus: el.node.value })
        },
      },
    },
  },

  // Validation errors — only shown when present
  Errors: {
    extends: 'Flex',
    flexDirection: 'column',
    gap: '4px',
    display: (el, s) => (s.root.formErrors && s.root.formErrors.length > 0) ? 'flex' : 'none',

    childExtends: 'ErrorItem',

    children: (el, s) => (s.root.formErrors || []).map(msg => ({ message: msg })),
  },

  // Action buttons row
  Actions: {
    extends: 'Flex',
    flexAlign: 'center flex-end',
    gap: 'B',
    paddingTop: 'A',

    CancelBtn: {
      extends: 'Flex',
      tag: 'button',
      flexAlign: 'center center',
      padding: 'B D',
      borderRadius: '8px',
      background: 'surface',
      color: 'textPrimary',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      text: 'Cancel',

      onClick: (e, el) => {
        const overlay = document.getElementById('form-overlay')
        if (overlay) overlay.style.display = 'none'
      },
    },

    SubmitBtn: {
      extends: 'Flex',
      tag: 'button',
      flexAlign: 'center center',
      padding: 'B D',
      borderRadius: '8px',
      background: 'primary',      // Rausch Red CTA
      color: 'white',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      text: (el, s) => s.root.editingTaskId ? 'Save Changes' : 'Create Task',

      onClick: (e, el, s) => {
        const root = s.root
        const data = {
          title: root.formTitle,
          description: root.formDescription,
          dueDate: root.formDueDate,
          status: root.formStatus || 'PENDING',
        }

        // Validate via domain function
        const errors = el.call('validateTask', data)
        if (errors.length > 0) {
          s.root.update({ formErrors: errors })
          return
        }

        if (root.editingTaskId) {
          // Update existing task
          const tasks = (root.tasks || []).map(t => {
            if (t.id !== root.editingTaskId) return t
            return {
              ...t,
              title: data.title.trim(),
              description: data.description ? data.description.trim() : '',
              dueDate: new Date(data.dueDate),
              status: data.status,
            }
          })
          s.root.update({ tasks, formErrors: [] })
        } else {
          // Create new task via domain factory
          const newTask = el.call('buildTask', data)
          s.root.update({ tasks: [...(root.tasks || []), newTask], formErrors: [] })
        }

        // Close modal
        const overlay = document.getElementById('form-overlay')
        if (overlay) overlay.style.display = 'none'
      },
    },
  },
}

// Error item — used as childExtends in Errors list
export const ErrorItem = {
  extends: 'Flex',
  flexAlign: 'center flex-start',
  gap: '6px',

  Dot: {
    extends: 'Text',
    text: '•',
    color: 'primary',
    fontSize: '16px',
    lineHeight: '1',
  },

  Msg: {
    extends: 'Text',
    fontSize: '13px',
    color: 'errorRed',
    text: (el) => el.parent.message || '',
  },
}
