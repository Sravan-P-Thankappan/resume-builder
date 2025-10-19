# Resume Builder 

A backend system built with Node.js, Express.js and MongoDB for resume building..

---

## 🚀 Tech Stack

- **Server:** Node.js, Express.js,  
- **Database:** MongoDB  
- **ORM:** Mongoose  

---

## 📄 API Documentation

The full API contract and usage examples are available here:

**URL:** [Google Docs Link](https://docs.google.com/document/d/1L5kpiaK_RNK5mnU6caw5wcFQcVJDoB9_yNZIDS6M_4M/edit?tab=t.0)

## ⚙️ Local Setup Instructions

Follow the steps below to run the project locally:

 1. Clone the Repository
```bash
git clone https://github.com/Sravan-P-Thankappan/resume-builder.git
```
 2. Go to projejct directory
```bash
cd /poject-directory
```
 3. Install dependencies
```bash
npm install
```
 4. create .env and add the below eviorment variable. You can refer example.env.
```.env
PORT=4000
MONGO_URI=mongodb://localhost:27017/resume_db
JWT_SECRET=supersecretkey
```

 7. Run this application.
 ```bash
 npm run dev
  ```
8. Test the api using api testing tool (eg:Postman)
   
   Base Url:
 ```bash
     http://localhost:PORT
 ```
9. Endpoints:
   - `POST /api/auth/register` - register
   - `POST /api/auth/login` - login (returns JWT)
   - `PUT /api/resume` - update resume (auth required)
   - `GET /api/resume` - get resume (auth required)
   - `GET /api/resume/pdf` - download resume PDF (auth required)
