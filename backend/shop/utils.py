from shopapp.settings import r


def get_products_from_redis(product_ids):
    pipeline = r.pipeline()
    for product_id in product_ids:
        pipeline.hgetall('product:{}'.format(product_id))

    product = pipeline.execute()
    return product
