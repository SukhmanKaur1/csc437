// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Albums from "./services/album-svc"; 

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// Serve static files from the frontend build
app.use(express.static(staticDir));

// Basic test route
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

// ✅ Get all albums
app.get("/albums", (req: Request, res: Response) => {
  Albums.index()
    .then((list) => {
      res
        .set("Content-Type", "application/json")
        .send(JSON.stringify(list));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

// ✅ Get album by artist
app.get("/album/:artist", (req: Request, res: Response) => {
  const { artist } = req.params;

  Albums.get(artist)
    .then((data) => {
      if (data) {
        res
          .set("Content-Type", "application/json")
          .send(JSON.stringify(data));
      } else {
        res.status(404).send("Album not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
