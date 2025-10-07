import { LitElement, html, css } from 'lit';
import i18next from '../i18n.js';

export class ConfirmModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      z-index: 1000;
    }

    :host([open]) {
      opacity: 1;
      pointer-events: all;
    }

    .backdrop {
      position: absolute;
      inset: 0;
    }

    .modal {
      position: relative;
      background: white;
      border-radius: 8px;
      padding: 16px 16px;
      max-width: 360px;
      width: 90%;
      transform: scale(0.9) translateY(12px);
      transition: transform 0.25s ease, opacity 0.25s ease;
      opacity: 0;
      z-index: 1;
    }

    :host([open]) .modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 700;
      color: var(--color-primary);
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #333333;
      line-height: 1.5;
    }

    .actions {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      gap: 8px;
    }
  `;

  firstUpdated() {
    this.renderRoot.querySelector('.backdrop').addEventListener('click', () => {
      this._cancel();
    });
  }

  updated(changedProps) {
    if (changedProps.has('open')) {
      if (this.open) {
        window.addEventListener('keydown', this._handleKeyDown);
      } else {
        window.removeEventListener('keydown', this._handleKeyDown);
      }
    }
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._cancel();
    }
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
    this.open = false;
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.open = false;
  }

  render() {
    return html`
      <div class="backdrop"></div>
      <div class="modal" @click=${(e) => e.stopPropagation()}>
        <h3>${this.title}</h3>
        <p>${this.message}</p>
        <div class="actions">
          <c-button block size="sm" style="min-width: 100%; display: block" variant="primary" color="danger" @click=${this._confirm}>
            ${ i18next.t('Yes') }
          </c-button>
          <c-button block size="sm" variant="outline" @click=${this._cancel}>
            ${ i18next.t('Cancel') }
          </c-button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-modal', ConfirmModal);
