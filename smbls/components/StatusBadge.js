// Presentation layer — pill badge for task status

// PENDING badge
export const PendingBadge = {
  extends: 'Text',
  text: 'Pending',
  fontSize: '11px',
  fontWeight: '600',
  color: 'statusPendingText',
  background: 'statusPendingBg',
  padding: '3px 8px',
  borderRadius: '14px',         // Airbnb badge radius
  letterSpacing: '0.2px',
}

// DONE badge
export const DoneBadge = {
  extends: 'Text',
  text: 'Done',
  fontSize: '11px',
  fontWeight: '600',
  color: 'statusDoneText',
  background: 'statusDoneBg',
  padding: '3px 8px',
  borderRadius: '14px',
  letterSpacing: '0.2px',
}
