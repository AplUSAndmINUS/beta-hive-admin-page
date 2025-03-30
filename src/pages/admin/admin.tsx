import React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { SuccessToast } from '../../components/success-toast/success-toast';
import { useAdminFormValidation } from '../../utils/hooks/useAdminFormValidation';
import { ThunkResponse } from '../../stores/middleware/admin-thunks';

import { useAppDispatch, useAppSelector } from '../../stores/store';
import {
  setBetaHIVECount,
  // setBetaHIVEs,
  setBattleName,
  setCalendarEventCount,
  // setCalendarEvents,
  setContentWarningCount,
  setContentWarnings,
  setCountdownDate,
  setMinPromptSelections,
  setNumOfLosses,
  setPromptCount,
  setPrompts,
  setMinWordCount,
  setMaxWordCount,
} from '../../stores/reducers/admin-submission';
import Accordion from '../../components/accordion/accordion';
import ButtonsRow from '../../components/form-elements/buttons/buttons-row';
import InputType from '../../components/form-elements/input/input-type';
import Modal from '../../components/modal/modal';
import SaveSpinner from '../../components/draft-save-spinner/draft-save-spinner';
import { waitForNonce } from 'src/services/apis/admin-apis';

// import {
//   betaHIVESchema,
//   gameSettingsSchema,
// } from 'src/services/models/betaHIVE-selection.types';
import {
  fetchAdminData,
  // submitBetaHIVEs,
  // submitBetaHIVECount,
  // submitCalendarEvents,
  // submitCalendarEventCount,
  // submitCountdownDate,
  submitBattleName,
  submitContentWarnings,
  submitMaxWordCount,
  submitMinPromptSelections,
  submitMinWordCount,
  submitNumOfContentWarnings,
  submitNumOfLosses,
  submitPrompts,
  submitPromptsCount,
} from 'src/stores/middleware/admin-thunks';
import { calendarSchema } from 'src/services/models/calendar.types';
import { contentWarningsSchema } from 'src/services/models/content-warnings.types';
import { promptsSchema } from 'src/services/models/prompt-selection.types';

interface LocalValues {
  battleName: string;
  minWordCount: number;
  maxWordCount: number;
  minPromptSelections: number;
  numOfLosses: number;
  prompts: promptsSchema[];
  contentWarnings: contentWarningsSchema[];
  calendarEvents?: calendarSchema[];
}

