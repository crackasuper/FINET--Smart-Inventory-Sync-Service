from django.db import models

# Create your models here.

#preparing DB models for inventory app

class Product(models.Model):
    name = models.CharField(max_length=225)
    sku = models.CharField(max_length=100, unique=True)
    quantity = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (SKU: {self.sku}) - Quantity: {self.quantity}"