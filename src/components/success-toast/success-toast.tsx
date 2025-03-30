import React from 'react';

interface SuccessToastProps {
  message: string;
  duration?: number;
  onDismiss: () => void;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  message,
  duration = 3000,
  onDismiss,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div className='success-toast'>
      <span>{message}</span>
    </div>
  );
};
