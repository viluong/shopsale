from celery import shared_task

from shopapp.settings import r


@shared_task
def cached_product_to_redis(product):
    r.hmset('product:{0}'.format(product.get('id')), product)