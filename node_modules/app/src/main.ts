import { html } from "lit";
import { define, Auth, History, Switch, Store } from "@calpoly/mustang";

import { HomeViewElement } from "./views/home-view";
import { AlbumViewElement } from "./views/album-view";
import { UserViewElement } from "./views/user-view"; // 👈 Added this
import { LoginFormElement } from "./auth/login-form";

import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";

// Register custom elements
customElements.define("home-view", HomeViewElement);
customElements.define("album-view", AlbumViewElement);
//customElements.define("user-view", UserViewElement); // 👈 Registered here
customElements.define("login-form", LoginFormElement);

// Define SPA routes
const routes = [
  {
    path: "/app/albums/:id",
    view: (params: Switch.Params) => html`
      <album-view album-id=${params.id}></album-view>
    `
  },
  {
    path: "/app/user/:userid", // 👈 New route
    view: (params: Switch.Params) => html`
      <user-view user-id=${params.userid}></user-view>
    `
  },
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    path: "/app/login",
    view: () => html`
      <article class="page">
        <blz-header></blz-header>
        <main class="card">
          <h2>User Login</h2>
          <login-form api="/auth/login">
            <label>
              <span>Username</span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" name="password" />
            </label>
          </login-form>
          <p>Or did you want to <a href="/app/register">Sign up as a new user</a>?</p>
        </main>
      </article>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "music:history", "music:auth");
    }
  },
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "music:auth");
    }
  },

  // ✅ Register your custom views/components here
  "user-view": UserViewElement,
  "home-view": HomeViewElement,
  "album-view": AlbumViewElement,
  "login-form": LoginFormElement
});
