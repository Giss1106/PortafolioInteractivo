import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

export class PortfolioNavbar extends LitElement {
  static properties = {
    user: { type: Object },
    showLogin: { type: Boolean },
    showRegister: { type: Boolean },
    menuOpen: { type: Boolean }
  }

  constructor() {
    super();
    this.isLoggedIn = false;
    this.showLogin = false;
    this.showRegister = false;
    this.user = null;
    this.menuOpen = false;
  }

  _closeLogin() { this.showLogin = false; }
  _closeRegister() { this.showRegister = false; }
  _openRegister() { this.showLogin = false; this.showRegister = true; }
  _openLogin() { this.showRegister = false; this.showLogin = true; }
  _openRegisterFromEvent(e) { this.showLogin = false; this.showRegister = true; e.stopPropagation(); }
  _openLoginFromEvent(e) { this.showRegister = false; this.showLogin = true; e.stopPropagation(); }

  _handleLoginSuccess(e) {
    this.user = e.detail.user;
    this.isLoggedIn = true;
    this.showLogin = false;
  }

  _handleRegisterSuccess(e) {
    this.user = e.detail.user;
    this.isLoggedIn = true;
    this.showRegister = false;
  }

  validateUser() {
    return this.user !== null;
  }

  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  _installClick() {
    this.dispatchEvent(new CustomEvent('install-app', { bubbles: true, composed: true }));
  }

  static styles = css`
    :host {
      background-color: #FFFFCC;
      font-family: Arial, sans-serif;
    }

    header ul {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 10px 20px;
      gap: 20px;
    }

    .logo img {
  width: 120px;  /* ancho fijo */
  height: auto;  /* mantiene la proporción */
  max-height: 50px; /* opcional, límite de altura */
}
    .menu {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .menu a, .menu span {
      cursor: pointer;
      text-decoration: none;
      color: black;
      font-weight: 500;
    }

    .mobile-menu-button {
      display: none;
      cursor: pointer;
      font-size: 1.5rem;
      user-select: none;
    }

    @media (max-width: 768px) {
      .menu {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 10px;
        background: #FFFFCC;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
      }

      .menu.show {
        display: flex;
      }

      .mobile-menu-button {
        display: block;
      }
    }
  `;

  render() {
    return html`
      <header>
        <nav>
          <ul>
            <li class="logo">
              <a href="/">
                <img src="https://www.espe.edu.ec/wp-content/uploads/2022/01/ESPEtransparente.png" alt="ESPE Logo">
              </a>
            </li>

            <li class="mobile-menu-button" @click=${this._toggleMenu}>☰</li>

            <li class="menu ${this.menuOpen ? 'show' : ''}">
              <a href="/">Inicio</a>
              <a href="#">Contactanos</a>
              <a @click=${this._installClick}>Instalar App</a>
              ${this.validateUser()
                ? html`<span>${this.user.getName()}</span>`
                : html`<span @click=${this._openLogin}>Iniciar sesión</span>`}
            </li>
          </ul>
        </nav>
      </header>

      ${this.showLogin ? html`
        <espe-loggin
          @close-login=${this._closeLogin}
          @open-register=${this._openRegisterFromEvent}
          @login-success=${this._handleLoginSuccess}>
        </espe-loggin>
      ` : null}

      ${this.showRegister ? html`
        <espe-register
          @close-register=${this._closeRegister}
          @open-login=${this._openLoginFromEvent}
          @register-success=${this._handleRegisterSuccess}>
        </espe-register>
      ` : null}
    `;
  }
}

customElements.define("portfolio-navbar", PortfolioNavbar);
