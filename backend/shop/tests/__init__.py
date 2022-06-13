import factory
from factory import django, Faker
from faker import Faker as FakerClass
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import User
from authentication.tests import UserFactory
from shop.models import Category, Product, Order, OrderLine
from rest_framework.test import APITestCase, APIClient

faker_obj = FakerClass()


class CategoryFactory(django.DjangoModelFactory):

    name = factory.Sequence(lambda n: 'Category {}'.format(n))
    description = 'Description Category'
    image = '/image.png'

    class Meta:
        model = Category


class ProductFactory(django.DjangoModelFactory):
    name = factory.Sequence(lambda n: 'Product {}'.format(n))
    image = '/image.png'
    description = 'Description Product'
    price = Faker('numerify', text='%####.0')
    quantity = 10
    category = factory.SubFactory(CategoryFactory)
    is_public = True

    class Meta:
        model = Product


class OrderFactory(django.DjangoModelFactory):
    ship_name = 'Ship name'
    ship_email = 'ship@gmail.com'
    ship_phone = Faker('phone_number')
    delivery_fee = Faker('numerify', text='%##.0')
    user = factory.SubFactory(UserFactory)

    class Meta:
        model = Order


class OrderLineFactory(django.DjangoModelFactory):
    product = factory.SubFactory(ProductFactory)
    order = factory.SubFactory(OrderFactory)
    price = factory.LazyAttribute(lambda o: o.product.price)
    quantity = 1

    class Meta:
        model = OrderLine


class TestCaseBase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super(TestCaseBase, cls).setUpClass()
        cls.client = APIClient()
        cls.faker_obj = faker_obj
        user_exists = User.objects.create(
            email='js@js.com',
            password='js.sj',
            first_name="Vi",
            last_name="Luong")
        refresh_obj = RefreshToken.for_user(user_exists)
        cls.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(refresh_obj.access_token))

