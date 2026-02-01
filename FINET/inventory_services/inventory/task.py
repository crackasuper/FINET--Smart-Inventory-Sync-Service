
# this page is where celery tasks are defined
from celery import shared_task
import pandas as pd # for csv file handling
from .models import Product # import the Product model

#i am reading csv file from github repo directly
CSV_URL = "https://github.com/crackasuper/FINET--Smart-Inventory-Sync-Service/blob/main/FINET/inventory_services/mock_data/inventory_services.csv"

@shared_task
def sync_inventory():

    data = pd.read_CSV(CSV_URL) # read the csv file using pandas

    for index, row in data.iterrows():
        # for each row in the csv file, update or create a Product instance
        Product.objects.update_or_create(
            sku=row['sku'],
            defaults={
                'quantity': int(row['quantity']), #convert quantity to integer and we only need quantity to send into UI
            }
        )
