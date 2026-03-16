import express, { json } from "express";
import cors from "cors";

import authRoutes from "../routes/authRoutes.js";
import skillsRoutes from "../routes/skillsRoutes.js";
import projectsRoutes from "../routes/projectsRoutes.js";
import resumeRoutes from "../routes/resumeRoutes.js"

const app = express();

app.use(cors({
  origin: [
    "https://itsharsh.dev",
    "https://www.itsharsh.dev",
    "http://localhost:3000"
  ]
}));
app.use(json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/resume", resumeRoutes);

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
});



export default app;