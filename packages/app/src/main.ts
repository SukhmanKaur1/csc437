import { html } from "lit";
import { define, Auth, History, Switch } from "@calpoly/mustang";

import { HomeViewElement } from "./views/home-view";
import { AlbumViewElement } from "./views/album-view";
import { LoginFormElement } from "./auth/login-form";

// Register custom elements
customElements.define("home-view", HomeViewElement);
customElements.define("album-view", AlbumViewElement);
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

// Register Mustang context providers
define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "music:history", "music:auth");
    }
  }
});
