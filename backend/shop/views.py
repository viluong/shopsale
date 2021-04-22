import json

from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView

from shop.models import Product, Order, Category, OrderLine
from shop.serializers import ProductSerializer, OrderSerializer, CategorySerializer, OrderLineSerializer
from shop.utils import get_products


class ProductList(generics.ListAPIView):
    authentication_classes = []
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super(ProductList, self).get_serializer_context()
        context.update({
            'fields': ['id', 'name', 'price', 'quantity', 'image']
        })
        return context


class ProductDetail(generics.RetrieveAPIView):
    authentication_classes = []
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderDetail(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CategoryList(generics.ListAPIView):
    authentication_classes = []
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderLineView(generics.CreateAPIView):
    queryset = OrderLine.objects.all()
    serializer_class = OrderLineSerializer


class CartView(APIView):
    authentication_classes = []

    def post(self, request):
        print("request.data['product_ids']", request.data['product_ids'])
        products = get_products(request.data['product_ids'])
        return Response(products, status=status.HTTP_201_CREATED)
