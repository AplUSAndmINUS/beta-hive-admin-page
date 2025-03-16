import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackSubmissionState {
  feedbackStoryOneIsPositive: boolean;
  feedbackStoryOneIsPublic: boolean;
  feedbackStoryOneIsAnonymous: boolean;
  feedbackStoryOneText: string;
  feedbackStoryTwoIsPositive: boolean;
  feedbackStoryTwoIsPublic: boolean;
  feedbackStoryTwoIsAnonymous: boolean;
  feedbackStoryTwoText: string;
}

const initialState: FeedbackSubmissionState = {
  feedbackStoryOneIsAnonymous: false,
  feedbackStoryOneIsPositive: true,
  feedbackStoryOneIsPublic: true,
  feedbackStoryOneText: '',
  feedbackStoryTwoIsAnonymous: false,
  feedbackStoryTwoIsPositive: true,
  feedbackStoryTwoIsPublic: true,
  feedbackStoryTwoText: '',
};

const feedbackSubmissionSlice = createSlice({
  name: 'feedbackSubmissionReducer',
  initialState,
  reducers: {
    setFeedbackStoryOneText(state, action: PayloadAction<string>) {
      state.feedbackStoryOneText = action.payload;
    },
    setFeedbackStoryOneIsAnonymous(state, action: PayloadAction<boolean>) {
      state.feedbackStoryOneIsAnonymous = action.payload;
    },
    setFeedbackStoryOneIsPositive(state, action: PayloadAction<boolean>) {
      state.feedbackStoryOneIsPositive = action.payload;
    },
    setFeedbackStoryOneIsPublic(state, action: PayloadAction<boolean>) {
      state.feedbackStoryOneIsPublic = action.payload;
    },
    setFeedbackStoryTwoText(state, action: PayloadAction<string>) {
      state.feedbackStoryTwoText = action.payload;
    },
    setFeedbackStoryTwoIsAnonymous(state, action: PayloadAction<boolean>) {
      state.feedbackStoryTwoIsAnonymous = action.payload;
    },
    setFeedbackStoryTwoIsPositive(state, action: PayloadAction<boolean>) {
      state.feedbackStoryTwoIsPositive = action.payload;
    },
    setFeedbackStoryTwoIsPublic(state, action: PayloadAction<boolean>) {
      state.feedbackStoryTwoIsPublic = action.payload;
    },
  },
});

export const {
  setFeedbackStoryOneText,
  setFeedbackStoryOneIsAnonymous,
  setFeedbackStoryOneIsPositive,
  setFeedbackStoryOneIsPublic,
  setFeedbackStoryTwoText,
  setFeedbackStoryTwoIsAnonymous,
  setFeedbackStoryTwoIsPositive,
  setFeedbackStoryTwoIsPublic,
} = feedbackSubmissionSlice.actions;

export default feedbackSubmissionSlice.reducer;
