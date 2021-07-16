import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { map, zipObject } from 'lodash'
import { Essay, FeedbackRequest, FeedbackState, Feedback } from './feedbackTypes'

const initialState: FeedbackState = {
  feedbackRequests: {},
  essays: {},
  feedbacks: {},
}

const feedbackSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addEssay(state, action: PayloadAction<Essay>) {
      state.essays[action.payload.pk] = action.payload
    },
    addEssays(state, action: PayloadAction<Essay[]>) {
      state.essays = { ...state.essays, ...zipObject(map(action.payload, 'pk'), action.payload) }
    },
    addFeedbackRequest(state, action: PayloadAction<FeedbackRequest>) {
      state.feedbackRequests[action.payload.pk] = action.payload
    },
    addFeedbackRequests(state, action: PayloadAction<FeedbackRequest[]>) {
      state.feedbackRequests = { ...state.feedbackRequests, ...zipObject(map(action.payload, 'pk'), action.payload) }
    },
    editFeedbackRequest(state, action: PayloadAction<FeedbackRequest>) {
      state.feedbackRequests[action.payload.pk] = action.payload
    },
    addFeedbacks(state, action: PayloadAction<Feedback[]>) {
      state.feedbacks = { ...state.feedbacks, ...zipObject(map(action.payload, 'pk'), action.payload) }
    },
    addFeedback(state, action: PayloadAction<Feedback>) {
      state.feedbacks[action.payload.pk] = action.payload
    },
  },
})

export const {
  addEssay,
  addEssays,
  addFeedbackRequest,
  addFeedbackRequests,
  editFeedbackRequest,
  addFeedback,
  addFeedbacks,
} = feedbackSlice.actions
export default feedbackSlice.reducer
