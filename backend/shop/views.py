import json
import os

from rest_framework import generics, status, parsers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters

from shop.models import Product, Order, Category, OrderLine, image_categories_path
from shop.serializers import ProductSerializer, OrderSerializer, CategorySerializer, OrderLineSerializer
from shop.utils import get_products
from django.conf import settings
from storages.models import FactoryStorage


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
                'fields': ['id', 'name', 'price', 'quantity', 'image_url', 'category']
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
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]
    http_method_names = ['get', 'post']

    def get_serializer_context(self):
        context = super(CategoryList, self).get_serializer_context()
        if self.request.method == 'GET':
            context.update({
                'fields': ['id', 'name', 'image_url']
            })

        return context

    def create(self, request, *args, **kwargs):
        data = request.data
        if request.FILES:
            storage = FactoryStorage(settings.STORAGE_TYPE)
            f = request.FILES['image']
            url = os.path.join(image_categories_path(), f.name)
            data['image'] = url
            storage.upload(f, image_categories_path())

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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


