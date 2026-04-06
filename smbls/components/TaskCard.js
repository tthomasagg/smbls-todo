// Presentation layer — single task card with Airbnb 3-layer card shadow
// Props received from parent (set when instantiated in renderTaskList):
//   taskId, taskTitle, taskDescription, taskDueDate, taskStatus

export const TaskCard = {
  extends: 'Flex',
  flexDirection: 'column',
  gap: 'A',
  background: 'cardBg',
  borderRadius: '20px',       // Airbnb card radius
  padding: 'C',               // 16px all sides
  // Three-layer Airbnb card shadow
  boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',

  // Top row: checkbox + title + badge
  TopRow: {
    extends: 'Flex',
    flexAlign: 'center space-between',
    gap: 'B',

    Left: {
      extends: 'Flex',
      flexAlign: 'center center',
      gap: 'B',
      flex: '1',

      // Toggle-status checkbox — styled as a round check button
      CheckBtn: {
        extends: 'Flex',
        tag: 'button',
        flexAlign: 'center center',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        borderWidth: '2px',
        borderStyle: 'solid',
        // Border and bg set reactively based on status
        borderColor: (el) => {
          const card = el.parent.parent.parent
          return card.taskStatus === 'DONE' ? 'statusDone' : 'borderGray'
        },
        background: (el) => {
          const card = el.parent.parent.parent
          return card.taskStatus === 'DONE' ? 'statusDone' : 'white'
        },
        cursor: 'pointer',
        flexShrink: '0',

        // Checkmark icon (visible only when DONE)
        Svg: {
          viewBox: '0 0 24 24',
          width: '13',
          height: '13',
          html: '<path d="M5 12l5 5L19 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
          opacity: (el) => {
            const card = el.parent.parent.parent.parent
            return card.taskStatus === 'DONE' ? '1' : '0'
          },
        },

        onClick: (e, el, s) => {
          // Traverse up to the TaskCard instance to get taskId
          const card = el.parent.parent.parent
          const taskId = card.taskId
          if (!taskId) return

          const tasks = (s.root.tasks || []).map(t =>
            t.id === taskId
              ? { ...t, status: t.status === 'PENDING' ? 'DONE' : 'PENDING' }
              : t
          )
          s.root.update({ tasks })
        },
      },

      Title: {
        extends: 'Text',
        tag: 'span',
        flex: '1',
        fontSize: '16px',
        fontWeight: '600',
        color: (el) => {
          const card = el.parent.parent.parent
          return card.taskStatus === 'DONE' ? 'textSecondary' : 'textPrimary'
        },
        textDecoration: (el) => {
          const card = el.parent.parent.parent
          return card.taskStatus === 'DONE' ? 'line-through' : 'none'
        },
        text: (el) => el.parent.parent.parent.taskTitle || '',
      },
    },

    // Status badge — swap between PendingBadge and DoneBadge via extend
    Badge: {
      extends: (el) => el.parent.parent.taskStatus === 'DONE' ? 'DoneBadge' : 'PendingBadge',
    },
  },

  // Description — shown only when non-empty
  Description: {
    extends: 'Text',
    tag: 'p',
    fontSize: '14px',
    color: 'textSecondary',
    lineHeight: '1.43',
    paddingLeft: '32px',         // indent under checkbox
    text: (el) => el.parent.taskDescription || '',
    display: (el) => el.parent.taskDescription ? 'block' : 'none',
  },

  // Bottom row: due date + action buttons
  BottomRow: {
    extends: 'Flex',
    flexAlign: 'center space-between',
    paddingTop: 'A',
    paddingLeft: '32px',         // align with title

    DueDate: {
      extends: 'Flex',
      flexAlign: 'center center',
      gap: '6px',

      CalIcon: {
        extends: 'Svg',
        viewBox: '0 0 24 24',
        width: '14',
        height: '14',
        html: '<rect x="3" y="4" width="18" height="18" rx="2" stroke="#6a6a6a" stroke-width="1.5" fill="none"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#6a6a6a" stroke-width="1.5" stroke-linecap="round"/>',
      },

      Label: {
        extends: 'Text',
        fontSize: '13px',
        color: 'textSecondary',
        text: (el) => el.parent.parent.parent.taskDueDate || '',
      },
    },

    Actions: {
      extends: 'Flex',
      flexAlign: 'center center',
      gap: 'A',

      // Edit button — subtle, Airbnb-style icon button
      EditBtn: {
        extends: 'Flex',
        tag: 'button',
        flexAlign: 'center center',
        gap: '4px',
        padding: '5px 12px',
        borderRadius: '8px',
        background: 'surface',
        color: 'textPrimary',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',

        Svg: {
          viewBox: '0 0 24 24',
          width: '13',
          height: '13',
          html: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
        },

        Label: { extends: 'Text', text: 'Edit' },

        onClick: (e, el, s) => {
          const card = el.parent.parent.parent
          const taskId = card.taskId
          if (!taskId) return

          // Find task data to pre-populate form
          const task = (s.root.tasks || []).find(t => t.id === taskId)
          if (!task) return

          s.root.update({
            editingTaskId: taskId,
            formTitle: task.title,
            formDescription: task.description || '',
            formDueDate: task.dueDate instanceof Date
              ? task.dueDate.toISOString().split('T')[0]
              : String(task.dueDate).split('T')[0],
            formStatus: task.status,
            formErrors: [],
          })
          const overlay = document.getElementById('form-overlay')
          if (overlay) overlay.style.display = 'flex'
        },
      },

      // Delete button — Rausch Red accent, used sparingly
      DeleteBtn: {
        extends: 'Flex',
        tag: 'button',
        flexAlign: 'center center',
        gap: '4px',
        padding: '5px 12px',
        borderRadius: '8px',
        background: 'rgba(255,56,92,0.08)',
        color: 'primary',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',

        Svg: {
          viewBox: '0 0 24 24',
          width: '13',
          height: '13',
          html: '<polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
        },

        Label: { extends: 'Text', text: 'Delete' },

        onClick: (e, el, s) => {
          const card = el.parent.parent.parent
          const taskId = card.taskId
          if (!taskId) return

          // Soft delete: set deletedAt timestamp, never hard delete
          const tasks = (s.root.tasks || []).map(t =>
            t.id === taskId ? { ...t, deletedAt: new Date() } : t
          )
          s.root.update({ tasks })
        },
      },
    },
  },
}
