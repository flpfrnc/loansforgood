from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.db import models


class LoanProposal(models.Model):
    name = models.CharField(max_length=100, name="name")
    document = models.CharField(max_length=100, name="document")
    birth_date = models.DateField(name="birth_date", null=True, blank=True)
    phone = models.CharField(
        max_length=15, name="phone", null=True, blank=True)
    email = models.CharField(
        max_length=100, name="email", null=True, blank=True)
    amount = models.DecimalField(
        name="amount", decimal_places=2, max_digits=10, null=True, blank=True)
    mother_name = models.CharField(
        max_length=100, name="mother_name", null=True, blank=True)
    occupation = models.CharField(
        max_length=100, name="occupation", null=True, blank=True)
    status = models.CharField(default="pending", max_length=20)
    approved = models.BooleanField(default=False)

    created_ad = models.DateTimeField(auto_now_add=True, name="created_at")
    updated_at = models.DateTimeField(auto_now=True, name="updated_at")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "tb_loan_proposal"


class FormField(models.Model):
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=50)
    is_required = models.BooleanField(default=False)
    is_visible = models.BooleanField(default=True)

    created_ad = models.DateTimeField(auto_now_add=True, name="created_at")
    updated_at = models.DateTimeField(auto_now=True, name="updated_at")

    def __str__(self):
        return self.field_name

    class Meta:
        db_table = "tb_form_field"


@receiver(pre_save, sender=FormField)
def check_visibility(sender, instance, **kwargs):
    if instance.is_required and not instance.is_visible:
        instance.is_visible = True
