# Tomato Food Delivery Application

A full-stack Food Delivery Web Application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
FOOD_DELIVERY/
├── backend/    # Node.js + Express REST API & MongoDB connection
├── frontend/   # Customer-facing React (Vite) application
└── admin/      # Restaurant / Admin panel React (Vite) application
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your credentials
npm run server
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Copy .env.example to .env and configure VITE_BACKEND_URL
npm run dev
```

### 3. Admin Panel Setup
```bash
cd admin
npm install
# Copy .env.example to .env and configure VITE_BACKEND_URL
npm run dev
```

## Deployment Guide

### Backend (Render)
1. Create a new **Web Service** on Render connected to this repository.
2. Set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables in Render:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
6. Once deployed, copy your Render service URL (e.g., `https://your-backend.onrender.com`).

### Frontend (Vercel)
1. Import repository on Vercel.
2. Set Root Directory to `frontend`.
3. Add Environment Variables:
   - `VITE_BACKEND_URL`: your Render backend URL
   - `VITE_RAZORPAY_KEY_ID`: your Razorpay key ID

### Admin Panel (Vercel)
1. Import repository again as a separate project on Vercel.
2. Set Root Directory to `admin`.
3. Add Environment Variable:
   - `VITE_BACKEND_URL`: your Render backend URL
