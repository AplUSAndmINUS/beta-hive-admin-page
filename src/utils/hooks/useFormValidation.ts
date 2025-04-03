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

  const validateAll = (values: Record<string, any>, section?: string) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    console.log('Starting validateAll with:', {
      section,
      values,
      availableRules: Object.keys(rules),
    });

    // Determine which fields to validate based on section
    const fieldsToValidate = section
      ? getFieldsForSection(section)
      : Object.keys(rules);
    console.log('Fields to validate:', fieldsToValidate);

    fieldsToValidate.forEach((fieldName) => {
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

  // Helper function to determine which fields to validate
  const getFieldsForSection = (section: string): string[] => {
    switch (section) {
      case 'wordCounts':
        return ['minWordCount', 'maxWordCount'];
      case 'battleName':
        return ['battleName'];
      case 'prompts':
        return ['prompts'];
      case 'contentWarnings':
        return ['contentWarnings'];
      case 'minPromptSelections':
        return ['minPromptSelections'];
      case 'numOfLosses':
        return ['numOfLosses'];
      default:
        return Object.keys(rules);
    }
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
