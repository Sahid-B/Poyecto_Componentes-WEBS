import { LitElement, html, css } from 'lit';

class PriceCompare extends LitElement {
  static properties = {
    ingrediente: { type: String },
    resultados:  { type: Object },
    loading:     { type: Boolean },
    error:       { type: String }
  };

  constructor() {
    super();
    this.ingrediente = '';
    this.resultados = null;
    this.loading = false;
    this.error = '';
  }

  async buscar() {
    if (!this.ingrediente) return;
    this.loading = true;
    this.error = '';
    this.resultados = null;
    try {
      const res = await fetch(`http://localhost:3001/api/precios/${this.ingrediente}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      this.resultados = data;
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="wrap">
        <h2>Comparador Akí vs Supermaxi</h2>
        <div class="search">
          <input .value=${this.ingrediente} @input=${e => this.ingrediente = e.target.value} placeholder="Ej: arroz, pollo..."/>
          <button @click=${this.buscar} ?disabled=${this.loading}>Buscar</button>
        </div>
        ${this.loading ? html`<p>Buscando...</p>` : ''}
        ${this.error ? html`<p class="err">${this.error}</p>` : ''}
        ${this.resultados ? html`
          <p>Recomendación: Compra en <strong>${this.resultados.mas_barato}</strong></p>
          <div class="tiendas">
             <div class="aki">
                <h3>Akí</h3>
                ${this.resultados.aki.map(p => html`<p>${p.nombre} - $${p.precio} (${p.unidad})</p>`)}
             </div>
             <div class="supermaxi">
                <h3>Supermaxi</h3>
                ${this.resultados.supermaxi.map(p => html`<p>${p.nombre} - $${p.precio} (${p.unidad})</p>`)}
             </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .wrap { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
    .search { display: flex; gap: 8px; margin-bottom: 1rem; }
    .search input { flex: 1; padding: 8px; }
    .search button { padding: 8px 16px; cursor: pointer; }
    .tiendas { display: flex; gap: 1rem; }
    .aki, .supermaxi { flex: 1; padding: 1rem; border-radius: 4px; }
    .aki { background: #fffde7; border: 1px solid #ffd600; }
    .supermaxi { background: #ffebee; border: 1px solid #e53935; }
    .err { color: red; }
  `;
}
customElements.define('price-compare', PriceCompare);