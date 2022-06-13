from django.urls import reverse

from shop.tests import TestCaseBase, ProductFactory


def check_get_products_success(response):
    return True


class ProductTestCase(TestCaseBase):

    @classmethod
    def setUpClass(cls):
        super(ProductTestCase, cls).setUpClass()
        cls.api_url = reverse('products')

    def test_get_products_success(self):
        ProductFactory.create_batch(size=5)
        response = self.client.get(self.api_url)
        self.assertTrue(check_get_products_success(response))
