import { UserProfile } from "server/models"; // keep this if it's your actual type source

export type Msg =
  | [
      "profile/save",
      {
        userid: string;
        profile: UserProfile;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["profile/select", { userid: string }]
  | ["album/select", { albumId: string }];
