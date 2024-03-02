from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from googleapiclient.model import BaseModel
from django.utils.translation import gettext_lazy as _

from apps.common.utils import mobile_number_validator


class User(AbstractUser, BaseModel):
    mobile_number = models.CharField(
        verbose_name=_("Mobile number"), max_length=31, unique=True,
        validators=[mobile_number_validator], blank=True, null=True
    )

