export interface ToastrOptions {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  duration?: number;
}