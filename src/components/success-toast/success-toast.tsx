import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onDismiss: () => void;
}

export const SuccessToast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onDismiss,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className='toast show shadow-sm'
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className={`toast-header bg-${type} text-white mt-4`}>
        <strong className='me-auto'>
          {type === 'success' ? 'Success' : 'Error'}
        </strong>
        <button
          type='button'
          className='btn-close btn-close-white'
          onClick={onDismiss}
          aria-label='Close'
        />
      </div>
      <div className='toast-body'>{message}</div>
    </div>
  );
};
