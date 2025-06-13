//server\src\models\user.ts
import mongoose from "mongoose";

// The interface for TypeScript
export interface UserProfile {
  username: string;
  email?: string;
  displayName?: string;
}

// The schema for MongoDB
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  displayName: String
});

// The Mongoose model
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
