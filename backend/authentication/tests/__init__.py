
from factory import django, Faker
from faker import Faker as FakerClass

from rest_framework.test import APITestCase, APIClient

from authentication import models
from authentication.tests.utils import fake_gmail

faker_obj = FakerClass()

COMMON_PASSWORD = faker_obj.password(
        length=12,
        special_chars=True,
        digits=True,
        upper_case=True,
        lower_case=True
    )


class UserFactory(django.DjangoModelFactory):

    first_name = Faker('first_name')
    last_name = Faker('last_name')
    email = fake_gmail()
    password = COMMON_PASSWORD
    is_google = False
    
    class Meta:
        model = models.User


class TestCaseBase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super(TestCaseBase, cls).setUpClass()
        cls.client = APIClient()
        cls.faker_obj = faker_obj
