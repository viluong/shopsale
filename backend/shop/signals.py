from celery.utils.log import get_logger

from django.db.models.signals import post_save
from django.dispatch import receiver

from shop.models import Product
from shop.tasks import cached_product_to_redis


@receiver(post_save, sender=Product)
def cached_product(sender, instance, created, **kwargs):
    product = instance.to_redis()
    cached_product_to_redis(product)