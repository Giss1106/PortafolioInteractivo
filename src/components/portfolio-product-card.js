    import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

    export class PortfolioProductCard extends LitElement {
    static properties = {
        title: { type: String },
        description: { type: String },
        imageUrl: { type: String },
        link: { type: String }
    };

    static styles = css`
        :host {
        display: block;
        font-family: Arial, sans-serif;
        }
        .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        width: 280px;
        transition: transform 0.3s;
        }
        .card:hover {
        transform: scale(1.05);
        }
        img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        }
        .content {
        padding: 16px;
        }
        .title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 8px;
        }
        .description {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 16px;
        }
        a {
        display: inline-block;
        padding: 8px 12px;
        background: #64ffda;
        color: #0a192f;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        }
        a:hover {
        background: #52e0c4;
        }
    `;

    constructor() {
        super();
        this.title = "Proyecto";
        this.description = "Descripción breve del proyecto.";
        this.imageUrl = "";
        this.link = "#";
    }

    render() {
        return html`
        <div class="card">
            <img src="${this.imageUrl}" alt="Imagen del proyecto" />
            <div class="content">
            <div class="title">${this.title}</div>
            <div class="description">${this.description}</div>
            <a href="${this.link}" target="_blank">Ver más</a>
            </div>
        </div>
        `;
    }
    }

    customElements.define('portfolio-product-card', PortfolioProductCard);
