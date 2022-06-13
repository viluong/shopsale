from django.urls import reverse
from rest_framework import status

from authentication.models import User
from authentication.tests import UserFactory, TestCaseBase, COMMON_PASSWORD


class RegisterTestCase(TestCaseBase):

    @classmethod
    def setUpClass(cls):
        super(RegisterTestCase, cls).setUpClass()
        cls.api_url = reverse('registration')
        cls.user_build = UserFactory.build()

    def test_register_success(self):
        data = {
            'email': self.user_build.email,
            'first_name': self.user_build.first_name,
            'last_name': self.user_build.last_name,
            'password': COMMON_PASSWORD
        }
        response = self.client.post(self.api_url, data)
        user = User.objects.get(pk=response.data['id'])

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.email, self.user_build.email)

    def test_register_fail_with_user_exists(self):
        self.user_exists = UserFactory.create()
        data = {
            'email': self.user_exists.email,
            'first_name': self.user_build.first_name,
            'last_name': self.user_build.last_name,
            'password': self.faker_obj.password(
                length=12,
                special_chars=True,
                digits=True,
                upper_case=True,
                lower_case=True
            )
        }

        response = self.client.post(self.api_url, data)
        error = response.data

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('email' in error)
