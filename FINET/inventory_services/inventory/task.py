
# this page is where celery tasks are defined
from celery import shared_task
import pandas as pd # for csv file handling
from .models import Product # import the Product model
from pathlib import Path
#base directory path that help us to identify the location of csv file
BASE_DIR = Path(__file__).resolve().parent.parent
CSV_URL = BASE_DIR / "mock_data" / "inventory_data.csv" #path to csv file

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
