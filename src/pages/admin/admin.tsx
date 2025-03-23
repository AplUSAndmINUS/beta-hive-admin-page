import React from 'react';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../stores/store';
import {
  setBetaHIVECount,
  setBetaHIVEs,
  setBattleName,
  setCalendarEventCount,
  setCalendarEvents,
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

import {
  betaHIVESchema,
  gameSettingsSchema,
} from 'src/services/models/betaHIVE-selection.types';
import {
  fetchAdminData,
  submitBattleName,
  submitCalendarEvents,
  submitCalendarEventCount,
  submitContentWarnings,
  submitCountdownDate,
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

export const AdminPage: React.FC = () => {
  const {
    battleName,
    betaHIVECount,
    betaHIVEs,
    calendarEventCount,
    calendarEvents,
    contentWarningCount,
    contentWarnings,
    countdownDate,
    minPromptSelections,
    numOfLosses,
    promptsCount,
    prompts,
    minWordCount,
    maxWordCount,
    isCalendarEventsLoading,
    isContentWarningCountLoading,
    isPromptsLoading,
    error,
    isLoading,
    adminData,
  } = useAppSelector((state: any) => state.adminSubmission);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  const validateSubmission = (type: string): boolean => {
    
    switch (type) {
      case 'calendarEvents':
        if (calendarEvents.length < 1) {
          setAlertMessage('Please add at least one calendar event.');
          setShowModal(true);
          return false;
        }

        if (calendarEventCount !== calendarEvents.length) {
          dispatch(setCalendarEventCount(calendarEvents.length));
        }
        
        return true;
      case 'contentWarnings':
        if (contentWarnings.length < 1) {
          setAlertMessage('Please add at least one content warning.');
          setShowModal(true);
          return false;
        }

        if (contentWarningCount !== contentWarnings.length) {
          dispatch(setContentWarningCount(contentWarnings.length));
        }
        
        return true;
      case 'prompts':
        if (prompts.length < 1) {
          setAlertMessage('Please add at least one prompt.');
          setShowModal(true);
          return false;
        }

        if (promptsCount !== prompts.length) {
          dispatch(setPromptCount(prompts.length));
        }
        
        return true;
      case 'wordCounts':
        if (!minWordCount || !maxWordCount) {
          setAlertMessage('Please add a min and max word count.');
          setShowModal(true);
          return false;
        }

        if (minWordCount >= maxWordCount) {
          setAlertMessage(
            'Minimum word count must be less than maximum word count.'
          );
          setShowModal(true);
          return false;
        }
        
        return true;
      case 'battleName':
        if (battleName.length < 5 || battleName === '') {
          setAlertMessage('Please add a battle name with at least 5 characters.');
          setShowModal(true);
          return false;
        }
        
        return true;
      case 'minPromptSelections':
        if (minPromptSelections < 1) {
          setAlertMessage('Please add a minimum prompt selection.');
          setShowModal(true);
          return false;
        }
        
        return true;
      case 'numOfLosses':
        if (numOfLosses < 1) {
          setAlertMessage('Please add a number of losses.');
          setShowModal(true);
          return false;
        }
        
        return true;
      case 'countdownDate':
        if (moment(countdownDate) <= moment()) {
          setAlertMessage('Countdown date must be in the future.');
          setShowModal(true);
          return false;
        }

        if (!countdownDate) {
          setAlertMessage('Please add a countdown date.');
          setShowModal(true);
          return false;
        }
        
        return true;
      default:
        break;
    }

    return false;
  };

  const handleReset = (type: string) => {
    switch (type) {
      case 'battleName':
        dispatch(setBattleName(adminData?.battleName));
        break;
      case 'calendarEvents':
        dispatch(setCalendarEventCount(adminData?.calendarEventCount || 4));
        dispatch(setCalendarEvents(adminData?.calendarEvents || []));
        break;
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

  const handleSubmit = (type: string) => {
    if (!validateSubmission(type)) return;

    switch (type) {
      case 'calendarEvents':
        dispatch(submitCalendarEvents(calendarEvents));
        dispatch(submitCalendarEventCount(calendarEventCount));
        break;
      case 'contentWarnings':
        dispatch(submitContentWarnings(contentWarnings));
        dispatch(submitNumOfContentWarnings(contentWarningCount));
        break;
      case 'battleName':
        dispatch(submitBattleName(betaHIVEs));
        break;
      case 'countdownDate':
        dispatch(submitCountdownDate(countdownDate.toString()));
        break;
      case 'prompts':
        dispatch(submitPromptsCount(promptsCount));
        dispatch(submitPrompts(prompts));
        break;
      case 'wordCounts':
        dispatch(submitMinWordCount(minWordCount));
        dispatch(submitMaxWordCount(maxWordCount));
        break;
      case 'minPromptSelections':
        dispatch(submitMinPromptSelections(minPromptSelections));
        break;
      case 'numOfLosses':
        dispatch(submitNumOfLosses(numOfLosses));
        break;
      default:
        break;
    }

    return false;
  };

  const handleCountOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    let value = parseInt(e.target.value);
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
    const { value } = e.target;
    switch (inputType) {
      case 'calendarEvents':
        dispatch(
          setCalendarEvents(
            calendarEvents.map((item: calendarSchema, i: number) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      case 'contentWarnings':
        dispatch(
          setContentWarnings(
            contentWarnings.map((item: contentWarningsSchema, i: number) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      case 'prompts':
        dispatch(
          setPrompts(
            prompts.map((item: promptsSchema, i: number) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      default:
        break;
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
    handleReset: () => void
  ) => {
    return (
      <div className='row'>
        <Accordion accordionTerms={title} collapseNumber={collapseNumber}>
          <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
            <InputType
              name='input'
              value={value}
              isDisabled={false}
              label={`How many ${title.toLowerCase()} would you like?`}
              isRequired
              onChange={(e) => handleCountOptions(e, inputType)}
              type='number'
              pattern='[0-9]*'
              min='1'
              max={max}
            />
          </div>
          {generateInputFields(
            value,
            labelPrefix,
            values,
            handleChange,
            inputType
          )}
          <SaveSpinner
            isLoading={isLoading}
            isSaved={isSaved}
            savedText='Changes saved!'
          />
          <ButtonsRow
            handleClear={handleReset}
            handleSubmit={() => handleSubmit(inputType)}
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
    inputType: string
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
                isDisabled={false}
                isRequired
                label={`${labelPrefix} ${index + 1}`}
                imgName={labelPrefix === 'HIVE' ? values[index]?.imgSource : ''}
                isCalendar={inputType === 'calendarEvents'}
                isPrompts={inputType === 'prompts'}
                isImageUpload={labelPrefix === 'HIVE'}
              />
            );
          }
          return null;
        })}
      </div>
    ));
  };

  return isLoading ? (
    <>
      <SaveSpinner
        isPageLoading={isLoading}
        isLoading={false}
        isSaved={false}
      />
    </>
  ) : (
    <div className='container-fluid'>
      <div className='row'>
        <h1 className='bd-title pb-2 mt-4 mb-4'>HIVE Admin</h1>
        <p>
          Fill out all the required fields marked with a red asterisk in each of
          the sections. <br />
          You may close each accordion once completed to help you as you fill
          out the form.
        </p>
      </div>
      <form>
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
        </div>
        <div className='row'>
          <Accordion
            accordionTerms='Min / Max word counts'
            collapseNumber='collapseTwo'
          >
            <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
              <InputType
                name='minWordCount'
                value={minWordCount}
                isDisabled={false}
                label='What is the minimum word count for stories?'
                isRequired
                onChange={(e) =>
                  dispatch(
                    parseInt(e.target.value) <= 9
                      ? setMinWordCount(250)
                      : setMinWordCount(parseInt(e.target.value))
                  )
                }
                type='number'
              />
              <InputType
                name='maxWordCount'
                value={maxWordCount}
                isDisabled={false}
                label='What is the maximum word count for stories?'
                isRequired
                onChange={(e) =>
                  dispatch(
                    parseInt(e.target.value) > 10000
                      ? setMaxWordCount(1000)
                      : setMaxWordCount(parseInt(e.target.value))
                  )
                }
                type='number'
              />
            </div>
            <SaveSpinner
              isLoading={false}
              isSaved={false}
              savedText='Changes saved!'
            />
            <ButtonsRow
              handleClear={() => handleReset('wordCounts')}
              handleSubmit={() => handleSubmit('wordCounts')}
            />
          </Accordion>
        </div>
        <div className='row'>
          <Accordion
            accordionTerms='Minimum prompt selections'
            collapseNumber='collapseThree'
          >
            <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
              <InputType
                name='minPromptSelections'
                value={minPromptSelections}
                isDisabled={false}
                label='How many prompts at minimum must be selected?'
                isRequired
                onChange={(e) =>
                  dispatch(setMinPromptSelections(parseInt(e.target.value)))
                }
                type='number'
              />
            </div>
            <SaveSpinner
              isLoading={false}
              isSaved={false}
              savedText='Changes saved!'
            />
            <ButtonsRow
              handleClear={() => handleReset('minPromptSelections')}
              handleSubmit={() => handleSubmit('minPromptSelections')}
            />
          </Accordion>
        </div>
        <div className='row'>
          <Accordion
            accordionTerms='Story losses count'
            collapseNumber='collapseThree'
          >
            <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
              <InputType
                name='numOfLosses'
                value={numOfLosses}
                isDisabled={false}
                label='How many losses until the story is taken out of the battle?'
                isRequired
                onChange={(e) =>
                  dispatch(setNumOfLosses(parseInt(e.target.value)))
                }
                type='number'
              />
            </div>
            <SaveSpinner
              isLoading={false}
              isSaved={false}
              savedText='Changes saved!'
            />
            <ButtonsRow
              handleClear={() => handleReset('numOfLosses')}
              handleSubmit={() => handleSubmit('numOfLosses')}
            />
          </Accordion>
        </div>
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
          () => handleReset('calendarEvents')
        )}
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
          prompts,
          handleChange,
          () => handleReset('prompts')
        )}
        {generateAccordion(
          'Content warnings',
          'collapseSeven',
          contentWarningCount,
          handleCountOptions,
          'contentWarnings',
          'CW',
          '255',
          isContentWarningCountLoading,
          !isContentWarningCountLoading && !error,
          contentWarnings,
          handleChange,
          () => handleReset('contentWarnings')
        )}

        {showModal && (
          <Modal
            alertMessage={alertMessage}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AdminPage;
