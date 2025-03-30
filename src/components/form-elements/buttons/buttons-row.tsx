import React from 'react';

interface ButtonsRowProps {
  children?: React.ReactNode;
  handleClear: () => void;
  handleSubmit: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({
  children,
  handleClear,
  handleSubmit,
  isDisabled = false,
  isLoading = false,
}) => {
  return (
    <div className='d-flex flex-row justify-content-start mt-2 mb-2'>
      {children ? (
        children
      ) : (
        <>
          <button
            type='button'
            className='btn btn-primary mt-3'
            onClick={handleSubmit}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                  aria-hidden='true'
                ></span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mt-3 ms-3'
            onClick={handleClear}
            disabled={isDisabled || isLoading}
          >
            Reset Form
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonsRow;
