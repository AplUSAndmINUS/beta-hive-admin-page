import React from 'react';

import ButtonsRow from 'src/components/form-elements/buttons/buttons-row';

interface FormSectionProps {
  title: string;
  isLoading: boolean;
  error?: string;
  isSaved: boolean;
  children: React.ReactNode;
  onSubmit: () => void;
  onReset: () => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  isLoading,
  error,
  isSaved,
  children,
  onSubmit,
  onReset,
}) => {
  return (
    <div className='form-section'>
      <h3>{title}</h3>
      {children}
      {error && <div className='error-message'>{error}</div>}
      {isSaved && <div className='success-message'>Changes saved!</div>}
      <ButtonsRow
        handleClear={onReset}
        handleSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};
