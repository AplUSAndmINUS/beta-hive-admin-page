import { axiosInstance } from './story-apis';

// import { CALENDAR_EVENTS, CONTENT_WARNINGS, PROMPT_SELECTIONS } from '../constants/admin-constants';
import { betaHIVESchema } from 'shared/services/models/betaHIVE-selection.types';
import { promptsSchema } from 'shared/services/models/prompt-selection.types';
import { contentWarningsSchema } from 'shared/services/models/content-warnings.types';
import { calendarSchema } from 'shared/services/models/calendar.types';

// Function to get all game content to update the Redux store w/ wp_options table
export const getAllGameContent = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/game-content');
    return response.data;
  } catch (error) {
    console.error('Error getting all game content:', error);
    return false;
  }

  // Local API Testing to get all game content
  // return true;
};

// Function to get all prompts
export const getAllPrompts = async (): Promise<promptsSchema[] | null> => {
  try {
    const response = await axiosInstance.get('/prompts');
    return response.data;
  } catch (error) {
    console.error('Error getting all prompts:', error);
    return [];
  }

  // Local API Testing to get all prompts
  // return PROMPT_SELECTIONS;
};

// Function to get content warnings
export const getContentWarnings = async (): Promise<
  contentWarningsSchema[] | null
> => {
  try {
    const response = await axiosInstance.get('/content-warnings');
    return response.data;
  } catch (error) {
    console.error('Error getting content warnings:', error);
    return [];
  }

  // Local API Testing to get content warnings
  // return CONTENT_WARNINGS;
};

// Function to get all calendar events
export const getAllCalendarEvents = async (): Promise<
  calendarSchema[] | null
> => {
  try {
    const response = await axiosInstance.get('/calendar');
    return response.data;
  } catch (error) {
    console.error('Error getting all calendar events:', error);
    return [];
  }

  // Local API Testing to get all calendar events
  // return CALENDAR_EVENTS;
};

// Function to update all calendar events
export const updateCalendarEvents = async (
  updatedEvents: calendarSchema[]
): Promise<calendarSchema[] | null> => {
  try {
    const response = await axiosInstance.put('/calendar', updatedEvents);
    return response.data;
  } catch (error) {
    console.error('Error updating calendar events:', error);
    return null;
  }

  // Local API Testing to update all calendar events
  // CALENDAR_EVENTS = updatedEvents;
  // return CALENDAR_EVENTS;
};

// Function to update all prompts
export const updatePrompts = async (
  updatedPrompts: promptsSchema[]
): Promise<promptsSchema[] | null> => {
  try {
    const response = await axiosInstance.put('/prompts', updatedPrompts);
    return response.data;
  } catch (error) {
    console.error('Error updating prompts:', error);
    return null;
  }

  // Local API Testing to update all prompts
  // PROMPT_SELECTIONS = updatedPrompts;
  // return PROMPT_SELECTIONS;
};

// Function to update content warnings
export const updateContentWarnings = async (
  updatedWarnings: contentWarningsSchema[]
): Promise<contentWarningsSchema[] | null> => {
  try {
    const response = await axiosInstance.put(
      '/content-warnings',
      updatedWarnings
    );
    return response.data;
  } catch (error) {
    console.error('Error updating content warnings:', error);
    return null;
  }

  // Local API Testing to update content warnings
  // CONTENT_WARNINGS = updatedWarnings;
  // return CONTENT_WARNINGS;
};

// Function to update number of losses
export const updateNumOfLosses = async (
  numOfLosses: number
): Promise<number | null> => {
  try {
    const response = await axiosInstance.put('/num-of-losses', { numOfLosses });
    return response.data;
  } catch (error) {
    console.error('Error updating number of losses:', error);
    return null;
  }

  // Local API Testing to update number of losses
  // const numOfLosses = 4;
  // return numOfLosses; --> Cannot be done from APIs due to store reducer needed
};

// Function to update countdown date
export const updateCountdownDate = async (
  countdownDate: string
): Promise<string | null> => {
  try {
    const response = await axiosInstance.put('/countdown-date', {
      countdownDate,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating countdown date:', error);
    return null;
  }

  // Local API Testing to update countdown date
  // const newDate = moment(countdownDate).format('YYYY-MM-DD');
  // return newDate; --> Cannot be done from APIs due to store reducer needed
};

// Function to update min word count
export const updateMinWordCount = async (
  minWordCount: number
): Promise<number | null> => {
  try {
    const response = await axiosInstance.put('/min-word-count', {
      minWordCount,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating min word count:', error);
    return null;
  }

  // Local API Testing to update min word count
  // const minWordCount = 500;
  // return minWordCount; --> Cannot be done from APIs due to store reducer needed
};

// Function to update max word count
export const updateMaxWordCount = async (
  maxWordCount: number
): Promise<number | null> => {
  try {
    const response = await axiosInstance.put('/max-word-count', {
      maxWordCount,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating max word count:', error);
    return null;
  }

  // Local API Testing to update max word count
  // const maxWordCount = 1000;
  // return maxWordCount; --> Cannot be done from APIs due to store reducer needed
};

// Function to update beta hives
export const updateBetaHIVES = async (
  updatedBetaHIVES: betaHIVESchema[]
): Promise<betaHIVESchema[] | null> => {
  try {
    const response = await axiosInstance.put('/beta-hives', updatedBetaHIVES);
    return response.data;
  } catch (error) {
    console.error('Error updating beta hives:', error);
    return null;
  }

  // Local API Testing to update beta hives
  // BETA_HIVES = updatedBetaHIVES;
  // return BETA_HIVES;
};

// Function to update minimum prompt selections
export const updateMinPromptSelections = async (
  minPromptSelections: number
): Promise<number | null> => {
  try {
    const response = await axiosInstance.put('/min-prompt-selections', {
      minPromptSelections,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating minimum prompt selections:', error);
    return null;
  }

  // Local API Testing to update minimum prompt selections
  // const minPromptSelections = 4;
  // return minPromptSelections; --> Cannot be done from APIs due to store reducer needed
};
