import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
): void {
  switch (message[0]) {
    case "profile/select":
      loadProfile(message[1], user)
        .then((profile) => {
          if (profile) {
            apply((model) => ({ ...model, profile }));
          }
        });
      break;

    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => {
          apply((model) => ({ ...model, profile }));
        })
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "album/select":
    // No state change needed here unless you want to highlight an album
       break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

function loadProfile(
  payload: { userid: string },
  user: Auth.User
): Promise<Model["profile"] | undefined> {
  return fetch(`/api/users/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then((res) => (res.ok ? res.json() : undefined))
    .then((json) => {
      if (json) {
        console.log("Loaded profile:", json);
        return json;
      }
    });
}

function saveProfile(
  payload: {
    userid: string;
    profile: Model["profile"];
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;
  },
  user: Auth.User
): Promise<Model["profile"]> {
  return fetch(`/api/users/${payload.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(payload.profile)
  }).then((res) => {
    if (res.status === 200) return res.json();
    else throw new Error(`Failed to save profile for ${payload.userid}`);
  });
}
