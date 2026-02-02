
# FINET Smart Inventory Sync Service (Django + React)

## Project Idea

The **Smart Inventory Sync Service** is a lightweight ERP-style system that manages product inventory and keeps stock levels synchronized with an external supplier feed. The system automatically fetches inventory updates from a CSV source, processes them in the background, and exposes updated data to a React-based frontend dashboard.



---

## System Architecture Overview

**Core Stack**

* **Backend:** Python, Django, Django REST Framework
* **Background Tasks:** Celery + Redis
* **Frontend:** React (functional components) + Bootstrap
* **Data Source:** External CSV file (mock supplier feed)

**Data Flow**

```
CSV File (External Supplier)
        ↓
Background Worker (Celery Task)
        ↓
Django ORM / Database
        ↓
Django REST API
        ↓
React Inventory Dashboard
```

This design ensures clear separation between data ingestion, business logic, API delivery, and UI presentation.

---

## Backend Design (Django + DRF)

### Product Model

The backend stores inventory data using the following schema:

* `id` – Primary key
* `name` – Product name
* `sku` – Unique product identifier
* `quantity` – Current stock level
* `last_updated` – Timestamp of last sync

### Inventory Sync Logic

* A **Celery background task** periodically fetches a CSV file from a configured URL.
* The CSV file is parsed row by row.
* Product quantities are updated or created in the database.
* Sync runs automatically

### Why Background Tasks?

* Prevents blocking API requests
* Scales well for large inventory files
* Mimics real ERP batch-processing behavior

---

## Frontend Design (React)

### Features

* Displays inventory in a clean, professional dashboard
* Highlights stock status:

  * **Out of Stock** (quantity = 0)
  * **Low Stock** (quantity < 10)
  * **In Stock** (quantity ≥ 10)
* Uses visual badges and table layout for quick decision-making

### UI Focus

The UI is intentionally simple and professional, following ERP dashboard conventions:

* Status-based color indicators
* Loading states
* Readable, business-focused layout

---

## Why This Architecture?

### Scheduled Job vs Manual Trigger

**Chosen:** Scheduled background job (Celery)

**Reasons:**

* Inventory updates are predictable and periodic
* No need for user interaction to trigger sync
* Better performance and reliability

**Trade-off:**

* Requires Redis and Celery workers
* Slightly higher setup complexity

This trade-off mirrors real-world ERP systems.

---

## Setup and Run Instructions

### Prerequisites

* Python 3.9+
* Node.js 14+
* Redis
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/crackasuper/FINET--Smart-Inventory-Sync-Service.git
cd FINET--Smart-Inventory-Sync-Service
cd /inventory_services/inventory_services
```

---

### 2. Backend Setup

Create and activate virtual environment:

```bash
python -m venv FINET
source FINET/bin/activate   # Linux/macOS

```

Install dependencies:

```bash
pip install -r requirements.txt
or
pip install django djangorestframework django-cors-headers celery redis django-celery-beat pandas

```

Run migrations:

```bash
cd FINET/inventory_services/inventory_services
python manage.py migrate
```

Create admin user:

```bash
python manage.py createsuperuser
```

Start Django server:

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3. Redis Setup
install Redis
sudo apt update
sudo apt install redis-server
Start Redis server:

```bash
#on Terminal 1 run 
redis-server
```

Verify:

```bash
redis-cli ping
# PONG will be printed
```

---

### 4. Celery Worker & Scheduler

start Redis-server:
```bash
#on Terminal 1 run 
redis-server
```

Start Celery worker:

```bash
#on Terminal 2 run
celery -A inventory_services worker -l info
```

Start Celery beat (scheduler):

```bash
#on Terminal 3 run
celery -A inventory_services beat -l info
```
Start backend running:
#on Terminal 4 run this
```bash
python3 manage.py runsserver
```

The inventory sync task will now run automatically.

---
###N.B make sure you are at correct directory
-> FINET--Smart-Inventory-Sync-Service/FINET/inventory_services

### 5. Frontend Setup

Navigate to frontend folder:

```bash
cd /FINET--Smart-Inventory-Sync-Service/FINET/inventory-services-ui
```

Install dependencies:

```bash
npm install
npm install axios bootstarp
```

Start React app:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---
