from rest_framework import serializers

from shop.models import Category, Product, Order, OrderLine


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
        fields = ['id', 'name']


class ProductSerializer(DynamicFieldsModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'


class OrderLineSerializer(DynamicFieldsModelSerializer):
    product = ProductSerializer(read_only=True, context={'fields': ['id', 'name', 'price', 'quantity', 'image']})
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = OrderLine
        fields = ['id', 'product', 'quantity', 'price', 'subtotal', 'product_id']
        read_only_fields = ['subtotal']


class OrderSerializer(DynamicFieldsModelSerializer):

    order_lines = OrderLineSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'order_lines', 'ship_name',
                  'ship_email', 'ship_phone', 'ship_address',
                  'ship_city', 'ship_district', 'payment_method',
                  'delivery_fee', 'sub_total', 'total',
                  'name']
        read_only_fields = ['sub_total', 'total', 'name']

    def create(self, validated_data):
        order_lines_data = validated_data.pop('order_lines')
        order = Order.objects.create(**validated_data)
        for order_line_data in order_lines_data:
            OrderLine.objects.create(order=order, **order_line_data)
        return order
