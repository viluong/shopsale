from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.utils import json
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authentication.models import CustomUserManager, User
from authentication.serializers import UserSerializer, MyTokenObtainPairSerializer, MyTokenRefreshSerializer, \
    MyTokenVerifySerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer


class GoogleView(APIView):
    def post(self, request):
        payload = {'access_token': request.data.get("token")}  # validate the token
        r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(r.text)

        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(content)

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
        response['expires_in'] = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        return Response(response)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenRefreshView):
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