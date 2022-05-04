from rest_framework import status

import uuid
from faker import Faker

faker_obj = Faker()


def check_token_success(status_code, data):
    return "access" in data \
           and "refresh" in data \
           and "user" in data \
           and "refresh_token_expire_at" in data \
           and "token_expire_at" in data \
           and status_code == status.HTTP_200_OK


def google_request_oauth2_success(mock):
    data = {
        'email': fake_gmail(),
        'given_name': faker_obj.first_name(),
        'family_name': faker_obj.last_name()
    }
    mock.return_value = data


def google_login_success(mock, data):
    mock.return_value.status_code = status.HTTP_200_OK
    mock.return_value.data = data


def google_request_oauth2_fail(mock):
    data = {
        'error': "Authentication Error"
    }
    mock.return_value = data


def fake_gmail():
    str_random = str(uuid.uuid1())
    return str_random+"@gmail.com"
