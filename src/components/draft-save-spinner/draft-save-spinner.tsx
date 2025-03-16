import React from 'react';

interface SaveSpinnerProps {
  error?: string | null;
  innerText?: string;
  isLoading: boolean;
  isSaved: boolean;
  savedText?: string;
}

export const SaveSpinner: React.FC<SaveSpinnerProps> = ({
  error,
  innerText,
  isLoading,
  isSaved,
  savedText,
}) => {
  return (
    <div className='d-flex justify-content-flex-end ms-3'>
      {isLoading ? (
        <>
          <div
            className='spinner-border text-primary mt-4 mb-2 me-2'
            role='status'
          />
          <p className='mt-4 me-3'>{innerText || 'Saving your draft...'}</p>
        </>
      ) : !error ? (
        <p className='mt-4 me-3 fw-bold'>
          {isSaved ? (savedText ? savedText : 'Draft saved!') : ''}
        </p>
      ) : (
        <p className='mt-4 me-3 text-danger'>{error}</p>
      )}
    </div>
  );
};

export default SaveSpinner;
