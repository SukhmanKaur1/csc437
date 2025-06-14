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
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);
var import_express = __toESM(require("express"));
var import_user = __toESM(require("../models/user"));
const router = import_express.default.Router();
router.get("/:userid", async (req, res) => {
  const userid = req.params.userid;
  console.log("Received request for user:", userid);
  const user = await import_user.default.findOne({ username: userid });
  if (user) {
    console.log("Found user:", user);
    res.json(user);
  } else {
    console.log("User not found:", userid);
    res.status(404).json({ error: "User not found" });
  }
});
router.put("/:userid", async (req, res) => {
  const userid = req.params.userid;
  const update = req.body;
  try {
    const result = await import_user.default.findOneAndUpdate(
      { username: userid },
      update,
      { new: true }
      // return updated document
    );
    if (result) {
      console.log("Updated user:", result);
      res.json(result);
    } else {
      console.log("User not found for update:", userid);
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});
var users_default = router;
