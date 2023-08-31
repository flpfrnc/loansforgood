from django.urls import path
from .views import StatusView, FormFieldView, LoanProposalView

app_name = 'loansforgood'

urlpatterns = [
    path('', StatusView.as_view(), name="status"),
    path('fields/', FormFieldView.as_view(), name="fields"),
    path('loans/', LoanProposalView.as_view(), name="loan"),
]
