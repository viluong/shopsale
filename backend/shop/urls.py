from django.urls import path, include
from shop import views

urlpatterns = [
    path('auth/', include('authentication.urls')),
    path('categories/', views.CategoryList.as_view()),
    path('products/', views.ProductList.as_view()),
    path('products/<uuid:pk>/', views.ProductDetail.as_view()),

    path('orders/', views.OrderView.as_view()),
    path('orderline/', views.OrderLineView.as_view()),
    path('orders/<int:pk>/', views.OrderDetail.as_view()),

    path('carts/', views.CartView.as_view()),

]
