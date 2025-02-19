# Project B Checklist: FW Webb Product Catalog
## Objective
Build a product catalog web application with features for browsing, filtering, and viewing product details.
---
## ✅ Frontend (Next.js)
1. [x] **Set Up Pages**
   - [x] `/`: Product listing page.
   - [x] `/product/[id]`: Product details page.
   - [x] `/contact`: Contact form.
2. [x] **Install React Hooks**
   - [x] Install any necessary React state management libraries.
     ```bash
     npm install
     ```
3. [ ] **Fetch Data**
   - [x] Integrate REST API endpoints to fetch product data.
   - [ ] Add functionality for paginated product grids, filters, and search bars.
---
## ✅ Backend (Node.js with Express)
1. [ ] **Create Routes**
   - [x] `/api/products`: Fetch product list.  
   - [x] `/api/products/:id`: Fetch product details.  
   - [x] `/api/categories`: Fetch category list. 
   - [x] `/api/brands`: Fetch brand list. 
   - [ ] `/api/contact`: Handle contact form submissions.
2. [x] **Integrate PostgreSQL Database**
   - [x] Set up database connection on Railway.
   - [x] Update API routes to fetch data from the database.
   - [x] Use Prisma ORM for schema and queries.
---
## ✅ Database (PostgreSQL)
1. [x] **Define Tables**
   - [x] `products`: `id`, `name`, `description`, `price`.  
     - [x] Add `category`, `brand`, `image_url`, `video_url`.
   - [x] `categories`: `id`, `name`.
   - [x] `brands`: `id`, `name`.
2. [x] **Seed Initial Data**
   - [x] Add sample product data to the database.
   - [x] Populate `categories` and `brands`.
---
## ✅ Testing
1. [ ] Write Integration Tests:
   - [x] `/api/products` endpoint.
   - [x] `/api/products/:id` endpoint.
   - [x] `/api/categories` endpoint.
   - [x] `/api/brands` endpoint.
   - [ ] `/api/contact` endpoint.
2. [x] Verify frontend for:
   - [x] Correct data display.
   - [x] Mobile responsiveness.
---
## ✅ Deployment
1. [x] **Frontend**: Deployed to Netlify.  
2. [x] **Backend**: Deployed to Railway.  
3. [ ] Verify production functionality:
   - [x] `/api/products` fetches product list.
   - [x] `/api/products/:id` fetches product details.
   - [x] `/api/categories` fetches category list.
   - [x] `/api/brands` fetches brand list.
   - [ ] `/api/contact` submits forms successfully.
---
## Next Steps
- Document CORS configuration for Netlify, Railway, and local environment.
- Understand purpose of each configuration file in repository.
- Ensure CORS configuration works for Netlify → Railway integration.