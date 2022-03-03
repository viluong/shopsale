from django.core.management.base import BaseCommand
from shop.models import Order
from shop.models import OrderLine

from shop.models import Product


class Command(BaseCommand):
    help = 'Init Orders'

    def handle(self, *args, **kwargs):
        print("START INIT ORDERS")
        for i in range(5):
            order = Order.objects.create(
                ship_name='Test',
                ship_phone='Test',
                ship_address='Test',
                ship_city='Test',
                ship_district='Test',
                payment_method='COD'
            )
            order_lines_data = [{
                'product': Product.objects.first(),
                'price': 100000,
                'quantity': 1
            }]
            for order_line_data in order_lines_data:
                OrderLine.objects.create(order=order, **order_line_data)
        print("END")