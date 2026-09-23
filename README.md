# Zivara – Gujarat Traditional Ornaments

> **Positioning**: *“Zivara – Authentic Gujarat Traditional Ornaments • Shipped Directly from Gujarat.”*  
> **Brand**: Zivara  
> **Origin & Shipment**: Direct dispatch from Gujarat, India to customer address nationwide  
> **Contact / WhatsApp**: +91 8848242986  
> **Delivery Model**: Select ornament → Order confirmed & processed by Zivara → Shipped directly from Gujarat → Delivered to customer's address.

---

## 1. Project Overview

**Zivara** is a luxury, responsive ornaments showcase and direct-order platform for authentic Gujarat traditional jewellery.

### Core Customer Flow (Zero friction)
$$\text{Browse Ornaments} \longrightarrow \text{Select Ornament} \longrightarrow \text{Order via WhatsApp / Web} \longrightarrow \text{Processed by Zivara} \longrightarrow \text{Shipped from Gujarat} \longrightarrow \text{Delivered to Doorstep}$$

- **No customer account or login required.**
- Every ornament features an **“Enquire / Purchase”** button that immediately launches WhatsApp with the pre-filled message:  
  *“Hello, I am interested in [ORNAMENT NAME]. I would like to purchase this ornament. Please provide the price, availability and delivery details.”*
- Direct voice call button to **+91 8848242986**.
- All orders are processed by Zivara and dispatched straight from Gujarat with safe doorstep delivery.

---

## 2. Localhost URLs

| Component | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5174](http://localhost:5174) | React + Vite + Tailwind CSS luxury showcase |
| **Backend API** | [http://127.0.0.1:8001/api/](http://127.0.0.1:8001/api/) | Django REST Framework API root |
| **Admin Portal** | [http://127.0.0.1:8001/admin/](http://127.0.0.1:8001/admin/) | Django Admin for managing ornaments, images, categories, and business phone number |

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `rajwadi@admin2026`

---

## 3. How to Run Locally

### Option A: Quick Double-Click (Windows)
Double-click `run-dev.bat` (or right-click `run-dev.ps1` and select *Run with PowerShell*). Both the backend and frontend servers will start in separate terminal windows.

---

### Option B: Manual Terminal Commands

#### Step 1: Start Django Backend (Port 8001)
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py migrate
python manage.py seed_data      # Seeds Zivara settings, categories, 12 ornaments & images
python manage.py runserver 127.0.0.1:8001
```
*The backend will be live at `http://127.0.0.1:8001`.*

#### Step 2: Start React Frontend (Port 5174)
Open a new terminal window:
```powershell
cd frontend
npm install                     # (If not already installed)
npm run dev
```
*The frontend will be live at `http://localhost:5174`.*

---

## 4. Architecture & Key Features

### Frontend (React + Vite + Tailwind CSS)
- **Palette**: Cream/Ivory (`#FDFBF7`), Royal Gold (`#C5A059`, `#D4AF37`), Deep Maroon (`#6B1D2F`), Dark Brown (`#2C1810`), White.
- **Typography**: Display serif (`Cinzel`, `Cormorant Garamond`) and clean sans (`Montserrat`).
- **Pages**:
  - `HomePage`: Hero presentation, category grid, featured collection, "Order & Delivery" 4-step flow, and trust badges.
  - `CollectionPage`: Responsive product grid, live search, category filter pills, availability filters (In Stock, Made to Order, Sold Out), and sorting.
  - `OrnamentDetailPage`: Large product photo, multi-angle thumbnail gallery, craftsmanship notes, purity, weight, **“Enquire / Purchase”** button with exact WhatsApp template, and related ornaments.
  - `ContactPage`: Gujarat shipment information, **Phone / WhatsApp: +91 8848242986**, operating hours, and customer enquiry form.

### Backend (Django + Django REST Framework)
- **Models**:
  - `Category`: Name, slug, description, display order, active toggle.
  - `Ornament`: Name, slug, category, description, price, is_price_on_request, availability, is_featured, purity, weight_approx.
  - `OrnamentImage`: Multi-image inline uploads in Django Admin with preview thumbnails.
  - `BusinessSettings` (Singleton): Configurable store name (Zivara), WhatsApp number (`+918848242986`), phone number, business location (`Gujarat, India`), and business hours.
  - `ContactInquiry`: Stores customer submissions from the contact form for admin review.
- **Dual Database Strategy**:
  - Default: Instant zero-config SQLite (`db.sqlite3`).
  - Production: Automatically uses PostgreSQL when `DATABASE_URL` is set (e.g. Google Cloud SQL).

---

## 5. Deployment Instructions (Google Cloud Run / Production)

The project is structured with production Dockerfiles for both backend and frontend.

### A. Deploy Backend to Google Cloud Run with Cloud SQL (PostgreSQL)

1. **Create Cloud SQL PostgreSQL Instance**:
   ```bash
   gcloud sql instances create zivara-db --database-version=POSTGRES_16 --tier=db-f1-micro --region=asia-south1
   gcloud sql databases create zivara_db --instance=zivara-db
   gcloud sql users set-password postgres --instance=zivara-db --prompt-for-password
   ```

2. **Build and Push Backend Container**:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/zivara-backend
   ```

3. **Deploy Backend to Cloud Run**:
   ```bash
   gcloud run deploy zivara-backend \
     --image gcr.io/YOUR_PROJECT_ID/zivara-backend \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --add-cloudsql-instances YOUR_PROJECT_ID:asia-south1:zivara-db \
     --set-env-vars DATABASE_URL="postgres://postgres:PASSWORD@/zivara_db?host=/cloudsql/YOUR_PROJECT_ID:asia-south1:zivara-db",DJANGO_SECRET_KEY="YOUR_PROD_SECRET",DEBUG="False",ALLOWED_HOSTS="*"
   ```

### B. Deploy Frontend to Firebase Hosting / Cloud Storage / Vercel

1. Configure `frontend/.env.production`:
   ```env
   VITE_API_BASE_URL=https://zivara-backend-YOUR_HASH-uc.a.run.app
   ```
2. Build static bundle:
   ```bash
   cd frontend
   npm run build
   ```
3. Deploy the `dist/` directory via Firebase Hosting or Cloud Storage + Cloud CDN:
   ```bash
   firebase deploy --only hosting
   ```

---

## 6. Verification & Testing

To run the automated backend test suite:
```powershell
cd backend
.\venv\Scripts\python.exe manage.py test ornaments
```
*All 8 API endpoint tests pass with 0 errors.*
