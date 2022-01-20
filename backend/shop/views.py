import json

from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters

from shop.models import Product, Order, Category, OrderLine
from shop.serializers import ProductSerializer, OrderSerializer, CategorySerializer, OrderLineSerializer
from shop.utils import get_products


class ProductList(generics.ListCreateAPIView):
    authentication_classes = []
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_serializer_context(self):
        context = super(ProductList, self).get_serializer_context()
        if self.request.method == 'GET':
            context.update({
                'fields': ['id', 'name', 'price', 'quantity', 'image', 'category']
            })
        return context


class ProductDetail(generics.RetrieveUpdateAPIView):
    authentication_classes = []
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            serializer.save()
        else:
            serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super(OrderView, self).get_serializer_context()
        if self.request.method == 'GET':
            context.update({
                'fields': ['id', 'ship_name', 'created_at', 'ship_city', 'payment_method', 'user']
            })
        if self.request.method == 'POST':
            context.update({
                'fields': [
                    'id', 'order_lines', 'ship_name',
                    'ship_email', 'ship_phone', 'ship_address',
                    'ship_city', 'ship_district', 'payment_method',
                    'delivery_fee', 'sub_total', 'total',
                    'user', 'created_at', 'updated_at'
                ]
            })
        return context


class OrderDetail(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_context(self):
        context = super(OrderDetail, self).get_serializer_context()
        if self.request.method == 'PUT':
            context.update({
                'fields': ['id', 'ship_name', 'created_at',
                           'ship_city', 'payment_method', 'user',
                           'order_line_delete', 'order_lines']
            })
        return context


class CategoryList(generics.ListCreateAPIView):
    authentication_classes = []
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_context(self):
        context = super(CategoryList, self).get_serializer_context()
        if self.request.method == 'GET':
            context.update({
                'fields': ['id', 'name', 'image']
            })

        return context

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            serializer.save()
        else:
            serializer.save(user=self.request.user)


class CategoryDetail(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderLineView(generics.CreateAPIView):
    queryset = OrderLine.objects.all()
    serializer_class = OrderLineSerializer


class CartView(APIView):
    authentication_classes = []

    def post(self, request):
        products = get_products(request.data['product_ids'])
        return Response(products, status=status.HTTP_201_CREATED)
