from rest_framework import serializers

from project.models import Essay, FeedbackRequest, Feedback


class FeedbackSerializer(serializers.ModelSerializer):
	editor = serializers.HiddenField(default=serializers.CurrentUserDefault())

	class Meta:
		model = Feedback
		fields = (
			'pk',
			'content',
			'editor',
			'essay',
			'created_on',
		)


class EssaySerializer(serializers.ModelSerializer):
	""" Serialize an Essay. """
	uploaded_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

	class Meta:
		model = Essay
		fields = (
			'pk',
			'name',
			'uploaded_by',
			'content',
			'revision_of',
			'essay_feedback',
		)


class FeedbackRequestSerializer(serializers.ModelSerializer):
	""" Serialize a FeedbackRequest. """

	essay = EssaySerializer()
	feedback = serializers.PrimaryKeyRelatedField(queryset=Feedback.objects.all(), many=False)

	class Meta:
		model = FeedbackRequest
		fields = ('pk', 'essay', 'edited', 'deadline', 'feedback', 'is_editing_active')
