import React from 'react';

interface ButtonsRowProps {
  children?: React.ReactNode;
  handleClear: () => void;
  handleSubmit: () => void;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({
  children,
  handleClear,
  handleSubmit,
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
          >
            Save Changes
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mt-3 ms-3'
            onClick={handleClear}
          >
            Reset Form
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonsRow;
