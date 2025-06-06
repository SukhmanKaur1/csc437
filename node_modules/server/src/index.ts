// src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import albums from "./routes/albums";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import cors from "cors";


dotenv.config();
connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use(cors());


// Mount authentication routes (e.g., /auth/register and /auth/login)
app.use("/auth", auth);

// Protect the albums API routes with JWT middleware
app.use("/api/albums", authenticateUser, albums);

// Test route
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
