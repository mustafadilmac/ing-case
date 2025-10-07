import { LitElement, html, css } from 'lit';
import '../components/c-button.js';
import i18next from '../i18n.js';

export class NotFound extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 124px 0;
      text-align: center;
    }
    .content-card {
      width: 100%;
      max-width: 480px;
      padding: 24px;
      background: #FFFFFF;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
      margin: 0 12px;
    }
    .content-card h1 {
      font-size: 80px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -2px;
      line-height: 1;
    }
    .content-card h2 {
      font-size: 22px;
      margin-top: 8px;
    }
    .icon {
      margin-bottom: 16px;
    }
  `;

  render() {
    return html`
      <div class="content-card">
        <div class="icon">
          <img width="64" height="64" src="/assets/images/ing-icon.png" alt="ing icon">
        </div>
        <h1>404</h1>
        <h2>${ i18next.t('Page Not Found') }</h2>
        <c-button href="/">${ i18next.t('Home Page') }</c-button>
      </div>
    `;
  }
}

customElements.define('not-found', NotFound);
