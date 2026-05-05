import { LitElement, html, css } from 'lit';

class PageCuenta extends LitElement {
  render() {
    return html`<div class="container"><h1>Mi Cuenta</h1></div>`;
  }
  static styles = css`.container { padding: 2rem; font-family: system-ui; }`;
}
customElements.define('page-cuenta', PageCuenta);