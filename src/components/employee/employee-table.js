import { LitElement, html, css } from 'lit';
import '../c-pagination.js';
import i18next from '../../i18n.js';
import { I18nMixin } from '../../i18n-mixin.js';


export class EmployeeTable extends I18nMixin(LitElement) {
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
    table { width: 100%; border-collapse: collapse }
    
    th, td { padding: 16px; white-space: nowrap; font-size: 14px; }
    
    th { color: var(--color-primary) }
    td { color: #595959 }
    
    thead th {
      border-bottom: 1px solid #F3F4F6;
    }
    
    tr { border-bottom: 1px solid #F3F4F6; }
    tr:last-child { border-bottom: none; } 
    
    .table-item:hover { background-color: #FAFAFA; }
    .cell-center { text-align: center; }
    .cell-right { text-align: right; }
    .cell-left { text-align: start; }
    .foot {
      display: flex;
      justify-content: center;
      margin-top: 16px;
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


  willUpdate(changedProperties) {
    if (changedProperties.has('searchQuery')) {
      this.currentPage = 1;
    }
  }

  #onPageChange(e) {
    this.currentPage = e.detail.page;
  }

  render() {
    return html`
      <div style="background-color:#FFF; border-radius: 4px; border: 1px solid #E5E7EB; overflow: auto;">
        <table>
          <thead>
          <tr>
            ${this.columns.map(c => html`
              <th class=${c.align === 'right' ? 'cell-right' : c.align === 'left' ? 'cell-left' : 'cell-center'}>
                ${ i18next.t(c.label) }
              </th>
            `)}
            <th class="cell-center">${ i18next.t("Actions") }</th>
          </tr>
          </thead>
          <tbody>
          ${this.paged.map(
            row => html`
              <tr class="table-item">

                ${this.columns.map(c => html`
                  <td class=${c.align === 'right' ? 'cell-right' : c.align === 'left' ? 'cell-left' : 'cell-center'}>
                    ${c.highlight
                      ? html`<strong>${row[c.key]}</strong>`
                      : html`${row[c.key]}`
                    }
                  </td>
                `)}
                
                <td class="cell-center" style="display: flex; align-items: center; justify-content: center;">
                  
                  <c-button .href="/employees/${row.id}" size="sm" variant="ghost" title="${ i18next.t('Edit')}">
                    <c-icon name="pencil" size="14"></c-icon>
                  </c-button>
                  
                  <c-button variant="ghost" title="${ i18next.t('Delete')}" size="sm" @click=${() => this.dispatchEvent(new CustomEvent('delete-row', { detail: { row }, bubbles: true, composed: true }))}>
                    <c-icon name="trash" size="14"></c-icon>
                  </c-button>
                  
                </td>
              </tr>
            `
          )}
          </tbody>
        </table>
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

customElements.define('employee-table', EmployeeTable);
