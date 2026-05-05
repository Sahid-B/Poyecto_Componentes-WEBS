import { LitElement, html, css } from 'lit';

class IaMealPlanner extends LitElement {
  static properties = {
    loading:      { type: Boolean },
    plan:         { type: Object  },
    ingredientes: { type: Array   },
    preferencias: { type: String  },
    error:        { type: String  },
  };

  constructor() {
    super();
    this.loading      = false;
    this.plan         = null;
    this.ingredientes = [];
    this.preferencias = '';
    this.error        = '';
  }

  get opciones() {
    return ['pollo','carne','arroz','papa','tomate','cebolla',
            'ajo','zanahoria','leche','huevo','queso','atún',
            'fideo','plátano','yuca','aguacate','limón','aceite'];
  }

  toggle(ing) {
    this.ingredientes = this.ingredientes.includes(ing)
      ? this.ingredientes.filter(i => i !== ing)
      : [...this.ingredientes, ing];
  }

  async generar() {
    if (!this.ingredientes.length) {
      this.error = 'Selecciona al menos un ingrediente';
      return;
    }
    this.loading = true;
    this.error   = '';
    this.plan    = null;
    try {
      const res  = await fetch('http://localhost:3001/api/generar-plan', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ingredientes: this.ingredientes, preferencias: this.preferencias }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      this.plan = data.plan;
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="wrap">
        <h1>🍽️ Planifica con IA</h1>
        <p class="sub">Selecciona ingredientes → la IA genera tu menú semanal con precios de Akí y Supermaxi</p>

        <div class="chips">
          ${this.opciones.map(i => html`
            <button class="chip ${this.ingredientes.includes(i) ? 'on' : ''}" @click=${() => this.toggle(i)}>${i}</button>
          `)}
        </div>

        <input placeholder="Preferencias: sin picante, vegetariano..."
          .value=${this.preferencias}
          @input=${e => this.preferencias = e.target.value}/>

        <button class="btn" @click=${this.generar} ?disabled=${this.loading}>
          ${this.loading ? '⏳ Generando...' : '✨ Generar plan'}
        </button>

        ${this.error ? html`<p class="err">${this.error}</p>` : ''}

        ${this.plan?.plan ? html`
          <div class="plan">
            <h2>📅 Tu semana</h2>
            <div class="grid">
              ${this.plan.plan.map(d => html`
                <div class="dia">
                  <strong>${d.dia}</strong>
                  <p>🌅 ${d.desayuno?.nombre}</p>
                  <p>☀️ ${d.almuerzo?.nombre}</p>
                  <p>🌙 ${d.cena?.nombre}</p>
                </div>
              `)}
            </div>

            <h2>🛒 Lista de compras</h2>
            <div class="tiendas">
              <div class="aki">
                <h3>🟡 Akí</h3>
                ${(this.plan.lista_compras?.aki || []).map(i => html`<p>${i}</p>`)}
              </div>
              <div class="supermaxi">
                <h3>🔴 Supermaxi</h3>
                ${(this.plan.lista_compras?.supermaxi || []).map(i => html`<p>${i}</p>`)}
              </div>
            </div>

            ${this.plan.ahorro_estimado ? html`
              <div class="ahorro">💰 Ahorro estimado: <strong>$${this.plan.ahorro_estimado}</strong></div>
            ` : ''}
            ${this.plan.consejo ? html`<p class="consejo">💡 ${this.plan.consejo}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 2rem; font-family: system-ui; }
    h1 { font-size: 1.8rem; margin-bottom: .25rem; }
    .sub { color: #666; margin-bottom: 1.5rem; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1rem; }
    .chip { padding: 6px 14px; border-radius: 20px; border: 1.5px solid #ddd; background: white; cursor: pointer; font-size: 13px; }
    .chip.on { background: #534AB7; color: white; border-color: #534AB7; }
    input { width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-size: 14px; box-sizing: border-box; }
    .btn { width: 100%; padding: 12px; background: #534AB7; color: white; border: none; border-radius: 8px; font-size: 15px; cursor: pointer; margin-bottom: 1rem; }
    .btn:disabled { opacity: .6; }
    .err { color: #c0392b; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-bottom: 1.5rem; }
    .dia { background: #f5f5f5; border-radius: 8px; padding: .75rem; font-size: 13px; }
    .dia strong { display: block; text-transform: capitalize; margin-bottom: .5rem; }
    .dia p { margin: 3px 0; }
    .tiendas { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 1rem; }
    .aki { background: #FFFDE7; border: 1.5px solid #FFD600; border-radius: 8px; padding: 1rem; }
    .supermaxi { background: #FFEBEE; border: 1.5px solid #E53935; border-radius: 8px; padding: 1rem; }
    .tiendas h3 { margin: 0 0 .5rem; }
    .tiendas p { font-size: 13px; margin: 3px 0; }
    .ahorro { background: #E8F5E9; padding: 10px; border-radius: 8px; }
    .consejo { color: #555; font-style: italic; }
  `;
}

customElements.define('ia-meal-planner', IaMealPlanner);