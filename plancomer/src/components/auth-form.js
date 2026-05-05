import { LitElement, html, css } from 'lit';

class AuthForm extends LitElement {
  render() {
    return html`
      <div class="auth-container">
        <h3>Login / Registro</h3>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button>Entrar</button>
      </div>
    `;
  }

  static styles = css`
    .auth-container { display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px; }
    input { padding: 0.5rem; }
    button { padding: 0.5rem; cursor: pointer; }
  `;
}
customElements.define('auth-form', AuthForm);