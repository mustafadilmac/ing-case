import { LitElement, html, css } from 'lit';
import '../c-pagination.js';
import i18next from '../../i18n.js';
import { I18nMixin } from '../../i18n-mixin.js';

export class EmployeeCard extends I18nMixin(LitElement) {
  static properties = {
    columns: { type: Array },
    rows: { type: Array },
    currentPage: { type: Number },
    pageSize: { type: Number },
    searchQuery: { type: String },
  };

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.currentPage = 1;
    this.pageSize = 10;
    this.searchQuery = '';
  }

  static styles = css`
    .card-container {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr;
    }

    /* md: >=768px */
    @media (min-width: 768px) {
      .card-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1280px) {
      .card-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .card {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
      padding: 16px;
    }

    .card-grid {
      display: grid;
      gap: 12px 18px;
      grid-template-columns: 1fr;
    }

    /* lg: >=1024px */
    @media (min-width: 1024px) {
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .label {
      font-size: 12px;
      color: #AAA6A5;
      text-transform: capitalize;
    }

    .value {
      font-size: 14px;
      color: #000000;
    }

    .actions {
      display: flex;
      justify-content: flex-start;
      gap: 8px;
      margin-top: 16px;
    }

    .foot {
      display: flex;
      justify-content: center;
      margin-top: 18px;
    }
  `;

  get paged() {
    let start = (this.currentPage - 1) * this.pageSize;
    let rows = this.rows.slice(start, start + this.pageSize);
    if (rows.length === 0 && this.currentPage > 1) {
      this.currentPage--;
      start = (this.currentPage - 1) * this.pageSize;
      rows = this.rows.slice(start, start + this.pageSize);
    }
    return rows;
  }

  #onPageChange(e) {
    this.currentPage = e.detail.page;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('searchQuery')) {
      this.currentPage = 1;
    }
  }

  render() {
    return html`
      <div class="card-container">
        ${this.paged.map(
          row => html`
            <div class="card">
              <div class="card-grid">
                ${this.columns.map(
            c => html`
                    <div class="field">
                      <span class="label">${ i18next.t(c.label) }</span>
                      <div class="value">
                        
                        ${c.highlight
                          ? html`<strong>${row[c.key]}</strong>`
                          : html`${row[c.key]}`
                        }
                      
                      </div>
                    </div>
                  `
          )}
              </div>

              <div class="actions">
                <c-button variant="primary" size="sm" .href="/employees/${row.id}">
                  <c-icon name="pencil" size="14"></c-icon>
                  ${ i18next.t('Edit') }
                </c-button>
                <c-button variant="primary" size="sm" color="danger" @click=${() => this.dispatchEvent(new CustomEvent('delete-row', { detail: { row } }))}>
                  <c-icon name="trash" size="14"></c-icon>
                  ${ i18next.t('Delete') }
                </c-button>
              </div>
            </div>
          `
        )}
      </div>

      <div class="foot">
        <c-pagination
          .currentPage=${this.currentPage}
          .pageSize=${this.pageSize}
          .totalItems=${this.rows.length}
          @page-change=${this.#onPageChange}
        ></c-pagination>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
