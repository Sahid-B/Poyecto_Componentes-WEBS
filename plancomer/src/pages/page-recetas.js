import { LitElement, html, css } from 'lit';

class PageRecetas extends LitElement {
  render() {
    return html`<div class="container"><h1>Recetas</h1></div>`;
  }
  static styles = css`.container { padding: 2rem; font-family: system-ui; }`;
}
customElements.define('page-recetas', PageRecetas);