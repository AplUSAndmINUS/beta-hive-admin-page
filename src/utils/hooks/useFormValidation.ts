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
    console.log(`Single field validation for ${fieldName}:`, { value });
    const validationRule = rules[fieldName];
    if (validationRule) {
      const error = validationRule(value);
      console.log(`Validation result for ${fieldName}:`, { error });
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

    console.log('Starting validateAll with values:', values);
    console.log('Available validation rules:', Object.keys(rules));

    Object.keys(rules).forEach((fieldName) => {
      console.log(`Validating ${fieldName}:`, {
        value: values[fieldName],
        fieldExists: fieldName in values,
        valueType: typeof values[fieldName],
      });

      const error = rules[fieldName](values[fieldName]);
      console.log(`Validation result for ${fieldName}:`, error);

      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    console.log('Final validation state:', {
      isValid,
      errors: newErrors,
      fieldsThatFailed: Object.keys(newErrors),
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
