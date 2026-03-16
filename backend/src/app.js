import express, { json } from "express";
import cors from "cors";

import authRoutes from "../routes/authRoutes.js";
import skillsRoutes from "../routes/skillsRoutes.js";
import projectsRoutes from "../routes/projectsRoutes.js";
import resumeRoutes from "../routes/resumeRoutes.js"

const app = express();

app.use(cors());
app.use(json());
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: [
    "https://itsharsh.dev",
    "https://www.itsharsh.dev"
  ]
}));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/resume", resumeRoutes);



export default app;