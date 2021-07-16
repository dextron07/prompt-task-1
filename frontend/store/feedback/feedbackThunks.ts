import { Dispatch } from '@reduxjs/toolkit'
import API from 'store/api'
import { Urls } from 'store/urls'
import { addEssays, addFeedbackRequests, editFeedbackRequest, addFeedbacks, addFeedback } from './feedbackSlice'
import { Essay, FeedbackRequest, Feedback } from './feedbackTypes'

type FeedbackRequestRetrieve = Omit<FeedbackRequest, 'essay'> & {
  essay: Essay
}

export const loadFeedbackRequests = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: frrs }: { data: FeedbackRequestRetrieve[] } = await API.get(Urls.FeedbackRequest())
    const allFeedbackRequests: FeedbackRequest[] = []
    const allEssays: Essay[] = []
    frrs.forEach(frr => {
      const { essay, ...frrDestructured } = frr
      const feedbackRequest: Partial<FeedbackRequest> = { ...frrDestructured }
      feedbackRequest.essay = essay.pk
      allEssays.push(essay)
      allFeedbackRequests.push(feedbackRequest as FeedbackRequest)
    })
    dispatch(addFeedbackRequests(allFeedbackRequests))
    // dispatch(addEssays(allEssays))
    await dispatch(loadEssays())
    return allFeedbackRequests
  } catch (err) {
    throw err
  }
}

export const loadEssays = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: frrs }: { data: FeedbackRequestRetrieve[] } = await API.get(Urls.EssayRequest())
    const allEssays: Essay[] = []
    frrs.forEach(frr => {
      const { ...frrDestructured } = frr
      allEssays.push({ ...frrDestructured })
    })
    dispatch(addEssays(allEssays))
    return allEssays
  } catch (err) {
    throw err
  }
}

export const updateFeedbackRequest = (id, payload) => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: frrs }: { data: FeedbackRequestRetrieve[] } = await API.patch(Urls.FeedbackRequest(id), payload)
    let updatedFeedbackRequest: FeedbackRequest = {}
    let updatedEssay: Essay = {}

    const { essay, ...frrDestructured } = frrs
    const feedbackRequest: Partial<FeedbackRequest> = { ...frrDestructured }
    feedbackRequest.essay = essay.pk

    updatedEssay = essay
    updatedFeedbackRequest = feedbackRequest as FeedbackRequest
    dispatch(editFeedbackRequest(updatedFeedbackRequest))
    return updatedFeedbackRequest
  } catch (err) {
    throw err
  }
}

export const addFeedback = (feedbackRequestId, payload) => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: frrs } = await API.post(Urls.Feedback(), payload)
    payload = {
      edited: true,
      feedback: frrs['pk'],
    }
    dispatch(updateFeedbackRequest(feedbackRequestId, payload))
    dispatch(addFeedbacks(frrs as Feedback))
  } catch (err) {
    throw err
  }
}

export const getFeedbacks = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: frrs } = await API.get(Urls.Feedback())
    const allFeedbacks: Feedback[] = []
    frrs.forEach(frr => {
      const { ...frrDestructured } = frr
      const feedback: Partial<FeedbackRequest> = { ...frrDestructured }
      allFeedbacks.push(feedback as Feedback)
    })
    dispatch(addFeedbacks(allFeedbacks))
    return allFeedbacks
  } catch (err) {
    throw err
  }
}
