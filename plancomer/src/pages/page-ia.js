import { LitElement, html, css } from 'lit';
import '../components/ia-meal-planner.js';

class PageIa extends LitElement {
  render() {
    return html`
      <div class="container">
        <ia-meal-planner></ia-meal-planner>
      </div>
    `;
  }

  static styles = css`
    .container { font-family: system-ui; }
  `;
}

customElements.define('page-ia', PageIa);