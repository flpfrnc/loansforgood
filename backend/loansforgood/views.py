from rest_framework.status import *
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from .models import FormField, LoanProposal
from .serializers import FormFieldSerializer, LoanProposalSerializer


class StatusView(APIView):
    """checks either the base endpoint is accessible or not"""

    def get(self, request: Request) -> Response:
        return Response({"status": "online"},  status=HTTP_200_OK)


class FormFieldView(APIView):

    def get(self, request: Request) -> Response:
        fields = FormField.objects.all()
        serializer = FormFieldSerializer(fields, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)


class LoanProposalView(APIView):

    def post(self, request: Request) -> Response:
        loan_proposal = LoanProposal.objects.create(
            name=request.data["name"],
            document=request.data["document"],
            birth_date=request.data["birth_date"],
            phone=request.data["phone"],
            amount=request.data["amount"],
            mother_name=request.data["mother_name"],
            occupation=request.data["occupation"])
        loan_proposal.save()

        return Response(status=HTTP_201_CREATED)

    def get(self, request: Request) -> Response:
        loan_proposals = LoanProposal.objects.all()
        serializer = LoanProposalSerializer(loan_proposals, many=True)

        return Response(serializer.data, status=HTTP_200_OK)
