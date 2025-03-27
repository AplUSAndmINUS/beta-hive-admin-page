import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setBattleName,
  setBetaHIVECount,
  setBetaHIVEs,
  setCalendarEventCount,
  setCalendarEvents,
  setContentWarningCount,
  setContentWarnings,
  setCountdownDate,
  setMaxWordCount,
  setMinPromptSelections,
  setMinWordCount,
  setNumOfLosses,
  setPromptCount,
  setPrompts,
} from 'src/stores/reducers/admin-submission';

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

export const fetchAdminData = createAsyncThunk<gameSettingsSchema, void>(
  'adminSubmission/fetchAdminData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await getAllGameContent(); // Fetch data from WordPress API

      if (!data) {
        return rejectWithValue('No data received');
      }

      // Dispatch actions to update the Redux store with fetched data
      dispatch(setBattleName(data.battleName || ''));
      dispatch(setBetaHIVECount(data.betaHIVECount || 0));
      dispatch(setBetaHIVEs(data.hives || []));
      dispatch(setCalendarEventCount(data.calendarEventCount || 0));
      dispatch(setCalendarEvents(data.calendarEvents || []));
      dispatch(setContentWarningCount(data.contentWarningCount || 0));
      dispatch(setContentWarnings(data.contentWarnings || []));
      dispatch(setCountdownDate(data.countdownDate || ''));
      dispatch(setMinPromptSelections(data.minPromptSelections || 0));
      dispatch(setNumOfLosses(data.numOfLosses || 0));
      dispatch(setPromptCount(data.promptsCount || 0));
      dispatch(setPrompts(data.prompts || []));
      dispatch(setMinWordCount(data.minWordCount || 0));
      dispatch(setMaxWordCount(data.maxWordCount || 0));

      return data; // Return the fetched data for any additional handling
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitCalendarEvents = createAsyncThunk(
  'admin/submitCalendarEvents',
  async (calendarEvents: calendarSchema[], { rejectWithValue }) => {
    try {
      const response = await updateCalendarEvents(calendarEvents);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitCalendarEventCount = createAsyncThunk(
  'admin/submitCalendarEventCount',
  async (calendarEventCount: number, { rejectWithValue }) => {
    try {
      const response = await updateCalendarEventCount(calendarEventCount);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitBattleName = createAsyncThunk(
  'admin/submitBattleName',
  async (battleName: string, { rejectWithValue }) => {
    try {
      const response = await updateBattleName(battleName);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitContentWarnings = createAsyncThunk(
  'admin/submitContentWarnings',
  async (contentWarnings: contentWarningsSchema[], { rejectWithValue }) => {
    try {
      const response = await updateContentWarnings(contentWarnings);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitCountdownDate = createAsyncThunk(
  'admin/submitCountdownDate',
  async (countdownDate: string, { rejectWithValue }) => {
    try {
      const response = await updateCountdownDate(countdownDate);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitPrompts = createAsyncThunk(
  'admin/submitPrompts',
  async (prompts: promptsSchema[], { rejectWithValue }) => {
    try {
      const response = await updatePrompts(prompts);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitPromptsCount = createAsyncThunk(
  'admin/submitPromptsCount',
  async (promptsCount: number, { rejectWithValue }) => {
    try {
      const response = await updatePromptsCount(promptsCount);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitMaxWordCount = createAsyncThunk(
  'admin/submitMaxWordCount',
  async (maxWordCount: number, { rejectWithValue }) => {
    try {
      const response = await updateMaxWordCount(maxWordCount);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitMinPromptSelections = createAsyncThunk(
  'admin/submitMinPromptSelections',
  async (minPromptSelections: number, { rejectWithValue }) => {
    try {
      const response = await updateMinPromptSelections(minPromptSelections);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitMinWordCount = createAsyncThunk(
  'admin/submitMinWordCount',
  async (minWordCount: number, { rejectWithValue }) => {
    try {
      const response = await updateMinWordCount(minWordCount);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitNumOfLosses = createAsyncThunk(
  'admin/submitNumOfLosses',
  async (numOfLosses: number, { rejectWithValue }) => {
    try {
      const response = await updateNumOfLosses(numOfLosses);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitNumOfContentWarnings = createAsyncThunk(
  'admin/submitNumOfContentWarnings',
  async (numOfContentWarnings: number, { rejectWithValue }) => {
    try {
      const response = await updateNumOfContentWarnings(numOfContentWarnings);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const submitNumOfCalendarEvents = createAsyncThunk(
  'admin/submitNumOfCalendarEvents',
  async (calendarEventCount: number, { rejectWithValue }) => {
    try {
      const response = await updateCalendarEventCount(calendarEventCount);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// no beta hive options yet
// export const submitBetaHIVECount = createAsyncThunk(
//   'admin/submitBetaHIVECount',
//   async (betaHIVECount: number, { rejectWithValue }) => {
//     try {
//       const response = await updateCalendarEventCount(betaHIVECount);
//       return response;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );

// export const submitBetaHIVES = createAsyncThunk(
//   'admin/submitBetaHIVES',
//   async (betaHIVES: gameSettingsSchema[], { rejectWithValue }) => {
//     try {
//       const response = await updateCalendarEventCount(betaHIVES);
//       return response;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );
