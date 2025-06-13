import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {
  @state() formData: LoginFormData = {};
  @property() api?: string;
  @property() redirect: string = "/";
  @state() error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username && this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
        margin-top: 1rem;
      }

      button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `
  ];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    if (name === "username" || name === "password") {
      this.formData = { ...prevData, [name]: value };
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      fetch(this.api || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
        .then((res) => {
          if (res.status !== 200) throw "Login failed";
          return res.json();
        })
        .then(({ token }) => {
          const event = new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect: this.redirect }]
          });
          console.log("dispatching message", event);
          this.dispatchEvent(event);
        })
        .catch((error) => {
          console.error(error);
          this.error = error.toString();
        });
    }
  }
}
