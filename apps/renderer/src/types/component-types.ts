export interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export interface ReaderProps {
  html: string;
}

export interface WelcomeProps {
  onOpen: () => void;
}
