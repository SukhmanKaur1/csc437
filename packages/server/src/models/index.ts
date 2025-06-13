// packages/server/src/models/index.ts

export interface Album {
  _id: string;
  artist: string;
  title: string;
  year: number;
}

export interface UserProfile {
  username: string;
  email: string;
  name: string;
}

export * from "./album"; // if you already have this
export * from "./user";  // <-- add this to export UserProfile

