import { LitElement, html, css } from 'lit';

class PageCompras extends LitElement {
  render() {
    return html`<div class="container"><h1>Lista de Compras</h1></div>`;
  }
  static styles = css`.container { padding: 2rem; font-family: system-ui; }`;
}
customElements.define('page-compras', PageCompras);