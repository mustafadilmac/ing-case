import { LitElement, html, css } from 'lit';

export class CIcon extends LitElement {
  static properties = {
    name: { type: String },
    size: { type: Number },
    stroke: { type: String },
    strokeWidth: { type: Number, attribute: 'stroke-width' },
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      vertical-align: middle;
    }

    i {
      display: inline-flex;
    }

    svg {
      display: inline-block;
      vertical-align: middle;
    }
  `;

  constructor() {
    super();
    this.name = 'home';
    this.size = 20;
    this.stroke = 'currentColor';
    this.strokeWidth = 2;
  }

  firstUpdated() {
    this._initIcons();
  }

  updated(changedProps) {
    if (
      changedProps.has('name') ||
      changedProps.has('size') ||
      changedProps.has('stroke') ||
      changedProps.has('strokeWidth')
    ) {
      this._initIcons();
    }
  }

  _initIcons() {
    if (window.lucide) {
      window.lucide.createIcons({
        root: this.renderRoot,
        attrs: {
          width: this.size,
          height: this.size,
          stroke: this.stroke,
          'stroke-width': this.strokeWidth,
        },
      });
    }
  }

  render() {
    return html`<i data-lucide=${this.name}></i>`;
  }
}

customElements.define('c-icon', CIcon);
