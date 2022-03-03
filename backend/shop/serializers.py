from rest_framework import serializers

from shop.models import Category, Product, Order, OrderLine, image_categories_path, image_products_path
from authentication.serializers import UserSerializer


class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('context', {}).get('fields', None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class CategorySerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'description', 'image_url']


class ProductSerializer(DynamicFieldsModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class OrderLineSerializer(DynamicFieldsModelSerializer):
    id = serializers.UUIDField(required=False)
    product = ProductSerializer(read_only=True, context={'fields': ['id', 'name', 'price', 'quantity', 'image']})
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = OrderLine
        fields = ['id', 'product', 'quantity', 'price', 'subtotal', 'product_id']
        read_only_fields = ['subtotal']


class OrderSerializer(DynamicFieldsModelSerializer):

    order_lines = OrderLineSerializer(many=True)
    user = UserSerializer(read_only=True)
    order_line_delete = serializers.ListField(child=serializers.UUIDField(), write_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_lines', 'ship_name',
                  'ship_email', 'ship_phone', 'ship_address',
                  'ship_city', 'ship_district', 'payment_method',
                  'delivery_fee', 'sub_total', 'total',
                  'user', 'created_at', 'updated_at', 'order_line_delete']
        read_only_fields = ['sub_total', 'total', 'name']

    def create(self, validated_data):
        order_lines_data = validated_data.pop('order_lines')
        order = Order.objects.create(**validated_data)
        for order_line_data in order_lines_data:
            OrderLine.objects.create(order=order, **order_line_data)
        return order

    def update(self, instance, validated_data):
        order_line_delete_ids = validated_data.pop('order_line_delete')
        order_lines = validated_data.pop('order_lines')
        if order_line_delete_ids:
            OrderLine.objects.filter(id__in=order_line_delete_ids).delete()
        for order_line in order_lines:
            if 'id' in order_line:
                order_line_id = order_line.pop('id')
                OrderLine.objects.filter(id=order_line_id).update(**order_line)
            else:
                OrderLine.objects.create(order_id=instance.id, **order_line)

        return super(OrderSerializer, self).update(instance, validated_data)
