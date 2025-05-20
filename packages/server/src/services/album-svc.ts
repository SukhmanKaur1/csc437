// src/services/album-svc.ts
import { Schema, model } from "mongoose";
import { Album } from "../models/album";

// Define the Mongoose schema
const AlbumSchema = new Schema<Album>(
  {
    artist: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    albums: [String]
  },
  { collection: "me_albums" } // name of the collection in MongoDB
);

// Create the model
const AlbumModel = model<Album>("Album", AlbumSchema);

// Service functions
function index(): Promise<Album[]> {
  return AlbumModel.find();
}

function get(artist: string): Promise<Album | null> {
  return AlbumModel.findOne({ artist }).exec();
}

export default { index, get };
