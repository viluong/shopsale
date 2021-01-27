from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer, \
    TokenVerifySerializer

from authentication.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):

        user = User.objects.create(
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        user_serializer = UserSerializer(self.user)
        data['user'] = user_serializer.data
        data['expires_in'] = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        return data


class MyTokenRefreshSerializer(TokenRefreshSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        jwt_object = JWTAuthentication()
        validated_token = jwt_object.get_validated_token(data.get('access'))
        user = jwt_object.get_user(validated_token)
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data

        return data


class MyTokenVerifySerializer(TokenVerifySerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        jwt_object = JWTAuthentication()
        validated_token = jwt_object.get_validated_token(attrs.get('token'))
        user = jwt_object.get_user(validated_token)
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data
        return data
