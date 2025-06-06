// src/routes/albums.ts
import { Router, Request, Response } from "express";
import AlbumService from "../services/album-svc";

const router = Router();

// GET /api/albums
router.get("/", async (req: Request, res: Response) => {
  try {
    const albums = await AlbumService.index();
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// GET /api/albums/:artist
router.get("/:artist", async (req: Request, res: Response) => {
  const { artist } = req.params;
  try {
    const album = await AlbumService.get(artist);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// POST /api/albums
router.post("/", async (req: Request, res: Response) => {
  const { artist, href, albums } = req.body;
  if (!artist || !href || !Array.isArray(albums)) {
    return res.status(400).send("Missing or invalid fields in request body");
  }

  try {
    const newAlbum = await AlbumService.create({ artist, href, albums });
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /api/albums/:artist
router.put("/:artist", async (req: Request, res: Response) => {
  const { artist } = req.params;
  const newAlbum = req.body;

  try {
    const updated = await AlbumService.update(artist, newAlbum);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(404).send("Album not updated");
  }
});

// DELETE /api/albums/:artist
router.delete("/:artist", async (req: Request, res: Response) => {
  const { artist } = req.params;

  try {
    await AlbumService.remove(artist);
    res.status(204).end(); // No Content
  } catch (err) {
    console.error(err);
    res.status(404).send("Album not deleted");
  }
});


export default router;
