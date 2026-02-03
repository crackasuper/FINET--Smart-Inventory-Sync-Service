
# this page is where celery tasks are defined
from celery import shared_task
import csv
import requests
from io import StringIO
from django.utils.timezone import now
from .models import Product
Product.objects.all()

CSV_URL = "https://raw.githubusercontent.com/crackasuper/FINET--Smart-Inventory-Sync-Service/main/FINET/inventory_services/mock_data/inventory_services.csv"
@shared_task
def sync_inventory():
    response = requests.get(CSV_URL)
    response.raise_for_status()

    csv_file = StringIO(response.text)
    reader = csv.DictReader(csv_file)
    print("HEADERS:", reader.fieldnames)
    print("CSV URL:", CSV_URL)
    print("Response Status Code:", response.status_code)
    print("Response Content:", response.text[:500])  # Print first 500 characters of the response content
  

    response = requests.get(CSV_URL)
   


    for row in reader:
        Product.objects.update_or_create(
            sku=row["sku"],
            defaults={
                "name": row["name"],
                "quantity": int(row["quantity"]),
                "last_updated": now(),
            }
        )



