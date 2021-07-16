export type Essay = {
  pk: number
  name: string
  uploaded_by: number
  content: string
  revision_of: object | null
}

export type FeedbackRequest = {
  pk: number
  essay: number
  edited: boolean
  deadline: string
}

export type Feedback = {
  pk: number
  essay: number
  editor: number
  content: string
  created_on: string
}

export type FeedbackState = {
  feedbackRequests: {
    [pk: number]: FeedbackRequest
  }
  essays: {
    [pk: number]: Essay
  }
  feedbacks: {
    [pk: number]: Feedback
  }
}
