// Main page — To-Do app shell
// Layout: sticky header | content (sort bar + task list) | form modal overlay

export const main = {
  extends: 'Page',
  background: 'pageBg',
  minHeight: '100vh',

  // Sticky navigation bar
  Header: { extends: 'AppHeader' },

  // Scrollable content area
  Content: {
    extends: 'Flex',
    flexDirection: 'column',
    maxWidth: '760px',
    margin: '0 auto',
    padding: 'D C',             // 24px top/bottom, 16px left/right
    width: '100%',

    // Sort bar — always visible
    SortBar: { extends: 'SortBar' },

    // Task list — rebuilt dynamically via renderTaskList function
    TaskList: {
      extends: 'Flex',
      flexDirection: 'column',

      onRender: (el) => {
        el.call('renderTaskList')
      },

      // Re-render whenever root state changes (tasks, sort config)
      onUpdate: (el) => {
        el.call('renderTaskList')
      },
    },
  },

  // Modal overlay — fixed, full-screen, hidden by default
  // Shown/hidden via DOM ID to avoid reactive display issues
  FormOverlay: {
    id: 'form-overlay',
    extends: 'Flex',
    flexAlign: 'center center',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'overlay',
    display: 'none',
    zIndex: '1000',

    // Close on backdrop click
    onClick: (e, el) => {
      // Only close if the click is directly on the overlay (not bubbled from modal)
      if (e.target === el.node) {
        el.node.style.display = 'none'
      }
    },

    Modal: { extends: 'TaskFormModal' },
  },
}
