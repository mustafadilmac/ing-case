import { LitElement, html, css } from 'lit';

export class CBreadcrumb extends LitElement {
  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
    this.title = '';
  }

  static styles = css`
    .breadcrumb {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 8px;
      padding: 28px 12px;
      flex-direction: column;
    }
    
    @media (min-width: 640px) {
      .breadcrumb {
        align-items: center;
        flex-direction: row;
      }
      
    }
    
    .breadcrumb h2 {
      font-size: 22px;
      margin: 0;
      color: var(--color-primary)
    }
  `;


  render() {
    return html`
      <div class="breadcrumb">
        <h2>${ this.title }</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('c-breadcrumb', CBreadcrumb);
