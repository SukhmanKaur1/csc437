"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var album_svc_exports = {};
__export(album_svc_exports, {
  default: () => album_svc_default
});
module.exports = __toCommonJS(album_svc_exports);
var import_mongoose = require("mongoose");
const AlbumSchema = new import_mongoose.Schema(
  {
    artist: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    albums: [String]
  },
  { collection: "me_albums" }
  // name of the collection in MongoDB
);
const AlbumModel = (0, import_mongoose.model)("Album", AlbumSchema);
function index() {
  return AlbumModel.find();
}
function get(artist) {
  return AlbumModel.findOne({ artist }).exec();
}
function create(json) {
  const album = new AlbumModel(json);
  return album.save();
}
function update(artist, updatedAlbum) {
  return AlbumModel.findOneAndUpdate({ artist }, updatedAlbum, {
    new: true
  }).then((result) => {
    if (!result) throw `${artist} not updated`;
    return result;
  });
}
function remove(artist) {
  return AlbumModel.findOneAndDelete({ artist }).then((deleted) => {
    if (!deleted) throw `${artist} not deleted`;
  });
}
var album_svc_default = { index, get, create, update, remove };
