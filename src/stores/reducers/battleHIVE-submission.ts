import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BattleHIVESubmissionState {
  isNoContentWarnings: boolean;
  stories: string[];
  selectedStoryOne: string;
  selectedStoryTwo: string;
  storyWinner: string;
  storyLoser: string;
}

const initialState: BattleHIVESubmissionState = {
  isNoContentWarnings: false,
  stories: [],
  selectedStoryOne: '',
  selectedStoryTwo: '',
  storyWinner: '',
  storyLoser: '',
};

const battleHIVESubmissionSlice = createSlice({
  name: 'battleHIVESubmissionReducer',
  initialState,
  reducers: {
    setNoContentWarnings(state, action: PayloadAction<boolean>) {
      state.isNoContentWarnings = action.payload;
    },
    setStories(state, action: PayloadAction<string[]>) {
      state.stories = action.payload;
    },
    setSelectedStoryOne(state, action: PayloadAction<string>) {
      state.selectedStoryOne = action.payload;
    },
    setSelectedStoryTwo(state, action: PayloadAction<string>) {
      state.selectedStoryTwo = action.payload;
    },
    setStoryWinner(state, action: PayloadAction<string>) {
      state.storyWinner = action.payload;
    },
    setStoryLoser(state, action: PayloadAction<string>) {
      state.storyLoser = action.payload;
    },
  },
});

export const {
  setNoContentWarnings,
  setStories,
  setSelectedStoryOne,
  setSelectedStoryTwo,
  setStoryWinner,
  setStoryLoser,
} = battleHIVESubmissionSlice.actions;

export default battleHIVESubmissionSlice.reducer;