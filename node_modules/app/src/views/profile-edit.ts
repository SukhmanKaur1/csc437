// app/views/profile-edit.ts

import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Form, View, History } from "@calpoly/mustang";

import { Model } from "../model";
import { Msg } from "../messages";
import { UserProfile } from "../types";

export class ProfileEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property()
  userid?: string;

  @state()
  get profile(): UserProfile | undefined {
    return this.model.profile;
  }

  override render() {
    return html`
      <main class="page">
        <h2>Edit Profile</h2>
        <mu-form
          .init=${this.profile}
          @mu-form:submit=${this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" required />
          </label>
          <label>
            Email:
            <input name="email" type="email" required />
          </label>
          <label>
            Favorite Genres (comma-separated):
            <input name="favoriteGenres" type="text" />
          </label>
          <label>
            Bio:
            <textarea name="bio"></textarea>
          </label>
          <button type="submit">Save</button>
        </mu-form>
      </main>
    `;
  }

  handleSubmit(event: Form.SubmitEvent<UserProfile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid!,
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.userid}`
          }),
        onFailure: (err: Error) =>
          console.error("Failed to save profile:", err)
      }
    ]);
  }
}

customElements.define("profile-edit", ProfileEditElement);
