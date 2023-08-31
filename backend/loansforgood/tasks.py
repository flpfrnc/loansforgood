import requests
import json
from datetime import timedelta
from loansforgood.celery import app


@app.task(name="process_proposals")
def process_proposals():
    from loansforgood.models import LoanProposal

    api_url = 'https://loan-processor.digitalsys.com.br/api/v1/loan/'

    loan_proposal = LoanProposal.objects.filter(status="pending").first()

    if not loan_proposal:
        return "no pending loan proposals were found"

    try:
        loan_proposal.status = "in progress"
        loan_proposal.save()

        payload = {
            "name": loan_proposal.name,
            "document": loan_proposal.document
        }

        response = requests.post(api_url, payload)
        approval_status = json.loads(response.text)

        loan_proposal.approved = approval_status["approved"]
        loan_proposal.status = "finished"
        loan_proposal.save()

    except Exception as e:
        print(e)

    approval_result = {
        "approved" if approval_status["approved"] == True else "not approved"}
    return f'loan proposal #{loan_proposal.id} {approval_result}'


# Schedule the task to run every 10 seconds
app.conf.beat_schedule = {
    'process-proposals': {
        'task': 'process_proposals',
        'schedule': timedelta(seconds=10),
    },
}
