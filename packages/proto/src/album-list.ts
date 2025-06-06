// src/album-list.ts
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Observer, Auth } from "@calpoly/mustang";

interface AlbumData {
  artist: string;
  href: string;
  albums: string[];
}

class AlbumListElement extends LitElement {
  @property() src = "";
  @state() private albums: AlbumData[] = [];

  private _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  private _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.loadData(this.src); // Reload when auth info arrives
    });
  }

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      }
    );
  }

  async loadData(url: string) {
    try {
      const res = await fetch(url, {
        headers: this.authorization || {}
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      this.albums = json;
    } catch (err) {
      console.error("Error loading albums:", err);
    }
  }

  render() {
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

define({ "album-list": AlbumListElement });
export { AlbumListElement };
