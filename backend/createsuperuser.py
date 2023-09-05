from django.db import IntegrityError
from django.contrib.auth.models import User

import environ
env = environ.Env(
    DEBUG=(bool, False)
)

try:
    superuser = User.objects.create_superuser(
        username=env('DJANGO_SUPERUSER_USERNAME', default="admin"),
        email=env('DJANGO_SUPERUSER_EMAIL', default="admin@email.com"),
        password=env('DJANGO_SUPERUSER_PASSWORD', default="admin"))
    superuser.save()
except IntegrityError:
    print(
        f"Superuser with username {env('DJANGO_SUPERUSER_USERNAME')} already exists!")
except Exception as e:
    print(e)
