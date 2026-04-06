// Presentation layer — sort controls bar
// Multi-column sort: primary field + direction, secondary field + direction

export const SortBar = {
  extends: 'Flex',
  flexAlign: 'center flex-start',
  gap: 'B',
  padding: 'B C',
  background: 'surface',
  borderRadius: '14px',
  marginBottom: 'C',
  flexWrap: 'wrap',

  SortLabel: {
    extends: 'Text',
    text: 'Sort by',
    fontSize: '13px',
    fontWeight: '600',
    color: 'textSecondary',
  },

  // Primary sort field selector
  PrimaryField: {
    extends: 'Input',
    tag: 'select',
    fontSize: '13px',
    fontWeight: '500',
    color: 'textPrimary',
    background: 'white',
    padding: '6px 10px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borderGray',
    cursor: 'pointer',

    children: [
      { tag: 'option', value: '', text: 'None' },
      { tag: 'option', value: 'status', text: 'Status' },
      { tag: 'option', value: 'dueDate', text: 'Due Date' },
      { tag: 'option', value: 'createdAt', text: 'Created' },
      { tag: 'option', value: 'title', text: 'Title' },
    ],

    value: (el, s) => s.root.primarySort || '',

    onChange: (e, el, s) => {
      s.root.update({ primarySort: el.node.value })
    },
  },

  // Primary direction — shown only when a primary field is selected
  PrimaryDir: {
    extends: 'Input',
    tag: 'select',
    fontSize: '13px',
    fontWeight: '500',
    color: 'textPrimary',
    background: 'white',
    padding: '6px 10px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borderGray',
    cursor: 'pointer',
    display: (el, s) => s.root.primarySort ? 'block' : 'none',

    children: [
      { tag: 'option', value: 'ASC', text: 'A → Z' },
      { tag: 'option', value: 'DESC', text: 'Z → A' },
    ],

    value: (el, s) => s.root.primaryDir || 'ASC',

    onChange: (e, el, s) => {
      s.root.update({ primaryDir: el.node.value })
    },
  },

  // "then by" separator — visible only after primary sort chosen
  ThenLabel: {
    extends: 'Text',
    text: 'then by',
    fontSize: '13px',
    color: 'textSecondary',
    display: (el, s) => s.root.primarySort ? 'block' : 'none',
  },

  // Secondary sort field
  SecondaryField: {
    extends: 'Input',
    tag: 'select',
    fontSize: '13px',
    fontWeight: '500',
    color: 'textPrimary',
    background: 'white',
    padding: '6px 10px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borderGray',
    cursor: 'pointer',
    display: (el, s) => s.root.primarySort ? 'block' : 'none',

    children: [
      { tag: 'option', value: '', text: 'None' },
      { tag: 'option', value: 'status', text: 'Status' },
      { tag: 'option', value: 'dueDate', text: 'Due Date' },
      { tag: 'option', value: 'createdAt', text: 'Created' },
      { tag: 'option', value: 'title', text: 'Title' },
    ],

    value: (el, s) => s.root.secondarySort || '',

    onChange: (e, el, s) => {
      s.root.update({ secondarySort: el.node.value })
    },
  },

  // Secondary direction — visible when secondary field chosen
  SecondaryDir: {
    extends: 'Input',
    tag: 'select',
    fontSize: '13px',
    fontWeight: '500',
    color: 'textPrimary',
    background: 'white',
    padding: '6px 10px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borderGray',
    cursor: 'pointer',
    display: (el, s) => s.root.secondarySort ? 'block' : 'none',

    children: [
      { tag: 'option', value: 'ASC', text: 'A → Z' },
      { tag: 'option', value: 'DESC', text: 'Z → A' },
    ],

    value: (el, s) => s.root.secondaryDir || 'ASC',

    onChange: (e, el, s) => {
      s.root.update({ secondaryDir: el.node.value })
    },
  },
}
