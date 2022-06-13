from unittest import mock

from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response

from shop.tests import TestCaseBase
from shop.tests import CategoryFactory
from shop.views import CategoryList


def check_get_categories_success(response):
    return response.status_code == status.HTTP_200_OK and 'results' in response.data


def check_get_categories_fail(response):
    return response.status_code == status.HTTP_400_BAD_REQUEST \
           and 'results' not in response.data


def check_create_category_success(response, data):
    return response.status_code == status.HTTP_201_CREATED \
        and 'id' in response.data and response.data['name'] == data['name']


def check_create_category_fail(response):
    return response.status_code not in (status.HTTP_200_OK, status.HTTP_201_CREATED)


def get_categories_fail(mock_api):
    mock_api.return_value = Response({
        'detail': 'Error'
    }, status=status.HTTP_400_BAD_REQUEST)


class CategoryTestCase(TestCaseBase):

    @classmethod
    def setUpClass(cls):
        super(CategoryTestCase, cls).setUpClass()
        cls.url_api = reverse('categories')

    def test_get_categories_success(self):
        CategoryFactory.create_batch(size=5)
        response = self.client.get(self.url_api)
        self.assertTrue(check_get_categories_success(response))

    @mock.patch.object(CategoryList, 'get')
    def test_get_categories_fail(self, mock_api):
        get_categories_fail(mock_api)
        response = self.client.get(self.url_api)
        self.assertTrue(check_get_categories_fail(response))

    def test_create_category_success(self):
        data = {
            'name': 'Hat',
            'image': '/test.jbg'
        }
        response = self.client.post(self.url_api, data)
        self.assertTrue(check_create_category_success(response, data))

    def test_create_category_fail(self):
        data = {

        }
        response = self.client.post(self.url_api, data)
        self.assertTrue(check_create_category_fail(response))
