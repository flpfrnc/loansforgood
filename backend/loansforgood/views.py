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

    # FormFieldView will only have a get method, once the field creation is going to be managed by the admin
    def get(self, request: Request) -> Response:
        fields = FormField.objects.all()
        serializer = FormFieldSerializer(fields, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)


class LoanProposalView(APIView):

    def post(self, request: Request) -> Response:

        try:
            serializer = LoanProposalSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                return Response(data=serializer.data, status=HTTP_201_CREATED)
        except Exception:
            return Response(data=serializer.errors, status=HTTP_400_BAD_REQUEST)

    def get(self, request: Request) -> Response:
        loan_proposals = LoanProposal.objects.all()
        serializer = LoanProposalSerializer(loan_proposals, many=True)

        return Response(serializer.data, status=HTTP_200_OK)
