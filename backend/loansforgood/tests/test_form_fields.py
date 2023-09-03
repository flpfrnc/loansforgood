from django.urls import reverse
from django.test import TestCase
from .base import form_field_data
from rest_framework.status import *
from loansforgood.serializers import FormFieldSerializer


class FormFieldsTestCase(TestCase):

    def test_get_all_created_form_fields(self):
        """It should return status 200 when getting created form fields"""
        form_field = FormFieldSerializer(
            data=form_field_data
        )
        if form_field.is_valid():
            form_field.save()

        response = self.client.get(reverse('loansforgood:fields'))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["field_name"], "Test")
        self.assertEqual(response.json()[0]["field_type"], "text")
        self.assertEqual(response.json()[0]["is_required"], True)
        self.assertEqual(response.json()[0]["is_visible"], True)

    def test_get_empty_form_field_response(self):
        """It should return status 200 and empty list if form field is not created"""

        response = self.client.get(reverse('loansforgood:fields'))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.json()), 0)
