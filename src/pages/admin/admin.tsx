import React from 'react';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../../../shared/stores/store';
import {
  setBetaHIVECount,
  setBetaHIVEs,
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
} from '../../../../shared/stores/reducers/admin-submission';
import Accordion from '../../../../shared/components/accordion/accordion';
import ButtonsRow from '../../../../shared/components/form-elements/buttons/buttons-row';
import InputType from '../../../../shared/components/form-elements/input/input-type';
import Modal from '../../../../shared/components/modal/modal';
import SaveSpinner from '../../../../shared/components/draft-save-spinner/draft-save-spinner';

export const AdminPage: React.FC = () => {
  const {
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
  } = useAppSelector((state) => state.adminSubmission);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [isBetaHiveLoading, setIsBetaHiveLoading] =
    React.useState<boolean>(false);
  const [isBetaHiveSaved, setIsBetaHiveSaved] = React.useState<boolean>(false);
  const [isCalendarEventsLoading, setIsCalendarEventsLoading] =
    React.useState<boolean>(false);
  const [isCalendarEventsSaved, setIsCalendarEventsSaved] =
    React.useState<boolean>(false);
  const [isContentWarningsLoading, setIsContentWarningsLoading] =
    React.useState<boolean>(false);
  const [isContentWarningsSaved, setIsContentWarningsSaved] =
    React.useState<boolean>(false);
  const [isPromptsLoading, setIsPromptsLoading] =
    React.useState<boolean>(false);
  const [isPromptsSaved, setIsPromptsSaved] = React.useState<boolean>(false);

  const handleCountOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    let value = parseInt(e.target.value);
    if (value < 1) {
      value = 1;
    }

    switch (inputType) {
      case 'betaHiveOptions':
        dispatch(setBetaHIVECount(value));
        setIsBetaHiveLoading(true);
        setTimeout(() => {
          setIsBetaHiveLoading(false);
          setIsBetaHiveSaved(true);
        }, 2500); // Simulate saving delay
        break;
      case 'calendarEvents':
        dispatch(setCalendarEventCount(value));
        setIsCalendarEventsLoading(true);
        setTimeout(() => {
          setIsCalendarEventsLoading(false);
          setIsCalendarEventsSaved(true);
        }, 2500); // Simulate saving delay
        break;
      case 'contentWarnings':
        dispatch(setContentWarningCount(value));
        setIsContentWarningsLoading(true);
        setTimeout(() => {
          setIsContentWarningsLoading(false);
          setIsContentWarningsSaved(true);
        }, 2500); // Simulate saving delay
        break;
      case 'prompts':
        dispatch(setPromptCount(value));
        setIsPromptsLoading(true);
        setTimeout(() => {
          setIsPromptsLoading(false);
          setIsPromptsSaved(true);
        }, 2500); // Simulate saving delay
        break;
      default:
        break;
    }
  };

  const validateSubmission = (): boolean => {
    if (
      betaHIVEs.length === 0 ||
      prompts.length === 0 ||
      contentWarnings.length === 0
    ) {
      setAlertMessage('All fields must be filled out.');
      setShowModal(true);
      return false;
    }

    if (betaHIVECount !== betaHIVEs.length) {
      setAlertMessage(
        'The number of HIVE options does not match the expected length.'
      );
      setShowModal(true);
      return false;
    }

    if (promptsCount !== prompts.length) {
      setAlertMessage(
        'The number of prompts does not match the expected length.'
      );
      setShowModal(true);
      return false;
    }

    if (calendarEventCount !== calendarEvents.length) {
      setAlertMessage(
        'The number of calendar events does not match the expected length.'
      );
      setShowModal(true);
      return false;
    }

    if (moment(countdownDate) <= moment()) {
      setAlertMessage('Countdown date must be in the future.');
      setShowModal(true);
      return false;
    }

    if (contentWarningCount !== contentWarnings.length) {
      setAlertMessage(
        'The number of content warnings does not match the expected length.'
      );
      setShowModal(true);
      return false;
    }

    if (minWordCount <= 9) {
      setAlertMessage('Min word count must be at least 10.');
      setShowModal(true);
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    inputType: string
  ) => {
    const { value } = e.target;
    switch (inputType) {
      case 'betaHiveOptions':
        dispatch(
          setBetaHIVEs(
            betaHIVEs.map((item, i) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      case 'calendarEvents':
        dispatch(
          setCalendarEvents(
            calendarEvents.map((item, i) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      case 'contentWarnings':
        dispatch(
          setContentWarnings(
            contentWarnings.map((item, i) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      case 'prompts':
        dispatch(
          setPrompts(
            prompts.map((item, i) =>
              i === index ? { ...item, name: value } : item
            )
          )
        );
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    dispatch(
      setBetaHIVECount(4),
      setContentWarningCount(4),
      setNumOfLosses(3),
      setPromptCount(10),
      setCountdownDate(moment().format('YYYY-MM-DD')),
      setMinWordCount(500),
      setMaxWordCount(1000)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateSubmission()) {
      // Proceed with submission
      console.log('HIVE options:', betaHIVEs);
      console.log('Prompts:', prompts);
      console.log('Content warnings:', contentWarnings);
      console.log('Min word count:', minWordCount);
      console.log('Max word count:', maxWordCount);
      console.log('Countdown date:', countdownDate);
      console.log('Form submitted');
    } else {
      console.log('Submission is invalid. Please fill out all fields.');
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
    ) => void
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

  return (
    <div className='container-fluid'>
      <div className='row'>
        <h1 className='bd-title pb-2 mt-4 mb-4'>Admin</h1>
        <p>
          Fill out all the fields marked with a red asterisk in each of the
          sections. <br />
          You may close each accordion once completed to help you as you fill
          out the form.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
                      ? setMinWordCount(10)
                      : setMinWordCount(parseInt(e.target.value))
                  )
                }
                type='number'
              />
            </div>
            <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
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
          isCalendarEventsSaved,
          calendarEvents,
          handleChange
        )}
        {generateAccordion(
          'HIVE options',
          'collapseFive',
          betaHIVECount,
          handleCountOptions,
          'betaHiveOptions',
          'HIVE',
          '100',
          isBetaHiveLoading,
          isBetaHiveSaved,
          betaHIVEs,
          handleChange
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
          isPromptsSaved,
          prompts,
          handleChange
        )}
        {generateAccordion(
          'Content warnings',
          'collapseSeven',
          contentWarningCount,
          handleCountOptions,
          'contentWarnings',
          'CW',
          '255',
          isContentWarningsLoading,
          isContentWarningsSaved,
          contentWarnings,
          handleChange
        )}
        <div className='row'>
          <ButtonsRow handleClear={handleClear} handleSubmit={handleSubmit} />
        </div>
      </form>

      {showModal && (
        <Modal
          alertMessage={alertMessage}
          onDismiss={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
