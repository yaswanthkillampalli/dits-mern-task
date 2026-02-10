## DITS MERN - User Management

A MERN stack app for managing users with CRUD, search, pagination, CSV export, and Cloudinary image uploads. The frontend is built with React + Vite, and the backend is an Express API backed by MongoDB.

## Features

- Create, read, update, and delete users
- Search users by name or email
- Infinite scroll pagination
- CSV export
- Profile image upload via Cloudinary

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Hook Form
- Backend: Express, MongoDB (Mongoose), Cloudinary, Multer

## Project Structure

- backend: Express API
- frontend: React UI

## Prerequisites

- Node.js 18+
- MongoDB connection string
- Cloudinary account (for image uploads)

## Environment Variables

### Backend (.env in backend/)

Create a file named `.env` inside the backend folder with:

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

### Frontend (.env in frontend/)

Create a file named `.env` inside the frontend folder with:

VITE_API_URL=http://localhost:3000

## Installation

### 1) Backend

cd backend
npm install

Start the API:

node app.js

The backend runs on http://localhost:3000

### 2) Frontend

cd frontend
npm install

Start the UI:

npm run dev

The frontend runs on the Vite dev URL (usually http://localhost:5173)

## Notes

- Update `VITE_API_URL` if your backend runs on a different host or port.
- Cloudinary is required for profile image uploads. If you do not set Cloudinary variables, uploads will fail.

## API Endpoints

- GET /users (paginated)
- GET /users/:id
- POST /users
- PUT /users
- DELETE /users
- GET /users/search?q=term
- GET /users/export/csv?q=term
