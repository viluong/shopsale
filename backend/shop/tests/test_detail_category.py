from django.urls import reverse
from rest_framework import status

from shop.tests import TestCaseBase, CategoryFactory


def check_get_category_success(response, category):
    return response.status_code == status.HTTP_200_OK \
           and response.data['name'] == category.name \
           and 'description' in response.data \
           and response.data['id'] == category.id


def check_get_category_fail(response):
    return response.status_code != status.HTTP_200_OK \
           and 'results' not in response.data


def check_update_category_success(response, category, data):
    return response.status_code != status \
           and response.data['name'] == data['name'] \
           and category.id == response.data['id']


def check_update_category_fail(response):
    return response.status_code != status.HTTP_200_OK \
           and 'results' not in response.data


class DetailCategoryTestCase(TestCaseBase):

    @classmethod
    def setUpClass(cls):
        super(DetailCategoryTestCase, cls).setUpClass()
        cls.category = CategoryFactory.create()
        cls.url_api = reverse('detail-category', kwargs={'pk': cls.category.id})

    def test_get_category_success(self):
        response = self.client.get(self.url_api)
        self.assertTrue(check_get_category_success(response, self.category))

    def test_get_category_fail(self):
        url = reverse('detail-category', kwargs={'pk': 'non'})
        response = self.client.get(url)
        self.assertTrue(check_get_category_fail(response))

    def test_put_category_success(self):
        data = {
            'name': 'Category Updated'
        }
        response = self.client.put(self.url_api, data)
        self.assertTrue(check_update_category_success(response, self.category, data))

    def test_put_category_fail(self):
        data = {
            'text': 'text'
        }
        response = self.client.put(self.url_api, data)
        self.assertTrue(check_update_category_fail(response))