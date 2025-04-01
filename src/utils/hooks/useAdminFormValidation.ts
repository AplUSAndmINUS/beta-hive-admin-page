import { useFormValidation } from './useFormValidation';

export const useAdminFormValidation = () => {
  const validationRules = {
    battleName: (value: string) => {
      if (!value) return 'Battle name is required';
      if (value.length < 5) return 'Battle name must be at least 5 characters';
      return undefined;
    },
    minWordCount: (value: number) => {
      if (!value) return 'Minimum word count is required';
      if (value < 1) return 'Minimum word count must be greater than 0';
      return undefined;
    },
    maxWordCount: (value: number) => {
      if (!value) return 'Maximum word count is required';
      if (value < 1) return 'Maximum word count must be greater than 0';
      return undefined;
    },
    minPromptSelections: (value: number) => {
      if (!value) return 'Minimum prompt selections is required';
      if (value < 1) return 'Minimum prompt selections must be greater than 0';
      return undefined;
    },
    numOfLosses: (value: number) => {
      if (!value) return 'Number of losses is required';
      if (value < 1) return 'Number of losses must be greater than 0';
      return undefined;
    },
    prompts: (value: any[]) => {
      if (!value || value.length === 0)
        return 'At least one prompt is required';
      if (value.some((prompt) => !prompt.name || !prompt.description))
        return 'All prompts must have both a name and description';
      return undefined;
    },
    contentWarnings: (value: any[]) => {
      if (!value || value.length === 0)
        return 'At least one content warning is required';
      if (value.some((warning) => !warning.name))
        return 'All content warnings must have a name';
      return undefined;
    },
  };

  const {
    errors,
    validate,
    validateAll,
    touchedFields,
    setTouchedFields,
    setErrors,
  } = useFormValidation(validationRules);

  const validateWordCounts = (min: number, max: number) => {
    if (min >= max) {
      return 'Minimum word count must be less than maximum word count';
    }
    return undefined;
  };

  return {
    errors,
    validate,
    validateAll,
    touchedFields,
    setTouchedFields,
    validateWordCounts,
    setErrors,
  };
};
