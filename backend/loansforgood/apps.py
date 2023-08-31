from django.apps import AppConfig


class LoansforgoodConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'loansforgood'

    def ready(self):
        # Import celery app now that Django is mostly ready.
        # This initializes Celery and autodiscovers tasks
        import loansforgood.celery
