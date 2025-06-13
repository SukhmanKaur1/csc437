import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";

const router = express.Router();
dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

// Allow TypeScript to recognize req.user
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

// ✅ JWT middleware with logging
export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("🔐 Incoming token:", token);
  console.log("🔐 TOKEN_SECRET from env:", TOKEN_SECRET);

  if (!token) {
    console.warn("⚠️ No token provided");
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error || !decoded) {
        console.error("❌ Token verification failed:", error?.message);
        res.status(403).send("Forbidden: Invalid token");
      } else {
        console.log("✅ Token verified. User:", decoded);
        req.user = decoded; // Attach the decoded payload (e.g., username)
        next();
      }
    });
  }
}

// Token generation helper
function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error || !token) reject(error);
        else resolve(token);
      }
    );
  });
}

// Register route
router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => res.status(201).send({ token }))
      .catch((err) => res.status(409).send({ error: err.message }));
  }
});

// Login route
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify(username, password)
      .then((user) => generateAccessToken(user))
      .then((token) => res.status(200).send({ token }))
      .catch(() => res.status(401).send("Unauthorized"));
  }
});

export default router;