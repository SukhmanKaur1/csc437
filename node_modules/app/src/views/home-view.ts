import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      color: gray;
    }
  `;

  render() {
    return html`
      <h1>Welcome to Music Explorer</h1>
      <p>This is your personalized music library app. Start exploring albums or artists now!</p>
      <ul>
        <li><a href="/app/albums/badbunny">View Bad Bunny Albums</a></li>
        <li><a href="/app/albums/seventeen">View Seventeen Albums</a></li>
      </ul>
    `;
  }
}
