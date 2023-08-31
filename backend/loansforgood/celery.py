from celery import Celery
# from api import settings
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

app = Celery('loansforgood')
# Load celery settings from your Django settings module
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_connection_retry_on_startup = True


app.autodiscover_tasks()
