import React from 'react';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../stores/store';
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
} from '../../stores/reducers/admin-submission';
import Accordion from '../../components/accordion/accordion';
import ButtonsRow from '../../components/form-elements/buttons/buttons-row';
import InputType from '../../components/form-elements/input/input-type';
import Modal from '../../components/modal/modal';
import SaveSpinner from '../../components/draft-save-spinner/draft-save-spinner';

import { betaHIVESchema, gameSettingsSchema } from 'src/services/models/betaHIVE-selection.types';
import { calendarSchema } from 'src/services/models/calendar.types';
import { contentWarningsSchema } from 'src/services/models/content-warnings.types';
import { promptsSchema } from 'src/services/models/prompt-selection.types';
import { getAllGameContent } from 'src/services/apis/admin-apis';

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
  } = useAppSelector((state: any) => state.adminSubmission);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);

  // const [isBetaHiveLoading, setIsBetaHiveLoading] =
  // React.useState<boolean>(false);
  // const [isBetaHiveSaved, setIsBetaHiveSaved] = React.useState<boolean>(false);
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
  const [adminData, setAdminData] = React.useState<gameSettingsSchema | null>(null);
  const [isAdminDataLoading, setIsAdminDataLoading] =
    React.useState<boolean>(true);
  
  React.useEffect(() => {
    const fetchAdminData = async () => {
      setIsAdminDataLoading(true);
      console.log('Fetching admin data...');

      try {
        const response = await getAllGameContent(); 
        if (response) {
          const data = response;
          setAdminData(data);
          console.log('Admin data received 200:', data); // Log the fetched data
        } else {
          const data = null;
          setAdminData(data);
        }
      } catch (error) {
        console.error('Error fetching admin data from fetchAdminData():', error);
        setAdminData(null);
      } finally {
        setIsAdminDataLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleCalendarEventsReset = () => {
    dispatch(setCalendarEventCount(4));
    dispatch(setCalendarEvents(adminData?.calendarEvents || []));
    setIsCalendarEventsSaved(false);
  };

  const handleContentWarningsReset = () => {
    dispatch(setContentWarningCount(4));
    dispatch(setContentWarnings(adminData?.contentWarnings || []));
    setIsContentWarningsSaved(false);
  };

  const handlePromptsReset = () => {
    dispatch(setPromptCount(10));
    dispatch(setPrompts(adminData?.prompts || []));
    setIsPromptsSaved(false);
  };

  const handleCalendarEventsSubmit = (submitData: calendarSchema[]) => {
    dispatch(setCalendarEvents(submitData));
    setIsCalendarEventsSaved(true);
  };

  const handleContentWarningsSubmit = (submitData: contentWarningsSchema[]) => {
    dispatch(setContentWarnings(submitData));
    setIsContentWarningsSaved(true);
  };

  const handlePromptsSubmit = (submitData: promptsSchema[]) => {
    dispatch(setPrompts(submitData));
    setIsPromptsSaved(true);
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
      // case 'betaHiveOptions': 
      //   dispatch(setBetaHIVECount(value));
      //   setIsBetaHiveLoading(true);
      //   setTimeout(() => {
      //     setIsBetaHiveLoading(false);
      //     setIsBetaHiveSaved(true);
      //   }, 2500); // Simulate saving delay
      //   break;
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

    // if (betaHIVECount !== betaHIVEs.length) {
    //   setAlertMessage(
    //     'The number of HIVE options does not match the expected length.'
    //   );
    //   setShowModal(true);
    //   return false;
    // }

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
      // case 'betaHiveOptions':
      //   dispatch(
      //     setBetaHIVEs(
      //       betaHIVEs.map((item: betaHIVESchema, i: number) =>
      //         i === index ? { ...item, name: value } : item
      //       )
      //     )
      //   );
      //   break;
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
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
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
          <ButtonsRow handleClear={handleReset} handleSubmit={handleSubmit} />
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

  return isAdminDataLoading ? (
    <>
      <SaveSpinner isPageLoading={isAdminDataLoading} isLoading={false} isSaved={false} />
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
                        ? setMinWordCount(250)
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
            handleChange,
            (e) => {
              e.preventDefault();
              handleCalendarEventsSubmit(calendarEvents);
            },
            handleCalendarEventsReset
          )}
          {/* {generateAccordion(
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
        )} No Beta hive options for now */}
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
            handleChange,
            (e) => {
              e.preventDefault();
              handlePromptsSubmit(prompts);
            },
            handlePromptsReset
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
            handleChange,
            (e) => {
              e.preventDefault();
              handleContentWarningsSubmit(contentWarnings);
            },
            handleContentWarningsReset
          )}
        </form>

        {showModal && (
          <Modal
            alertMessage={alertMessage}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </div>
    );
  }
};

export default AdminPage;
