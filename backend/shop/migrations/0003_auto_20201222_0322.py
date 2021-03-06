# Generated by Django 3.1.4 on 2020-12-22 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_auto_20201221_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment_method',
            field=models.CharField(choices=[('COD', 'Payment on delivery'), ('PAYPAL', 'Payment with Paypal'), ('PAYVN', 'Payment with PayVn')], max_length=10),
        ),
    ]
