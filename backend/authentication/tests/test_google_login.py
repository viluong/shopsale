from unittest import mock

from django.urls import reverse

from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

import authentication.utils
from authentication.serializers import MyTokenObtainPairSerializer, UserSerializer
from authentication.tests import TestCaseBase, UserFactory
from authentication.tests.utils import check_token_success, google_request_oauth2_success, google_request_oauth2_fail, \
    google_login_success
from authentication.views import GoogleView


class GoogleLoginTestCase(TestCaseBase):

    @classmethod
    def setUpClass(cls):
        super(GoogleLoginTestCase, cls).setUpClass()
        cls.url_api = reverse('gg_login')
        cls.user_exists = UserFactory.create(is_google=True)

    @classmethod
    def tearDownClass(cls):
        super(GoogleLoginTestCase, cls).tearDownClass()

    @mock.patch.object(authentication.views.GoogleView, 'post')
    def test_google_login_success(self, mock_api):
        user = self.user_exists
        token = RefreshToken.for_user(user)  # generate token without username & password
        user_data = {}
        user_serializer = UserSerializer(user)
        user_data['user'] = user_serializer.data
        user_data['access'] = str(token.access_token)
        user_data['refresh'] = str(token)
        user_data['token_expire_at'] = token.access_token.get('exp')
        user_data['refresh_token_expire_at'] = token.get('exp')
        google_login_success(mock_api, user_data)
        data = {
            'token': self.faker_obj.pystr()
        }
        api = GoogleView()
        response = api.post(request=data)
        self.assertTrue(check_token_success(response.status_code, response.data))
