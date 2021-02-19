from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import exception_handler

from exception.enums import AuthMessage


def custom_exception_handler(exc, context):
    if isinstance(exc, AuthenticationFailed):
        exc = AuthenticationFailed(detail=AuthMessage.AUTH_FAILED.value)

    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code

    return response
