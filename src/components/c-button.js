import { LitElement, html, css } from 'lit';

export class CButton extends LitElement {
  static properties = {
    variant: { type: String, reflect: true }, // 'primary' | 'outline' | 'ghost'
    size: { type: String, reflect: true },    // 'sm' | 'md' | 'lg'
    color: { type: String, reflect: true },   // 'orange' | 'danger'
    href: { type: String, reflect: true },
    target: { type: String, reflect: true },
    rel: { type: String, reflect: true },
    loading: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    type: { type: String, reflect: true }
  };

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.color = 'orange';
    this.loading = false;
    this.disabled = false;
    this.href = null;
    this.target = null;
    this.rel = 'noopener noreferrer';
    this.type = 'button';
  }

  static styles = css`
    :host {
      display: inline-block;
      white-space: nowrap;
    }

    :host([block]) button,
    :host([block]) a {
      display: flex;
      width: 100%;
    }
    
    button, a {
      font-family: inherit;
      font-weight: 600;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s, color 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      user-select: none;
      outline: none;
      text-decoration: none;
    }

    /* === Size Variants === */
    :host([size="sm"]) button,
    :host([size="sm"]) a { padding: 6px 10px; font-size: 13px; }
    :host([size="md"]) button,
    :host([size="md"]) a { padding: 8px 14px; font-size: 14px; }
    :host([size="lg"]) button,
    :host([size="lg"]) a { padding: 10px 18px; font-size: 15px; }

    /* === PRIMARY ORANGE === */
    :host([variant="primary"][color="orange"]) button,
    :host([variant="primary"][color="orange"]) a {
      background-color: var(--color-primary, #ff6200);
      color: white;
    }
    :host([variant="primary"][color="orange"]) button:hover:not(:disabled),
    :host([variant="primary"][color="orange"]) a:hover {
      background-color: #e65a00;
    }

    /* === OUTLINE ORANGE === */
    :host([variant="outline"][color="orange"]) button,
    :host([variant="outline"][color="orange"]) a {
      background-color: white;
      border-color: var(--color-primary, #ff6200);
      color: var(--color-primary, #ff6200);
    }
    :host([variant="outline"][color="orange"]) button:hover:not(:disabled),
    :host([variant="outline"][color="orange"]) a:hover {
      background-color: #fff4ec;
    }

    /* === GHOST ORANGE === */
    :host([variant="ghost"][color="orange"]) button,
    :host([variant="ghost"][color="orange"]) a {
      background-color: transparent;
      color: var(--color-primary, #ff6200);
      border: none;
    }
    :host([variant="ghost"][color="orange"]) button:hover:not(:disabled),
    :host([variant="ghost"][color="orange"]) a:hover {
      background-color: rgba(255, 98, 0, 0.08);
    }

    /* === PRIMARY DANGER === */
    :host([variant="primary"][color="danger"]) button,
    :host([variant="primary"][color="danger"]) a {
      background-color: #dc2626;
      color: white;
    }
    :host([variant="primary"][color="danger"]) button:hover:not(:disabled),
    :host([variant="primary"][color="danger"]) a:hover {
      background-color: #b91c1c;
    }

    /* === OUTLINE DANGER === */
    :host([variant="outline"][color="danger"]) button,
    :host([variant="outline"][color="danger"]) a {
      background-color: white;
      border-color: #dc2626;
      color: #dc2626;
    }
    :host([variant="outline"][color="danger"]) button:hover:not(:disabled),
    :host([variant="outline"][color="danger"]) a:hover {
      background-color: #fff0f0;
    }

    /* === GHOST DANGER === */
    :host([variant="ghost"][color="danger"]) button,
    :host([variant="ghost"][color="danger"]) a {
      background-color: transparent;
      color: #dc2626;
      border: none;
    }
    :host([variant="ghost"][color="danger"]) button:hover:not(:disabled),
    :host([variant="ghost"][color="danger"]) a:hover {
      background-color: rgba(220, 38, 38, 0.08);
    }

    /* Disabled */
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Spinner */
    .spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  render() {
    const content = this.loading
      ? html`<span class="spinner" aria-hidden="true"></span>`
      : html`<slot></slot>`;

    if (this.href) {
      return html`
        <a
          href=${this.href}
          target=${this.target || '_self'}
          rel=${this.rel}
          role="button"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button type=${this.type} ?disabled=${this.disabled || this.loading}>
        ${content}
      </button>
    `;
  }
}

customElements.define('c-button', CButton);
