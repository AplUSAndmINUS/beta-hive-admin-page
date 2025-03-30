import React from 'react';

interface SaveSpinnerProps {
  error?: string | null;
  innerText?: string;
  isLoading: boolean;
  isPageLoading?: boolean;
  isSaved: boolean;
  savedText?: string;
  hasPendingChanges?: boolean;
}

export const SaveSpinner: React.FC<SaveSpinnerProps> = ({
  error,
  innerText,
  isLoading,
  isPageLoading,
  isSaved,
  savedText,
  hasPendingChanges,
}) => {
  return (
    <div className='d-flex justify-content-flex-end ms-3'>
      {isPageLoading && (
        <div className='d-flex align-items-center'>
          <div
            className='spinner-border text-primary mt-4 mb-2 me-2'
            role='status'
          />
          <p className='mt-4 me-3 fw-bold'>Loading...</p>
        </div>
      )}
      {!isPageLoading && isLoading && (
        <div className='d-flex align-items-center'>
          <div
            className='spinner-border text-primary mt-4 mb-2 me-2'
            role='status'
          />
          <p className='mt-4 me-3'>{innerText || 'Saving changes...'}</p>
        </div>
      )}
      {!isPageLoading && !isLoading && error && (
        <p className='mt-4 me-3 text-danger'>{error}</p>
      )}
      {!isPageLoading &&
        !isLoading &&
        !error &&
        isSaved &&
        !hasPendingChanges && (
          <p className='mt-4 me-3 fw-bold text-success'>
            {savedText || 'Changes saved!'}
          </p>
        )}
      {!isPageLoading && !isLoading && !error && hasPendingChanges && (
        <p className='mt-4 me-3 text-muted'>Changes pending...</p>
      )}
    </div>
  );
};

export default SaveSpinner;
