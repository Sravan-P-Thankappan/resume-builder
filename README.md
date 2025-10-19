# Resume Backend - Minimal (Express + MongoDB)

## Overview
Minimal backend for a Resume Ecosystem (trial). Features:
- Express.js + MongoDB (Mongoose)
- JWT authentication (register/login)
- Resume model (projects, skills, courses, achievements)
- `/api/resume/pdf` endpoint to generate and download a PDF resume

## Setup
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the server:
   ```
   npm run dev
   ```
4. Endpoints:
   - `POST /api/auth/register` - register
   - `POST /api/auth/login` - login (returns JWT)
   - `PUT /api/resume` - update resume (auth required)
   - `GET /api/resume` - get resume (auth required)
   - `GET /api/resume/pdf` - download resume PDF (auth required)

## Notes
- This is a minimal starter intended for trial/demo. Extend as needed.
