from django.urls import reverse
from django.test import TestCase
from .base import loan_data, missing_required_keys_loan_data
from rest_framework.status import *
from loansforgood.serializers import LoanProposalSerializer


class LoanProposalsTestCase(TestCase):

    def test_create_proposal(self):
        """It should return status 201 when creating a loan proposal"""

        response = self.client.post(reverse('loansforgood:loan'), loan_data)
        self.assertEqual(response.status_code, HTTP_201_CREATED)
        self.assertEqual(response.json()["name"], "User")
        self.assertEqual(response.json()["document"], "12345678")
        self.assertEqual(response.json()["birth_date"], "1996-06-26")
        self.assertEqual(response.json()["phone"], "84912345678")
        self.assertEqual(response.json()["email"], "user@email.com")
        self.assertEqual(response.json()["amount"], '123456.00')
        self.assertEqual(response.json()["mother_name"], "Mother Name")
        self.assertEqual(response.json()["occupation"], "Developer")
        self.assertEqual(response.json()["status"], "pending")

    def test_create_proposal_with_missing_required_fields(self):
        """It should return status 400 when creating a loan proposal with missing required keys"""

        response = self.client.post(
            reverse('loansforgood:loan'), missing_required_keys_loan_data)
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)

    def test_get_all_created_proposals(self):
        """It should return status 200 when getting all created proposals"""

        self.client.post(reverse('loansforgood:loan'), loan_data)

        response = self.client.get(reverse('loansforgood:loan'))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
