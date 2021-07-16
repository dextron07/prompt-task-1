from django.db.models import query
from project.models import FeedbackRequest, User, Essay, Feedback


class FeedbackRequestManager:
	""" Helper methods related to FeedbackRequests. """

	@staticmethod
	def query_for_user(user: User, include_edited: bool = False, is_editing_active: bool = False):
		""" Query all FeedbackRequests available to the current user.

			Includes those that are finished if requested. Otherwise, includes only unfinished.
		"""
		if not user.is_anonymous and user:
			queryset = FeedbackRequest.objects.filter(assigned_editors=user)
		else:
			queryset = FeedbackRequest.objects.all()
		return queryset


class EssayManager:
	""" Helper methods related to EssayRequests. """

	@staticmethod
	def query_for_user(user: User):
		""" Query all EssayRequests available to the current user.

			Includes those that are finished if requested. Otherwise, includes only unfinished.
		"""
		# queryset = Essay.objects.filter(uploaded_by=user)
		queryset = Essay.objects.all()
		return queryset


class FeedbackManager:
	""" Helper methods related to EssayRequests. """

	@staticmethod
	def query_for_user(user: User):
		""" Query all EssayRequests available to the current user.

			Includes those that are finished if requested. Otherwise, includes only unfinished.
		"""
		queryset = Feedback.objects.all()
		return queryset