export const AdminPage: React.FC = () => {
  const {
    battleName,
    // betaHIVECount,
    // betaHIVEs,
    // calendarEventCount,
    // calendarEvents,
    contentWarningCount,
    contentWarnings,
    // countdownDate,
    minPromptSelections,
    numOfLosses,
    promptsCount,
    prompts,
    minWordCount,
    maxWordCount,
    // isCalendarEventsLoading,
    isContentWarningCountLoading,
    isPromptsLoading,
    error,
    isLoading,
    adminData,
  } = useAppSelector((state: any) => state.adminSubmission);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const {
    errors,
    validate,
    validateAll,
    touchedFields,
    setTouchedFields,
    validateWordCounts,
  } = useAdminFormValidation();

  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  // Add local state for form values
  const [localValues, setLocalValues] = React.useState<LocalValues>({
    battleName,
    minWordCount,
    maxWordCount,
    minPromptSelections,
    numOfLosses,
    prompts,
    contentWarnings,
  });

  // Update local state when Redux state changes (e.g., after API success)
  React.useEffect(() => {
    setLocalValues({
      battleName,
      minWordCount,
      maxWordCount,
      minPromptSelections,
      numOfLosses,
      prompts,
      contentWarnings,
    });
  }, [
    battleName,
    minWordCount,
    maxWordCount,
    minPromptSelections,
    numOfLosses,
    prompts,
    contentWarnings,
  ]);

  React.useEffect(() => {
    const initialize = async () => {
      const nonce = await waitForNonce();
      if (nonce) {
        console.log('Nonce fetched:', nonce);
        dispatch(fetchAdminData());
      } else {
        console.error('Failed to fetch nonce');
      }
    };

    initialize();
  }, [dispatch]);

  React.useEffect(() => {
    if (adminData) {
      console.log('Admin data fetched:', adminData);
    }
  }, [adminData]);

  const handleBlur = (fieldName: string) => {
    setTouchedFields(new Set(Array.from(touchedFields).concat(fieldName)));
  };

  const handleReset = (type: string) => {
    switch (type) {
      case 'battleName':
        dispatch(setBattleName(adminData?.battleName));
        break;
      // case 'calendarEvents':
      //   dispatch(setCalendarEventCount(adminData?.calendarEventCount || 4));
      //   dispatch(setCalendarEvents(adminData?.calendarEvents || []));
      //   break;
      case 'contentWarnings':
        dispatch(setContentWarningCount(adminData?.contentWarningCount || 4));
        dispatch(setContentWarnings(adminData?.contentWarnings || []));
        break;
      case 'prompts':
        dispatch(setPromptCount(adminData?.promptCount || 10));
        dispatch(setPrompts(adminData?.prompts || []));
        break;
      case 'wordCounts':
        dispatch(setMinWordCount(adminData?.minWordCount || 250));
        dispatch(setMaxWordCount(adminData?.maxWordCount || 1000));
        break;
      case 'minPromptSelections':
        dispatch(setMinPromptSelections(adminData?.minPromptSelections || 2));
        break;
      case 'numOfLosses':
        dispatch(setNumOfLosses(adminData?.numOfLosses || 3));
        break;
      case 'countdownDate':
        dispatch(
          setCountdownDate(adminData?.countdownDate || '2025-04-14T00:00:00')
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (type: string) => {
    try {
      // Validate all fields before submission
      const values = {
        battleName: localValues.battleName,
        minWordCount: localValues.minWordCount,
        maxWordCount: localValues.maxWordCount,
        minPromptSelections: localValues.minPromptSelections,
        numOfLosses: localValues.numOfLosses,
        prompts: localValues.prompts,
        contentWarnings: localValues.contentWarnings,
      };

      const isValid = validateAll(values);

      // Additional validation for word counts
      if (type === 'wordCounts') {
        const wordCountError = validateWordCounts(
          localValues.minWordCount,
          localValues.maxWordCount
        );
        if (wordCountError) {
          setAlertMessage(wordCountError);
          setShowModal(true);
          return;
        }
      }

      if (!isValid) {
        setAlertMessage('Please fix the validation errors before submitting.');
        setShowModal(true);
        return;
      }

      // Proceed with submission
      let result;
      switch (type) {
        case 'contentWarnings':
          result = await Promise.all([
            dispatch(submitContentWarnings(localValues.contentWarnings)),
            dispatch(submitNumOfContentWarnings(contentWarningCount)),
          ]);
          break;
        case 'battleName':
          result = await dispatch(submitBattleName(localValues.battleName));
          break;
        case 'prompts':
          result = await Promise.all([
            dispatch(submitPromptsCount(promptsCount)),
            dispatch(submitPrompts(localValues.prompts)),
          ]);
          break;
        case 'wordCounts':
          result = await Promise.all([
            dispatch(submitMinWordCount(localValues.minWordCount)),
            dispatch(submitMaxWordCount(localValues.maxWordCount)),
          ]);
          break;
        case 'minPromptSelections':
          result = await dispatch(
            submitMinPromptSelections(localValues.minPromptSelections)
          );
          break;
        case 'numOfLosses':
          result = await dispatch(submitNumOfLosses(localValues.numOfLosses));
          break;
        default:
          console.error('Unknown type:', type);
          return;
      }

      const results = Array.isArray(result)
        ? result
        : result
          ? [result]
          : (() => {
              console.error(
                'The result is not valid (null, undefined, or invalid type).'
              );
              return [];
            })();

      // Simplified error handling
      if (results.length === 0) {
        setAlertMessage('No results returned from the operation.');
        setShowModal(true);
        return;
      }

      // Check each result for errors
      for (const action of results) {
        if (action.type?.includes('rejected')) {
          setAlertMessage(
            (action.payload as ThunkResponse<any>)?.error || 'An error occurred'
          );
          setShowModal(true);
          return;
        }
        const payload = action.payload as ThunkResponse<any>;
        if (payload && !payload.success) {
          setAlertMessage(payload.error || 'An error occurred');
          setShowModal(true);
          return;
        }
      }

      // Show success toast
      setSuccessMessage(`${type} updated successfully!`);
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred while submitting the form.');
      setShowModal(true);
    }
  };

  const handleCountOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    let value = parseInt(e.target.value, 10); // Ensure the value is parsed as an integer
    if (value < 1) {
      value = 1;
    }

    switch (inputType) {
      case 'calendarEvents':
        dispatch(setCalendarEventCount(value));
        break;
      case 'contentWarnings':
        dispatch(setContentWarningCount(value));
        break;
      case 'prompts':
        dispatch(setPromptCount(value));
        break;
      case 'minWordCount':
        dispatch(setMinWordCount(value));
        break;
      case 'maxWordCount':
        dispatch(setMaxWordCount(value));
        break;
      case 'betaHIVECount':
        dispatch(setBetaHIVECount(value));
        break;
      case 'minPromptSelections':
        dispatch(setMinPromptSelections(value));
        break;
      case 'numOfLosses':
        dispatch(setNumOfLosses(value));
        break;
      case 'countdownDate':
        dispatch(setCountdownDate(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    inputType: string
  ) => {
    const { value, name } = e.target;

    // Validate the field in real-time
    validate(name, value);

    // Update local state instead of Redux
    switch (inputType) {
      case 'calendarEvents':
        setLocalValues((prev) => ({
          ...prev,
          calendarEvents:
            prev.calendarEvents?.map((item: calendarSchema, i: number) =>
              i === index ? { ...item, name: value } : item
            ) || [],
        }));
        break;
      case 'contentWarnings':
        setLocalValues((prev) => ({
          ...prev,
          contentWarnings: prev.contentWarnings.map(
            (item: contentWarningsSchema, i: number) =>
              i === index ? { ...item, name: value } : item
          ),
        }));
        break;
      case 'prompts':
        setLocalValues((prev) => ({
          ...prev,
          prompts: prev.prompts.map((item: promptsSchema, i: number) =>
            i === index ? { ...item, name: value } : item
          ),
        }));
        break;
      case 'battleName':
        setLocalValues((prev) => ({ ...prev, battleName: value }));
        break;
      case 'minWordCount':
        setLocalValues((prev) => ({ ...prev, minWordCount: parseInt(value) }));
        break;
      case 'maxWordCount':
        setLocalValues((prev) => ({ ...prev, maxWordCount: parseInt(value) }));
        break;
      case 'minPromptSelections':
        setLocalValues((prev) => ({
          ...prev,
          minPromptSelections: parseInt(value),
        }));
        break;
      case 'numOfLosses':
        setLocalValues((prev) => ({ ...prev, numOfLosses: parseInt(value) }));
        break;
      default:
        break;
    }
  };

  // Track if there are pending changes by comparing local values with Redux state
  const getHasPendingChanges = (inputType: string) => {
    switch (inputType) {
      case 'battleName':
        return localValues.battleName !== battleName;
      case 'wordCounts':
        return (
          localValues.minWordCount !== minWordCount ||
          localValues.maxWordCount !== maxWordCount
        );
      case 'minPromptSelections':
        return localValues.minPromptSelections !== minPromptSelections;
      case 'numOfLosses':
        return localValues.numOfLosses !== numOfLosses;
      case 'prompts':
        return JSON.stringify(localValues.prompts) !== JSON.stringify(prompts);
      case 'contentWarnings':
        return (
          JSON.stringify(localValues.contentWarnings) !==
          JSON.stringify(contentWarnings)
        );
      default:
        return false;
    }
  };

  const generateAccordion = (
    title: string,
    collapseNumber: string,
    value: number,
    handleCountOptions: (
      e: React.ChangeEvent<HTMLInputElement>,
      inputType: string
    ) => void,
    inputType: string,
    labelPrefix: string,
    max: string,
    isLoading: boolean,
    isSaved: boolean,
    values: any[],
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      inputType: string
    ) => void,
    handleReset: () => void,
    type: string,
    showCountInput: boolean = true
  ) => {
    return (
      <div className='row'>
        <Accordion accordionTerms={title} collapseNumber={collapseNumber}>
          {showCountInput && (
            <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
              <InputType
                name='input'
                value={value}
                isDisabled={false}
                label={`How many ${title.toLowerCase()} would you like?`}
                isRequired
                onChange={(e) => handleCountOptions(e, inputType)}
                type={type}
                pattern={type === 'number' ? '[0-9]*' : undefined}
                min={type === 'number' ? '1' : undefined}
                max={type === 'number' ? max : undefined}
              />
            </div>
          )}
          {generateInputFields(
            value,
            labelPrefix,
            values,
            handleChange,
            inputType,
            type
          )}
          <SaveSpinner
            isLoading={isLoading}
            isSaved={isSaved}
            savedText='Changes saved!'
            hasPendingChanges={getHasPendingChanges(inputType)}
          />
          <ButtonsRow
            handleClear={handleReset}
            handleSubmit={() => handleSubmit(inputType)}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </Accordion>
      </div>
    );
  };

  const generateInputFields = (
    count: number,
    labelPrefix: string,
    values: any[],
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      inputType: string
    ) => void,
    inputType: string,
    type: string
  ) => {
    return Array.from({ length: Math.ceil(count / 2) }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className='d-flex flex-row flex-wrap justify-content-between'
      >
        {Array.from({ length: 2 }).map((_, colIndex) => {
          const index = rowIndex * 2 + colIndex;
          if (index < count) {
            const value =
              typeof values[index] === 'object'
                ? values[index]?.name
                : values[index];
            return (
              <InputType
                key={`${labelPrefix}${index + 1}`}
                name={`${labelPrefix}${index + 1}`}
                calendarDate={
                  inputType === 'calendarEvents' ? values[index]?.date : ''
                }
                value={value || ''}
                valueDesc={
                  inputType === 'prompts' || inputType === 'calendarEvents'
                    ? values[index]?.description
                    : ''
                }
                onChange={(e) => handleChange(e, index, inputType)}
                onBlur={() => handleBlur(`${labelPrefix}${index + 1}`)}
                isDisabled={false}
                isRequired
                label={`${labelPrefix} ${index + 1}`}
                imgName={labelPrefix === 'HIVE' ? values[index]?.imgSource : ''}
                isCalendar={inputType === 'calendarEvents'}
                isPrompts={inputType === 'prompts'}
                isImageUpload={labelPrefix === 'HIVE'}
                type={type}
                error={errors[`${labelPrefix}${index + 1}`]}
                isTouched={touchedFields.has(`${labelPrefix}${index + 1}`)}
              />
            );
          }
          return null;
        })}
      </div>
    ));
  };

  return (
    <ErrorBoundary>
      {isLoading ? (
        <SaveSpinner
          isPageLoading={isLoading}
          isLoading={false}
          isSaved={false}
        />
      ) : (
        <div className='container-fluid'>
          <div className='row'>
            <h1 className='bd-title pb-2 mt-4 mb-4'>HIVE Admin</h1>
            <p>
              Fill out all the required fields marked with a red asterisk in
              each of the sections. <br />
              You may close each accordion once completed to help you as you
              fill out the form.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Beta HIVE count not needed
            {/* Countdown date not needed 
            <div className='row'>
              <Accordion
                accordionTerms='Countdown date'
                collapseNumber='collapseOne'
              >
                <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
                  <InputType
                    name='countdownDate'
                    value={moment(countdownDate).format('YYYY-MM-DD')}
                    isDisabled={false}
                    label='Countdown date'
                    isRequired
                    onChange={(e) => dispatch(setCountdownDate(e.target.value))}
                    type='date'
                  />
                </div>
                <SaveSpinner
                  isLoading={false}
                  isSaved={false}
                  savedText='Changes saved!'
                />
                <ButtonsRow
                  handleClear={() => handleReset('countdownDate')}
                  handleSubmit={() => handleSubmit('countdownDate')}
                />
              </Accordion>
            </div> */}
            {generateAccordion(
              'Min / Max word counts',
              'collapseTwo',
              2, // Number of inputs (min and max word counts)
              handleCountOptions,
              'wordCounts',
              'Word Count',
              '10000', // Max value for word counts
              false, // isLoading
              true, // isSaved
              [localValues.minWordCount, localValues.maxWordCount], // Values for min and max word counts
              (e, index) => {
                const value = parseInt(e.target.value, 10); // Parse as integer
                if (index === 0) {
                  setLocalValues((prev) => ({ ...prev, minWordCount: value }));
                } else {
                  setLocalValues((prev) => ({ ...prev, maxWordCount: value }));
                }
              },
              () => handleReset('wordCounts'),
              'number', // Input type
              false // Do not show "How many..." input
            )}

            {generateAccordion(
              'Minimum prompt selections',
              'collapseThree',
              1, // Single input for minimum prompt selections
              handleCountOptions,
              'minPromptSelections',
              'Prompt Selections',
              '10', // Max value for minimum prompt selections
              false, // isLoading
              true, // isSaved
              [localValues.minPromptSelections], // Value for minimum prompt selections
              (e) =>
                setLocalValues((prev) => ({
                  ...prev,
                  minPromptSelections: parseInt(e.target.value),
                })),
              () => handleReset('minPromptSelections'),
              'number', // Input type
              false // Do not show "How many..." input
            )}

            {generateAccordion(
              'Battle name',
              'collapseThree',
              1, // Single input for battle name
              handleCountOptions,
              'battleName',
              'Battle Name',
              '', // No max value for text input
              false, // isLoading
              true, // isSaved
              [localValues.battleName], // Value for battle name
              (e) =>
                setLocalValues((prev) => ({
                  ...prev,
                  battleName: e.target.value,
                })),
              () => handleReset('battleName'),
              'text', // Input type
              false // Do not show "How many..." input
            )}

            {generateAccordion(
              'Story losses count',
              'collapseThree',
              1, // Single input for story losses count
              handleCountOptions,
              'numOfLosses',
              'Losses Count',
              '10', // Max value for story losses count
              false, // isLoading
              true, // isSaved
              [localValues.numOfLosses], // Value for story losses count
              (e) =>
                setLocalValues((prev) => ({
                  ...prev,
                  numOfLosses: parseInt(e.target.value),
                })),
              () => handleReset('numOfLosses'),
              'number', // Input type
              false // Do not show "How many..." input
            )}

            {/* Calendar Events not needed
            {generateAccordion(
              'Calendar events',
              'collapseFour',
              calendarEventCount,
              handleCountOptions,
              'calendarEvents',
              'Event',
              '4',
              isCalendarEventsLoading,
              !isCalendarEventsLoading && !error,
              calendarEvents,
              handleChange,
              () => handleReset('calendarEvents'),
              'date' // Pass the type
            )} */}

            {generateAccordion(
              'Prompts',
              'collapseSix',
              promptsCount,
              handleCountOptions,
              'prompts',
              'Prompt',
              '255',
              isPromptsLoading,
              !isPromptsLoading && !error,
              localValues.prompts,
              handleChange,
              () => handleReset('prompts'),
              'text' // Pass the type
            )}

            {generateAccordion(
              'Content warnings',
              'collapseSeven',
              contentWarningCount || 4,
              handleCountOptions,
              'contentWarnings',
              'CW',
              '255',
              isContentWarningCountLoading,
              !isContentWarningCountLoading && !error,
              localValues.contentWarnings,
              handleChange,
              () => handleReset('contentWarnings'),
              'text' // Pass the type
            )}
          </form>
          {showModal && (
            <Modal
              alertMessage={alertMessage}
              onDismiss={() => setShowModal(false)}
            />
          )}
          {showSuccessToast && (
            <SuccessToast
              message={successMessage}
              onDismiss={() => setShowSuccessToast(false)}
            />
          )}
        </div>
      )}
    </ErrorBoundary>
  );
};

export default AdminPage;
