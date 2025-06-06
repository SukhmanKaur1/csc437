// src/album-list.ts
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define } from "@calpoly/mustang";

interface AlbumData {
  artist: string;
  href: string;
  albums: string[];
}

class AlbumListElement extends LitElement {
  @property() src = "";

  @state() private albums: AlbumData[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.loadData(this.src);
  }

  async loadData(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      this.albums = json;
    } catch (err) {
      console.error("Error loading albums:", err);
    }
  }

  override render() {
    return html`
      ${this.albums.map(
        (item) => html`
          <me-album artist=${item.artist} href=${item.href}>
            ${item.albums.map(
              (album) => html`<li slot="album">${album}</li>`
            )}
          </me-album>
        `
      )}
    `;
  }

  static styles = css``;
}

//Export this once — and define it once
define({ "album-list": AlbumListElement });
export { AlbumListElement };
