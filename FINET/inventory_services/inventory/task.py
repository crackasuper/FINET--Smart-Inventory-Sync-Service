

import csv
import requests
from io import StringIO
from celery import shared_task
from django.utils.timezone import now
from .models import Product

CSV_URL = "https://raw.githubusercontent.com/crackasuper/FINET--Smart-Inventory-Sync-Service/main/FINET/inventory_services/mock_data/inventory_services.csv"

@shared_task
def sync_inventory():
    response = requests.get(CSV_URL)
    response.raise_for_status()

    csv_file = StringIO(response.text)
    reader = csv.DictReader(csv_file)

    if reader.fieldnames:
        reader.fieldnames = [h.strip().lstrip("\ufeff") for h in reader.fieldnames]

    for row in reader:
        Product.objects.update_or_create(
            sku=row["sku"],
            defaults={
                "name": row["name"],
                "quantity": int(row["quantity"]),
                "last_updated": now(),
            }
        )
