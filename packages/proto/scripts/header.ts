import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Events, Auth } from "@calpoly/mustang";

class HeaderElement extends LitElement {
  static styles = css`
    header {
      padding: 1rem;
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
    }

    .user-actions {
      margin-top: 0.5rem;
      font-weight: bold;
    }

    button {
      margin-left: 0.5rem;
    }
  `;

  private _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  private _user?: Auth.User;

  @state() private loggedIn: boolean = false;
  @state() private userid?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      this.loggedIn = !!(auth.user && auth.user.authenticated);
      this.userid = auth.user?.username;
    });
  }

  private renderSignOutButton() {
    return html`
      <button
        @click=${(e: Event) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
          window.location.href = "/login.html";
        }}
      >
        Sign Out
      </button>
    `;
  }

  private renderSignInButton() {
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
