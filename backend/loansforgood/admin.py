from .models import LoanProposal
from django.contrib import admin
from .models import FormField, LoanProposal

admin.site.register(FormField)


class ApprovedLoanProposalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'document', 'status',
                    'approved', 'created_at', 'updated_at')
    list_filter = ('status', 'approved')
    search_fields = ('name', 'document')

    def get_queryset(self, request):
        return LoanProposal.objects.filter(approved=True)


admin.site.register(LoanProposal, ApprovedLoanProposalAdmin)
