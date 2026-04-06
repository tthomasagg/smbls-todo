// Presentation layer — top navigation bar, Airbnb-style sticky white header

export const AppHeader = {
  extends: 'Flex',
  tag: 'header',
  background: 'white',
  flexAlign: 'center space-between',
  padding: 'C D',          // 16px top/bottom, 24px left/right
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'borderLight',
  position: 'sticky',
  top: '0',
  zIndex: '100',

  // Airbnb wordmark / app title
  Brand: {
    extends: 'Flex',
    flexAlign: 'center center',
    gap: 'A',

    Logo: {
      extends: 'Svg',
      // Airbnb-style checkmark-in-circle icon in Rausch Red
      viewBox: '0 0 32 32',
      width: '28',
      height: '28',
      html: '<circle cx="16" cy="16" r="15" fill="#ff385c"/><path d="M10 16l4 4 8-8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    },

    Title: {
      extends: 'Text',
      tag: 'h1',
      text: 'My Tasks',
      fontSize: '22px',
      fontWeight: '700',
      color: 'textPrimary',
      letterSpacing: '-0.44px',
    },
  },

  // Primary CTA — "Add Task" button, Airbnb dark button style
  AddBtn: {
    extends: 'Flex',
    tag: 'button',
    flexAlign: 'center center',
    gap: 'A',
    background: 'textPrimary',    // near-black per Airbnb primary dark button
    color: 'white',
    padding: 'B D',               // 8px top/bottom, 24px left/right
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',

    PlusIcon: {
      extends: 'Svg',
      viewBox: '0 0 24 24',
      width: '18',
      height: '18',
      html: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    },

    Label: {
      extends: 'Text',
      text: 'Add Task',
    },

    onClick: (e, el, s) => {
      // Reset form fields for a fresh "create" flow
      s.root.update({
        editingTaskId: null,
        formTitle: '',
        formDescription: '',
        formDueDate: new Date().toISOString().split('T')[0],
        formStatus: 'PENDING',
        formErrors: [],
      })
      // Show form overlay via DOM ID (avoids reactive display issues)
      const overlay = document.getElementById('form-overlay')
      if (overlay) overlay.style.display = 'flex'
    },
  },
}
