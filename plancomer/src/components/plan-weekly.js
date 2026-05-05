import { LitElement, html, css } from 'lit';

class PlanWeekly extends LitElement {
  render() {
    return html`<div>Grilla 7 días x 3 comidas</div>`;
  }
}
customElements.define('plan-weekly', PlanWeekly);