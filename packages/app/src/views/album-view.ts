import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface AlbumData {
  artist: string;
  albums: string[];
}

export class AlbumViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  @property({ attribute: "album-id" }) albumId?: string;

  @state() data?: AlbumData;

  async connectedCallback() {
    super.connectedCallback();

    const token = localStorage.getItem("token"); // ✅ already a string

    if (this.albumId && token) {
      try {
        const res = await fetch(`/api/albums/${this.albumId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          this.data = await res.json();
        } else {
          console.error("API error", res.status);
          this.data = {
            artist: "Unauthorized",
            albums: []
          };
        }
      } catch (err) {
        console.error("Fetch failed", err);
      }
    }
  }

  render() {
    if (!this.data) return html`<p>Loading album...</p>`;
    return html`
      <h2>Albums by ${this.data.artist}</h2>
      <ul>
        ${this.data.albums.map((title) => html`<li>${title}</li>`)}
      </ul>
    `;
  }
}
