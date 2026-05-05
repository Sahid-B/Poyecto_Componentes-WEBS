import { LitElement, html, css } from 'lit';

class PageHome extends LitElement {
  render() {
    return html`
      <div class="container">
        <h1>Bienvenido a PlanComer</h1>
        <nav>
          <a href="/plan">Plan Semanal</a>
          <a href="/recetas">Recetas</a>
          <a href="/compras">Lista de Compras</a>
          <a href="/ia">Planificador IA</a>
          <a href="/cuenta">Cuenta</a>
        </nav>
      </div>
    `;
  }

  static styles = css`
    .container { padding: 2rem; font-family: system-ui; }
    nav { display: flex; gap: 1rem; margin-top: 1rem; }
    a { padding: 0.5rem 1rem; background: #e0e0e0; text-decoration: none; color: black; border-radius: 4px; }
  `;
}

customElements.define('page-home', PageHome);