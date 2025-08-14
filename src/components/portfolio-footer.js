import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

export class PortfolioFooter extends LitElement {
    static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #990000;
      color: #FFFFCC;
      padding: 30px;
    }

    @media (max-width: 768px) {
    .footer{
          flex-direction: column;
          align-items: flex-start;
    }

    .footer{
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
    }
      }
      @media (max-width: 768px) {
        :host {
          display: none;
        }
      }
  `;

  render() {
    return html`
      <footer>
        © Universidad de las Fuerzas Armadas ESPE 2021. Todos los derechos reservados. Grupo B
      </footer>
    `;
  }
}


customElements.define("portfolio-footer", PortfolioFooter);
