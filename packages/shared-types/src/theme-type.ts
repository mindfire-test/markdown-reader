export type ThemeType = {
  toggle: () => Promise<boolean>;
  reset: () => Promise<void>;
};
