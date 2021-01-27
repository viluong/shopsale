from django.contrib import admin
from django.urls import path

from authentication import views
from authentication.views import MyTokenObtainPairView, MyTokenRefreshView, MyVerifyTokenView

urlpatterns = [
    path('registration', views.RegisterView.as_view(), name='registration'),
    path('google', views.GoogleView.as_view(), name='gg_login'),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', MyVerifyTokenView.as_view(), name="token_verify"),
    path('profile', views.UserProfileView.as_view(), name="user_profile"),
    path('logout', views.LogoutView.as_view(), name="logout")
]