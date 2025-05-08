import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class AlbumCard extends LitElement {
  @property() artist = "";
  @property() album1 = "";
  @property() album2 = "";
  @property() href = "";

  static styles = css`
    section {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-family: 'Playfair Display', serif;
      margin-bottom: 0.5rem;
    }
    ul {
      list-style: none;
      padding-left: 1rem;
    }
    p {
      margin-top: 1rem;
    }
    a {
      color: var(--color-accent);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    svg.icon {
      height: 1em;
      width: 1em;
      vertical-align: middle;
      fill: currentColor;
      margin-right: 0.5rem;
    }
  `;

  override render() {
    return html`
      <section>
        <h2>
          <svg class="icon">
            <use href="/icons/music.svg#icon-album" />
          </svg>
          ${this.artist}
        </h2>
        <ul>
          <li>${this.album1}</li>
          <li>${this.album2}</li>
        </ul>
        <p><a href="${this.href}">← Back to ${this.artist}</a></p>
      </section>
    `;
  }
}
