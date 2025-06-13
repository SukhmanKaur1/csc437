// server/src/routes/users.ts
import express from "express";
import UserModel from "../models/user";

const router = express.Router();

router.get("/:userid", async (req, res) => {
  const userid = req.params.userid;
  console.log(" Received request for user:", userid);

  const user = await UserModel.findOne({ username: userid });
  if (user) {
    console.log("Found user:", user);
    res.json(user);
  } else {
    console.log(" User not found:", userid);
    res.status(404).json({ error: "User not found" });
  }
});


export default router;
