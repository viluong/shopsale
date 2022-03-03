import os
import uuid
from django.conf import settings
from django.db import models
from itertools import chain

from authentication.models import User
from shop.enums import PaymentMethod


def image_categories_path():
    return os.path.join(settings.LOCATION_STORAGE, 'categories/')


def image_products_path():
    return os.path.join(settings.LOCATION_STORAGE, 'products/')


def get_url_storage():
    url = settings.SITE_URL
    if settings.STORAGE_TYPE == 'aws':
        pass

    return url


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return str(self.to_dict())

    def to_dict(instance):
        opts = instance._meta
        data = {}
        for f in chain(opts.concrete_fields, opts.private_fields):
            data[f.name] = f.value_from_object(instance)
        for f in opts.many_to_many:
            data[f.name] = [i.id for i in f.value_from_object(instance)]
        return data

    def to_redis(instance):
        opts = instance._meta
        data = {}
        for f in chain(opts.concrete_fields, opts.private_fields):
            data[f.name] = str(f.value_from_object(instance))
        for f in opts.many_to_many:
            data[f.name] = [str(i.id) for i in f.value_from_object(instance)]
        return data

    class Meta:
        abstract = True
        ordering = ['-created_at']


class Category(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250, null=False, blank=False)
    image = models.CharField(null=True, blank=True, max_length=150)
    description = models.TextField(null=True, blank=True)

    @property
    def image_url(self):
        url = get_url_storage()
        return '{}/{}'.format(url, self.image)

    def __str__(self):
        return self.name


class Product(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250, null=False, blank=False)
    image = models.CharField (null=True, blank=True, max_length=150)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_public = models.BooleanField(default=False)
    
    @property
    def image_url(self):
        url = get_url_storage()
        return '{}/{}'.format(url, self.image)

    def __str__(self):
        return self.name


class Order(BaseModel):
    id = models.AutoField(primary_key=True)
    ship_name = models.CharField(max_length=100, null=False, blank=False)
    ship_email = models.EmailField(null=True, blank=True)
    ship_phone = models.CharField(max_length=100, null=False, blank=False)
    ship_address = models.CharField(max_length=150, null=False, blank=False)
    ship_city = models.CharField(max_length=100, null=False, blank=False)
    ship_district = models.CharField(max_length=50, null=False, blank=False)
    payment_method = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in PaymentMethod]
    )
    delivery_fee = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    @property
    def name(self):
        return "Order: {:05d}".format(self.id)

    @property
    def sub_total(self):
        sub_total = 0
        for line in self.order_lines.all():
            sub_total += line.subtotal
        return sub_total

    @property
    def total(self):
        return self.sub_total + self.delivery_fee

    def __str__(self):
        return self.name


class OrderLine(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_lines')
    price = models.FloatField(default=0)
    quantity = models.IntegerField(default=1)

    @property
    def subtotal(self):
        return self.price * float(self.quantity)

    def __str__(self):
        return "{} : {}".format(self.product.name, self.quantity)
