# Shop - Full-Stack E-commerce Application

A production-style full-stack e-commerce project built with a React + Vite frontend and an Express + MongoDB backend. It supports customer browsing and checkout, secure authentication, admin product management, image upload, and online payments with Razorpay.

## Highlights

- Customer flows
  - Browse products with pagination and filters
  - View detailed product pages
  - Add/remove items in cart and place orders
  - Checkout with Cash on Delivery (COD) or Razorpay
  - View order history (`My Orders`)
- Authentication and access control
  - Register/login with JWT auth
  - Protected routes for signed-in users
  - Role-based admin access (`user` / `admin`)
- Admin features
  - Create, edit, and delete products
  - Upload product images
  - View and update order status
- Platform features
  - MongoDB persistence for users, products, and orders
  - Cloudinary image uploads with local fallback when provider is unreachable
  - API health check endpoint (`/api/health`)

## Tech Stack

- Frontend
  - React 18
  - Vite 6
  - React Router 7
  - Tailwind CSS 3
  - Axios
- Backend
  - Node.js + Express
  - MongoDB + Mongoose
  - JWT authentication
  - Razorpay payment integration
  - Cloudinary + Multer (image upload)

## Project Structure

```text
shop/
  src/                    # Frontend app (pages, features, context, services)
  public/                 # Static frontend assets
  server/
    src/
      controllers/        # Route handlers
      routes/             # API routes
      models/             # Mongoose models
      middleware/         # Auth, upload, error handling
      config/             # DB, Cloudinary, Razorpay config
    uploads/              # Local image fallback storage
  tests/                  # unit/integration placeholders
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally or remote connection URI
- Razorpay test account (for online payment flow)
- Cloudinary account (for product image uploads)

## Environment Variables

### Frontend (`/.env`)

Copy `.env.example` to `.env` and update values:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BRAND_NAME=Shop
```

### Backend (`/server/.env`)

Copy `server/.env.example` to `server/.env` and update values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/shop
JWT_SECRET=replace-with-a-strong-secret
CLIENT_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## Installation

```bash
# root (frontend)
npm install

# backend
npm --prefix server install
```

## Run Locally

Use two terminals.

Terminal 1 (backend):

```bash
npm run dev:server
```

Terminal 2 (frontend):

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Available Scripts

### Root

- `npm run dev` - start frontend dev server
- `npm run dev:client` - start frontend dev server
- `npm run dev:server` - start backend via `server` workspace
- `npm run build` - build frontend for production
- `npm run preview` - preview production frontend build

### Server (`/server`)

- `npm run dev` - run backend with nodemon
- `npm run start` - run backend with node
- `npm run seed` - seed products from `src/data/products.json`

## Seeding Product Data

From project root:

```bash
npm --prefix server run seed
```

This clears existing products and inserts records from `src/data/products.json`.

## API Overview

Base URL: `/api`

- Auth
  - `POST /auth/register`
  - `POST /auth/login`
- Products
  - `GET /products`
  - `GET /products/:id`
  - `POST /products` (admin)
  - `PUT /products/:id` (admin)
  - `DELETE /products/:id` (admin)
  - `POST /products/upload-image` (admin)
- Orders
  - `GET /orders` (user/admin)
  - `POST /orders` (COD)
  - `PATCH /orders/:orderId/status` (admin)
  - `POST /orders/payment/razorpay/order`
  - `POST /orders/payment/razorpay/verify`
- Health
  - `GET /health`

## Notes

- Admin role is currently inferred in registration when email contains `admin`.
- For Razorpay testing, use test credentials and test payment methods only.
- Keep all secrets in `.env` files and never commit real keys to Git.

## Future Improvements

- Add automated unit/integration tests (test directories already scaffolded)
- Add refresh token/session invalidation strategy
- Add order invoices, coupons, and analytics dashboard
- Add CI pipeline for linting, tests, and deployment
