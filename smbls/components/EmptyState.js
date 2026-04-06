// Presentation layer — empty task list placeholder

export const EmptyState = {
  extends: 'Flex',
  flexDirection: 'column',
  flexAlign: 'center center',
  padding: 'E',
  gap: 'B',

  Illustration: {
    extends: 'Svg',
    viewBox: '0 0 80 80',
    width: '80',
    height: '80',
    html: `
      <rect x="10" y="15" width="60" height="50" rx="8" fill="#f2f2f2"/>
      <rect x="20" y="28" width="40" height="4" rx="2" fill="#c1c1c1"/>
      <rect x="20" y="38" width="30" height="4" rx="2" fill="#c1c1c1"/>
      <rect x="20" y="48" width="20" height="4" rx="2" fill="#c1c1c1"/>
      <circle cx="58" cy="55" r="14" fill="#ff385c"/>
      <path d="M52 55h12M58 49v12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    `,
  },

  Heading: {
    extends: 'Text',
    tag: 'p',
    text: 'No tasks yet',
    fontSize: '20px',
    fontWeight: '600',
    color: 'textPrimary',
    textAlign: 'center',
  },

  Sub: {
    extends: 'Text',
    tag: 'p',
    text: 'Click "Add Task" to create your first task.',
    fontSize: '14px',
    color: 'textSecondary',
    textAlign: 'center',
  },
}
