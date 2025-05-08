// src/album-list.ts
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define } from "@calpoly/mustang";

// Define the shape of the JSON data
interface AlbumData {
  artist: string;
  href: string;
  albums: string[];
}

export class AlbumList extends LitElement {
  @property() src = ""; // path to JSON file

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

define({ "album-list": AlbumList });
