"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var albums_exports = {};
__export(albums_exports, {
  default: () => albums_default
});
module.exports = __toCommonJS(albums_exports);
var import_express = require("express");
var import_album_svc = __toESM(require("../services/album-svc"));
const router = (0, import_express.Router)();
router.get("/", async (req, res) => {
  try {
    const albums = await import_album_svc.default.index();
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/:artist", async (req, res) => {
  const { artist } = req.params;
  try {
    const album = await import_album_svc.default.get(artist);
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
router.post("/", async (req, res) => {
  const { artist, href, albums } = req.body;
  if (!artist || !href || !Array.isArray(albums)) {
    return res.status(400).send("Missing or invalid fields in request body");
  }
  try {
    const newAlbum = await import_album_svc.default.create({ artist, href, albums });
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/:artist", async (req, res) => {
  const { artist } = req.params;
  const newAlbum = req.body;
  try {
    const updated = await import_album_svc.default.update(artist, newAlbum);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(404).send("Album not updated");
  }
});
router.delete("/:artist", async (req, res) => {
  const { artist } = req.params;
  try {
    await import_album_svc.default.remove(artist);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(404).send("Album not deleted");
  }
});
var albums_default = router;
