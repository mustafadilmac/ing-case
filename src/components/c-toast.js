import { LitElement, html, css } from 'lit';

export class CToast extends LitElement {
  static properties = {
    message: { type: String },
    visible: { type: Boolean },
  };

  constructor() {
    super();
    this.message = '';
    this.visible = false;
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      transition: opacity 0.3s, transform 0.3s;
    }
    .toast {
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--color-primary);
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      opacity: 0;
      transform: translateY(20px);
      background-color: #FFFFFF;
      font-size: 14px;
      color: var(--color-primary);
    }
    :host([visible]) .toast {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  show(message, duration = 3000) {
    this.message = message;
    this.visible = true;
    this.setAttribute('visible', '');
    clearTimeout(this._hideTimeout);
    this._hideTimeout = setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.visible = false;
    this.removeAttribute('visible');
  }

  render() {
    return html`
      <div class="toast">
        ${this.message}
      </div>
    `;
  }
}

customElements.define('c-toast', CToast);
