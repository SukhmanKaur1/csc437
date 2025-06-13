// src/model.ts
import { Album, UserProfile } from "server/models"; // Replace with your actual server interfaces

export interface Model {
  album?: Album;
  profile?: UserProfile;
}

export const init: Model = {};
