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

function create(json: Album): Promise<Album> {
  const album = new AlbumModel(json);
  return album.save();
}

function update(artist: string, updatedAlbum: Album): Promise<Album> {
  return AlbumModel.findOneAndUpdate({ artist }, updatedAlbum, {
    new: true
  }).then((result) => {
    if (!result) throw `${artist} not updated`;
    return result;
  });
}

function remove(artist: string): Promise<void> {
  return AlbumModel.findOneAndDelete({ artist }).then((deleted) => {
    if (!deleted) throw `${artist} not deleted`;
  });
}

export default { index, get, create, update, remove };
