export const btnClass =
  'px-2.5 py-1 text-xs rounded border border-border-theme bg-surface text-text-muted hover:text-text-base hover:bg-accent-bg transition-colors';

export const CALLOUT_MAP: Record<string, { icon: string; label: string }> = {
  NOTE: { icon: 'ℹ️', label: 'Note' },
  WARNING: { icon: '⚠️', label: 'Warning' },
  TIP: { icon: '💡', label: 'Tip' },
  IMPORTANT: { icon: '📢', label: 'Important' },
  CAUTION: { icon: '🛑', label: 'Caution' },
};
