from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.utils import json
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, TokenViewBase

from authentication.models import CustomUserManager, User
from authentication.serializers import UserSerializer, MyTokenObtainPairSerializer, MyTokenRefreshSerializer, \
    MyTokenVerifySerializer
from authentication.utils import google_request_oauth2


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer


class GoogleView(APIView):
    def post(self, request):

        data = google_request_oauth2(request.data.get("token"))

        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(data=content, status=status.HTTP_401_UNAUTHORIZED)

        # create user if not exist
        try:
            user = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            user = User()
            user.username = data.get('email')
            # provider random default password
            user.password = make_password(CustomUserManager().make_random_password())
            user.email = data.get('email')
            user.first_name = data.get('given_name')
            user.last_name = data.get('family_name')
            user.is_google = True
            user.save()

        token = RefreshToken.for_user(user)  # generate token without username & password
        response = {}
        user_serializer = UserSerializer(user)
        response['user'] = user_serializer.data
        response['access'] = str(token.access_token)
        response['refresh'] = str(token)
        response['token_expire_at'] = token.access_token.get('exp')
        response['refresh_token_expire_at'] = token.get('exp')
        return Response(response)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenViewBase):
    serializer_class = MyTokenRefreshSerializer


class MyVerifyTokenView(TokenVerifyView):
    serializer_class = MyTokenVerifySerializer


class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)