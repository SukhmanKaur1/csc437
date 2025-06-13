// src/update.ts
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


    default:
      throw new Error(`Unhandled message "${message[0]}"`);
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
