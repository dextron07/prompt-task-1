export const Urls = {
  Login: () => '/login/',
  Logout: () => '/logout/',
  User: () => '/api/user/',
  FeedbackRequest: (pk: null) => pk ? `/api/feedback-request/${pk}/` : `/api/feedback-request/`,
  EssayRequest: () => '/api/essay-request/',
  Feedback: (pk: null) => pk ? `/api/feedback/${pk}/` : `/api/feedback/`,
}
