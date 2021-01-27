# Generated by Django 3.1.4 on 2020-12-19 14:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import shop.enums
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.UUID('6d393922-f0a7-4dba-a95e-a7394025d37c'), editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('image', models.URLField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ship_name', models.CharField(max_length=100)),
                ('ship_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('ship_phone', models.CharField(max_length=100)),
                ('ship_address', models.CharField(max_length=150)),
                ('ship_city', models.CharField(max_length=100)),
                ('ship_district', models.CharField(max_length=50)),
                ('payment_method', models.CharField(choices=[(shop.enums.PaymentMethod['COD'], 'Payment on delivery'), (shop.enums.PaymentMethod['PAYPAL'], 'Payment with Paypal'), (shop.enums.PaymentMethod['PAYVN'], 'Payment with PayVn')], max_length=10)),
                ('delivery_fee', models.FloatField(default=0)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.UUID('39c5f93f-74f3-43b3-ac5f-f6041e4463be'), editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('image', models.URLField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.FloatField(default=0)),
                ('quantity', models.IntegerField(default=0)),
                ('is_public', models.BooleanField(default=False)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='OrderLine',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.UUID('2b81890b-678d-44c4-b7c4-31b770c39ffa'), editable=False, primary_key=True, serialize=False)),
                ('price', models.FloatField(default=0)),
                ('quantity', models.IntegerField(default=1)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_lines', to='shop.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
