// src/views/user-view.ts
import { define, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { UserProfile } from "server/models";
import { Model } from "../model";
import { Msg } from "../messages";

export class UserViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id" })
  userid?: string;

  @state()
  get profile(): UserProfile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("music:model"); // 👈 match the provides= on <mu-store>
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "user-id" && oldVal !== newVal && newVal) {
      this.dispatchMessage(["profile/select", { userid: newVal }]);
    }
  }

  render() {
    return html`
      <section class="card">
        <h2>User Profile</h2>
        ${this.profile
          ? html`
              <p><strong>Username:</strong> ${this.profile.username}</p>
              <p><strong>Display Name:</strong> ${this.profile.name}</p>
              <p><strong>Email:</strong> ${this.profile.email}</p>
            `
          : html`<p>Loading profile...</p>`}
      </section>
    `;
  }

  static styles = css`
    .card {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 0.5rem;
      background: #fff;
    }
  `;
}

define({ "user-view": UserViewElement });
