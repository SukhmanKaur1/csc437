import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Events, Auth } from "@calpoly/mustang";

class HeaderElement extends LitElement {
  static styles = css`
    /* your CSS styles */
  `;

  _authObserver = new Observer(this, "blazing:auth");

  @state() loggedIn = false;
  @state() userid;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth) => {
      const { user } = auth;
      this.loggedIn = !!(user && user.authenticated);
      this.userid = user?.username;
    });
  }

  renderSignOutButton() {
    return html`
      <button @click=${(e) =>
        Events.relay(e, "auth:message", ["auth/signout"])}>
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`<a href="/login.html">Sign In…</a>`;
  }

  render() {
    return html`
      <header>
        <slot></slot>
        <div class="user-actions">
          Hello, ${this.userid || "traveler"}
          ${this.loggedIn
            ? this.renderSignOutButton()
            : this.renderSignInButton()}
        </div>
      </header>
    `;
  }
}

customElements.define("blz-header", HeaderElement);


export { HeaderElement };
