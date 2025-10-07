import { LitElement, html, css } from 'lit';
import './employee-table.js';
import './employee-card.js';
import i18next from '../../i18n.js';
import { I18nMixin } from '../../i18n-mixin.js';

export class EmployeeListView extends I18nMixin(LitElement) {
  static properties = {
    viewMode: { type: String },
    columns: { type: Array },
    rows: { type: Array },
    searchQuery: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.viewMode = 'table';
    this.columns = [];
    this.rows = [];
    this.searchQuery = '';
  }

  render() {
    const hasData = this.rows && this.rows.length > 0;

    if (!hasData) {
      return html`
      <div style="text-align: center; background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 32px 12px;">
        ${this._renderEmptyState()}
      </div>
    `;
    }

    return html`
      ${this.viewMode === 'table'
        ? html`
          <employee-table
            .columns=${this.columns}
            .searchQuery=${this.searchQuery}
            .rows=${this.rows}
            @delete-row=${(e) => this._forward('delete-row', e.detail)}
          ></employee-table>
        `
        : html`
          <employee-card
            .columns=${this.columns}
            .searchQuery=${this.searchQuery}
            .rows=${this.rows}
            @delete-row=${(e) => this._forward('delete-row', e.detail)}
          ></employee-card>
        `}
    `;
  }

  _renderEmptyState() {
    const hasSearch = this.searchQuery !== '';
    return html`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <c-icon name="${hasSearch ? 'search-x' : 'users'}" size="36"></c-icon>
      <p style="font-size: 14px; font-weight: 700">
        ${hasSearch
          ? i18next.t('No employees found matching your search.', {
            searchQuery: this.searchQuery
          })
          : i18next.t('No employees available yet.')}
      </p>
    </div>
  `;
  }


  _forward(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
  }
}

customElements.define('employee-list-view', EmployeeListView);
