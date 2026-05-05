import { LitElement, html, css } from 'lit';

class RecipeCard extends LitElement {
  static properties = {
    receta: { type: Object }
  };

  render() {
    if (!this.receta) return html`<p>No recipe data</p>`;
    return html`
      <div class="card">
        <h3>${this.receta.nombre}</h3>
        <p>${this.receta.descripcion}</p>
        <p>Porciones: ${this.receta.porciones}</p>
        <p>Tiempo: ${this.receta.tiempo_min} min</p>
      </div>
    `;
  }

  static styles = css`
    .card { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
  `;
}
customElements.define('recipe-card', RecipeCard);