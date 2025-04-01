import React from 'react';

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = React.useState<Set<string>>(
    new Set()
  );

  const validate = (fieldName: string, value: any) => {
    const validationRule = rules[fieldName];
    if (validationRule) {
      const error = validationRule(value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error || '',
      }));
      return !error;
    }
    return true;
  };

  const validateAll = (values: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = rules[fieldName](values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    validate,
    validateAll,
    touchedFields,
    setTouchedFields,
    setErrors,
  };
};
