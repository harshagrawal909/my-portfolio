# 🌟 Harsh's Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern developer portfolio built with **Next.js**, **TailwindCSS**, and a **Node.js** backend.  
Includes an admin dashboard to dynamically manage **skills**, **projects**, and **resume** with **MongoDB**.

---

## 🚀 Demo

- 🌐 Frontend (Vercel): _Add your live URL here_
- ⚙️ Backend API (Render): _Add your live API URL here_

---

## ✨ Features

- 📱 Responsive modern UI
- 🧠 Skills manager (admin can add/edit/delete skills)
- 🗂️ Project manager
- 📄 Resume manager (upload and display CV)
- 📬 Contact form that sends messages to email (via Web3Forms)
- 🧭 Smooth scrolling navbar with active section detection
- 🔐 Admin authentication (JWT-based)

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- TypeScript
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)

### Deployment
- Vercel (frontend hosting)
- Render (backend hosting)

---

## 📦 Installation

### 1) Clone the repository
```bash
git clone https://github.com/your-username/grand-portfolio.git
cd grand-portfolio
```

### 2) Setup backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see Environment Variables section), then run:
```bash
node server.js
```

For development with auto-reload:
```bash
npx nodemon server.js
```

### 3) Setup frontend
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

---

## 🔑 Environment Variables

### `backend/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Note: The contact form currently uses Web3Forms in `ContactSection.tsx` with an access key in code. For production, move that key to environment variables.

---

## 📁 Folder Structure

```bash
my-portfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── src/
│   ├── uploads/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── middleware.ts
    ├── package.json
    └── tsconfig.json
```

---

## 🖼️ Screenshots

> Replace with actual screenshots from your project.

- 🏠 Home Page  
  ![Home Page](./screenshots/home.png)

- 🛠️ Admin Dashboard  
  ![Admin Dashboard](./screenshots/admin-dashboard.png)

- 📄 Resume Section  
  ![Resume Section](./screenshots/resume.png)

---

## 🔮 Future Improvements

- 🌍 Add multi-language support
- 🧪 Add unit/integration tests for frontend and backend
- 📊 Add analytics dashboard for visitor insights
- 📨 Replace third-party contact API with custom backend mail service
- 🧰 Add role-based admin permissions

---

## 👨‍💻 Author

**Harsh Agrawal**

- GitHub: [@harshagrawal909](https://github.com/harshagrawal909)
- LinkedIn: [Harsh Agrawal](https://www.linkedin.com/in/harshagrawal42)

---

⭐ If you like this project, consider giving it a star on GitHub!