from shop.models import Product


def get_products(product_ids):
    objects = Product.objects.filter(id__in=product_ids).values()
    objects = dict([(str(obj['id']), obj) for obj in objects])
    sorted_objects = [objects[str(id)] for id in product_ids]
    return sorted_objects
