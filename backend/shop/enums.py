from enum import Enum


class PaymentMethod(Enum):
    COD = "Payment on delivery"
    PAYPAL = "Payment with Paypal"
    PAYVN = "Payment with PayVn"
