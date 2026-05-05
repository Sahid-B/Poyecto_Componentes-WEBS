import { LitElement, html, css } from 'lit';

class ShoppingList extends LitElement {
  render() {
    return html`
      <div>
        <h3>Lista de Compras Generada</h3>
        <ul>
          <li>Ejemplo de ingrediente</li>
        </ul>
      </div>
    `;
  }
}
customElements.define('shopping-list', ShoppingList);