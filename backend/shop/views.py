from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView

from shop.models import Product, Order, Category, OrderLine
from shop.serializers import ProductSerializer, OrderSerializer, CategorySerializer, OrderLineSerializer
from shop.utils import get_products_from_redis


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super(ProductList, self).get_serializer_context()
        context.update({
            'fields': ['id', 'name', 'price', 'quantity', 'image']
        })
        return context


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetail(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderLineView(generics.CreateAPIView):
    queryset = OrderLine.objects.all()
    serializer_class = OrderLineSerializer


class   CartView(APIView):

    def post(self, request):
        products = get_products_from_redis(request.data['product_ids'])
        return Response(products, status=status.HTTP_201_CREATED)
