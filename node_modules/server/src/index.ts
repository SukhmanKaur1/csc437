// server/src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "node:fs/promises";

import albums from "./routes/albums";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import cors from "cors";
import userRoutes from "./routes/users";

dotenv.config();
console.log("Loaded TOKEN_SECRET:", process.env.TOKEN_SECRET);

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// Middleware
app.use(express.static(staticDir));
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", auth);
app.use("/api/albums", authenticateUser, albums);
app.use("/api/users", userRoutes);

// Optional test route
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

// ✅ SPA fallback route for /app/*
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, "utf8").then((html) => res.send(html));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
