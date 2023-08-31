from rest_framework import serializers
from .models import FormField, LoanProposal


class FormFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormField
        fields = '__all__'


class LoanProposalSerializer(serializers.ModelSerializer):

    class Meta:
        model = LoanProposal
        fields = '__all__'
