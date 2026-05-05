import { LitElement, html, css } from 'lit';

class RecipeForm extends LitElement {
  render() {
    return html`
      <div class="form-container">
        <h3>Crear/Editar Receta</h3>
        <input placeholder="Nombre de la receta" />
        <textarea placeholder="Descripción"></textarea>
        <button>Guardar</button>
      </div>
    `;
  }

  static styles = css`
    .form-container { display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; }
    input, textarea { padding: 0.5rem; }
    button { padding: 0.5rem; cursor: pointer; }
  `;
}
customElements.define('recipe-form', RecipeForm);