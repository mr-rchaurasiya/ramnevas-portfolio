# Ramnevas Chaurasiya Portfolio — Full Stack Developer Website

A professional, high-performance, and responsive full-stack developer portfolio website built using the MERN stack (MongoDB, Express.js, React, Node.js). This project implements cyber-cyan and violet gradient glassmorphic aesthetics, dynamic asset loading, and a secure administrative dashboard interface.

---

## 1. Project Overview
This repository hosts the full-stack codebase of Ramnevas Chaurasiya's portfolio. It enables public visitors to explore resume details, academic histories, internship experience timelines, technical skill clusters, and projects, while providing the developer with an authenticated admin panel to perform CRUD operations on these sections dynamically.

---

## 2. Features
* **Glassmorphic Cyber-Punk Design:** Highly responsive, dark-mode styling utilizing Bootstrap grids, glassmorphism overlays, and cyan/purple fluid gradients.
* **Administrative Login:** JWT token-based auth verifying email credentials.
* **Full CRUD Management:** Complete secure forms to create, edit, and delete Projects, Experience, Education, Skills, and Achievements.
* **Resume Upload & Purge:** Admin uploads PDFs directly. The backend streams files to Cloudinary, unlinks local buffers, catalog URLs in MongoDB, and automatically destroys old resume assets from Cloudinary on replacement.
* **Performance Route-Splitting:** Uses React code splitting (`React.lazy` and `Suspense`) to isolate heavy admin forms into async chunks, reducing initial page speed for public landing page visitors.
* **WCAG 2.1 Accessibility:** Conforming label associations (`htmlFor`/`id`), navigation disclosures (`aria-current`), link target alerts, and high-contrast keyboard tab indicators (`:focus-visible`).
* **Contact Submissions Logging:** Secure contact forms that check email formatting and log messages directly in server console streams to respect data privacy.

---

## 3. Tech Stack
* **Frontend:** React.js (built on Vite), React Router, Vanilla CSS, Bootstrap CSS, Bootstrap Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ORM
* **Authentication:** JSON Web Tokens (JWT), BcryptJS password hashing
* **File Storage:** Multer, Cloudinary Node SDK

---

## 4. Frontend Architecture
The frontend is built inside `frontend/` using Vite. Pages are loaded dynamically via:
* `src/main.jsx` and `src/App.jsx` — Core layout wrapping routes in `AuthProvider` context.
* `src/context/AuthContext.jsx` — Context managing local storage token states and login/logout behaviors.
* `src/components/ProtectedRoute.jsx` — Router interceptor guarding the dashboard path `/admin`.
* `src/utils/api.js` — Custom fetch hook `useFetchData` that manages loader animations and falls back gracefully to `portfolioData.js` configurations if the backend database is offline.

---

## 5. Backend Architecture
The API server is built inside `backend/` using ES6 imports. Key modules:
* `server.js` — Boot gateway setting CORS headers, loading variables, and launching routes.
* `middleware/authMiddleware.js` — Hardened middleware extracting Bearer tokens and assigning users.
* `middleware/uploadMiddleware.js` — Enforces Multer bounds: maximum 5MB size limit and PDF file filter verification.
* `config/db.js` — Mongoose database connection setup.
* `config/cloudinary.js` — Cloudinary SDK connector config.

---

## 6. Database Schema Models
* **`User`**: Admin login tracking (email and hashed passwords).
* **`Project`**: Title, description, technologies string array, GitHub link, live preview link.
* **`Experience`**: Company, role, startDate, endDate, description, technologies.
* **`Education`**: Qualification degree, institution name, startYear, endYear.
* **`Skill`**: Category, name (incorporating a unique compound index `{ category: 1, name: 1 }`).
* **`Achievement`**: Title, description.
* **`Resume`**: Cloudinary url, publicId, fileName, upload date.

---

## 7. Authentication
Admin authentication is handled securely using:
1. Passwords hashed using standard BcryptJS (10 salt rounds) before database commits.
2. Login verifies match, returning a signed JWT token valid for 30 days.
3. Access headers use `Authorization: Bearer <token>` to interact with writing APIs.

---

## 8. Resume Upload System
The CV upload workflow strictly enforces backend security:
1. Multer intercepts raw file streams, validating they match `application/pdf` formats under 5MB.
2. The file is temporarily buffered under `uploads/` before streaming to Cloudinary.
3. The server queries Mongoose. If a previous resume public ID is active, it calls `cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })` to purge the old file.
4. MongoDB entries are updated and the local temporary buffer file is unlinked.

---

## 9. Admin Dashboard
Located under route `/admin` (guarded by session parameters), it renders a responsive sidebar containing tabs to manage all details. On mobile viewports, the sidebar automatically collapses into a swipeable horizontal layout, preserving screen space.

---

## 10. Environment Variables
Create a `.env` file inside the `backend/` directory matching the variables inside `.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ramnevas-portfolio
JWT_SECRET=your_jwt_secret_token_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 11. Installation
1. Clone the repository.
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

---

## 12. Running Frontend
Launch the Vite development server:
```bash
cd frontend
npm run dev
```
Open **`http://localhost:5174/`** in your browser.

---

## 13. Running Backend
1. Initialize the MongoDB database service.
2. Run database seeding script once to create the default admin credentials (`admin@example.com` / `adminpassword123`):
   ```bash
   cd backend
   npm run seed
   ```
3. Boot the API server using nodemon watcher:
   ```bash
   npm run dev
   ```
The server will bind and listen on **port 5000**.

---

## 14. API Overview
* **GET `/api/health`** — Verify server availability status.
* **POST `/api/auth/login`** — Validate login credentials.
* **GET `/api/projects`** / **GET `/api/skills`** / **GET `/api/experience`** / **GET `/api/education`** / **GET `/api/achievements`** / **GET `/api/resume`** — Public GET listing APIs.
* **POST `/api/contact`** — Public contact forms submissions checking.
* **POST `/api/projects`** / **PUT `/api/projects/:id`** / **DELETE `/api/projects/:id`** — Protected Project CRUD endpoints (requires JWT).
* **POST `/api/resume`** — Protected Multer/Cloudinary PDF upload endpoint.

---

## 15. Screenshots
A high-resolution UI design mockup of the frontend homepage is saved under:
* `C:\Users\hp\.gemini\antigravity-ide\brain\c23e046d-cfe1-4e17-95a9-f685bbdca298\portfolio_ui_mockup_1787383805499.jpg`

---

## 16. Future Improvements
* Integrate nodemailer to email contact form inputs to the developer's mailbox.
* Add animation transitions (e.g. Framer Motion) on scroll.
* Set up database index performance tests.
