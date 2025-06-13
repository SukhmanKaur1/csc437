import express from "express";
import UserModel from "../models/user";

const router = express.Router();

// GET user
router.get("/:userid", async (req, res) => {
  const userid = req.params.userid;
  console.log("Received request for user:", userid);

  const user = await UserModel.findOne({ username: userid });
  if (user) {
    console.log("Found user:", user);
    res.json(user);
  } else {
    console.log("User not found:", userid);
    res.status(404).json({ error: "User not found" });
  }
});

// PUT (update) user
router.put("/:userid", async (req, res) => {
  const userid = req.params.userid;
  const update = req.body;

  try {
    const result = await UserModel.findOneAndUpdate(
      { username: userid },
      update,
      { new: true } // return updated document
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

export default router;
