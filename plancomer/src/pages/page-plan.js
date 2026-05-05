import { LitElement, html, css } from 'lit';
import '../components/plan-weekly.js';

class PagePlan extends LitElement {
  render() {
    return html`
      <div class="container">
        <h1>Mi plan semanal</h1>
        <plan-weekly></plan-weekly>
      </div>
    `;
  }

  static styles = css`
    .container { max-width: 1000px; margin: 0 auto; padding: 2rem; font-family: system-ui; }
  `;
}

customElements.define('page-plan', PagePlan);