import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllGameContent,
  updateBattleName,
  updateCalendarEvents,
  updateCalendarEventCount,
  updateContentWarnings,
  updateCountdownDate,
  updatePrompts,
  updatePromptsCount,
  updateMaxWordCount,
  updateMinPromptSelections,
  updateMinWordCount,
  updateNumOfLosses,
  updateNumOfContentWarnings,
} from 'src/services/apis/admin-apis';
import { gameSettingsSchema } from 'src/services/models/betaHIVE-selection.types';
import { calendarSchema } from 'src/services/models/calendar.types';
import { contentWarningsSchema } from 'src/services/models/content-warnings.types';
import { promptsSchema } from 'src/services/models/prompt-selection.types';

// Types for thunk responses
export interface ThunkResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Fetch all admin data
export const fetchAdminData = createAsyncThunk<
  ThunkResponse<gameSettingsSchema>,
  void
>(
  'adminSubmission/fetchAdminData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await getAllGameContent();

      if (!data) {
        return rejectWithValue({
          data: null,
          success: false,
          error: 'No data received',
        });
      }

      // Dispatch actions to update the Redux store with fetched data
      dispatch({
        type: 'adminSubmission/setBattleName',
        payload: data.battleName || '',
      });
      dispatch({
        type: 'adminSubmission/setBetaHIVECount',
        payload: data.betaHIVECount || 0,
      });
      dispatch({
        type: 'adminSubmission/setBetaHIVEs',
        payload: data.hives || [],
      });
      dispatch({
        type: 'adminSubmission/setCalendarEventCount',
        payload: data.calendarEventCount || 0,
      });
      dispatch({
        type: 'adminSubmission/setCalendarEvents',
        payload: data.calendarEvents || [],
      });
      dispatch({
        type: 'adminSubmission/setContentWarningCount',
        payload: data.contentWarningCount || 0,
      });
      dispatch({
        type: 'adminSubmission/setContentWarnings',
        payload: data.contentWarnings || [],
      });
      dispatch({
        type: 'adminSubmission/setCountdownDate',
        payload: data.countdownDate || '',
      });
      dispatch({
        type: 'adminSubmission/setMinPromptSelections',
        payload: data.minPromptSelections || 0,
      });
      dispatch({
        type: 'adminSubmission/setNumOfLosses',
        payload: data.numOfLosses || 0,
      });
      dispatch({
        type: 'adminSubmission/setPromptCount',
        payload: data.promptsCount || 0,
      });
      dispatch({
        type: 'adminSubmission/setPrompts',
        payload: data.prompts || [],
      });
      dispatch({
        type: 'adminSubmission/setMinWordCount',
        payload: data.minWordCount || 0,
      });
      dispatch({
        type: 'adminSubmission/setMaxWordCount',
        payload: data.maxWordCount || 0,
      });

      return { data, success: true };
    } catch (error) {
      return rejectWithValue({
        data: null,
        success: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
);

// Generic update thunk creator
const createUpdateThunk = <T>(
  type: string,
  updateFn: (data: T) => Promise<T | null>,
  actionType: string
) => {
  return createAsyncThunk<ThunkResponse<T>, T>(
    `admin/${type}`,
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const response = await updateFn(data);
        if (!response) {
          return rejectWithValue({
            data: null,
            success: false,
            error: `Failed to update ${type}`,
          });
        }
        // Update the store after successful API call
        dispatch({ type: actionType, payload: response });
        return { data: response, success: true };
      } catch (error) {
        return rejectWithValue({
          data: null,
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        });
      }
    }
  );
};

// Calendar Events
export const submitCalendarEvents = createUpdateThunk<calendarSchema[]>(
  'submitCalendarEvents',
  updateCalendarEvents,
  'adminSubmission/setCalendarEvents'
);

export const submitCalendarEventCount = createUpdateThunk<number>(
  'submitCalendarEventCount',
  updateCalendarEventCount,
  'adminSubmission/setCalendarEventCount'
);

// Battle Name
export const submitBattleName = createUpdateThunk<string>(
  'submitBattleName',
  updateBattleName,
  'adminSubmission/setBattleName'
);

// Content Warnings
export const submitContentWarnings = createUpdateThunk<contentWarningsSchema[]>(
  'submitContentWarnings',
  updateContentWarnings,
  'adminSubmission/setContentWarnings'
);

export const submitNumOfCalendarEvents = createUpdateThunk<number>(
  'submitNumOfCalendarEvents',
  updateCalendarEventCount,
  'adminSubmission/setCalendarEventCount'
);

export const submitNumOfContentWarnings = createUpdateThunk<number>(
  'submitNumOfContentWarnings',
  updateNumOfContentWarnings,
  'adminSubmission/setContentWarningCount'
);

// Prompts
export const submitPrompts = createUpdateThunk<promptsSchema[]>(
  'submitPrompts',
  updatePrompts,
  'adminSubmission/setPrompts'
);

export const submitPromptsCount = createUpdateThunk<number>(
  'submitPromptsCount',
  updatePromptsCount,
  'adminSubmission/setPromptCount'
);

// Word Counts
export const submitMinWordCount = createUpdateThunk<number>(
  'submitMinWordCount',
  updateMinWordCount,
  'adminSubmission/setMinWordCount'
);

export const submitMaxWordCount = createUpdateThunk<number>(
  'submitMaxWordCount',
  updateMaxWordCount,
  'adminSubmission/setMaxWordCount'
);

// Prompt Selections and Losses
export const submitMinPromptSelections = createUpdateThunk<number>(
  'submitMinPromptSelections',
  updateMinPromptSelections,
  'adminSubmission/setMinPromptSelections'
);

export const submitNumOfLosses = createUpdateThunk<number>(
  'submitNumOfLosses',
  updateNumOfLosses,
  'adminSubmission/setNumOfLosses'
);

// Countdown Date
export const submitCountdownDate = createUpdateThunk<string>(
  'submitCountdownDate',
  updateCountdownDate,
  'adminSubmission/setCountdownDate'
);

// Beta HIVE related thunks (commented out as per original)
/*
export const submitBetaHIVECount = createUpdateThunk<number>(
  'submitBetaHIVECount',
  updateBetaHIVECount
);

export const submitBetaHIVES = createUpdateThunk<betaHIVESchema[]>(
  'submitBetaHIVES',
  updateBetaHIVES
);
*/
