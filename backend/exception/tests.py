from django.test import TestCase

# Create your tests here.
from rest_framework.exceptions import AuthenticationFailed

from exception.utils import custom_exception_handler


class TestException(TestCase):
    def setUp(self):
        pass

    def test_custom_exception_handler(self):
        args = (AuthenticationFailed(), None)
        self.assertNotEqual(custom_exception_handler(*args), None)