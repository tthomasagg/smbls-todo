// AirBnB-inspired design system tokens
// Based on DESIGN.md — palette-based token system

const COLOR = {
  // Brand — Rausch Red is the ONLY accent, used sparingly for CTAs
  primary: '#ff385c',        // Rausch Red — primary CTAs, brand accent
  primaryDark: '#e00b41',    // Deep Rausch — pressed/hover variant
  errorRed: '#c13515',       // Error text on light backgrounds

  // Text — warm near-black, never pure #000
  textPrimary: '#222222',    // Primary text (warm near-black)
  textSecondary: '#6a6a6a',  // Secondary / descriptive text
  textDisabled: 'rgba(0,0,0,0.24)',
  white: '#ffffff',

  // Surfaces
  pageBg: '#ffffff',
  cardBg: '#ffffff',
  surface: '#f2f2f2',        // Circular nav buttons, secondary surfaces
  formBg: '#ffffff',

  // Borders & dividers
  borderGray: '#c1c1c1',
  borderLight: 'rgba(0,0,0,0.08)',

  // Overlay (modal backdrop)
  overlay: 'rgba(0,0,0,0.5)',

  // Status indicators for tasks
  statusPending: '#ff9800',
  statusDone: '#22c55e',
  statusPendingBg: 'rgba(255,152,0,0.12)',
  statusDoneBg: 'rgba(34,197,94,0.12)',
  statusDoneText: '#15803d',
  statusPendingText: '#c45e00',

  // White color variants — opacity modifier forbidden on `color` prop,
  // so named tokens are required for semi-transparent whites
  whiteMuted: 'rgba(255,255,255,0.8)',
}

export default { COLOR }
