import { LitElement, html, css } from 'lit';
import '../components/employee/employee-list-view.js';
import '../components/confirm-modal.js';
import '../components/c-breadcrumb.js';
import '../components/c-button.js';
import '../components/c-icon.js';
import i18next from '../i18n.js';
import { I18nMixin } from '../i18n-mixin.js';
import { employeeStore } from '../store/employee-store.js';
import { EMPLOYEE_FIELDS } from '../constants/employee-fields.js';


export class PageEmployees extends I18nMixin(LitElement) {
  static styles = css`
    .search-input {
      flex: 1;
      width: 100%;
      padding: 8px 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      transition: all 0.2s;
      min-width: 120px;
    }
    .search-input:focus {
      border-color: var(--color-primary);
    }
    @media (min-width: 768px) {
      .search-input:focus {
        min-width: 220px;
      }
    }
  `;

  static properties = {
    viewMode: { type: String, reflect: true },
    columns: { type: Array },
    employees: { type: Array },
    searchQuery: { type: String }
  };

  constructor() {
    super();
    this.viewMode = 'table';
    this.columns = EMPLOYEE_FIELDS;
    this.employees = [];
    this.searchQuery = '';
  }

  async onBeforeEnter() {
    await this.fetchEmployees();
  }

  async fetchEmployees() {
    this.employees = employeeStore.state.employees;
  }

  get filteredEmployees() {
    const q = this.searchQuery?.toLowerCase().trim();
    if (!q) return this.employees;
    return this.employees.filter(emp => {
      const first = emp.firstName?.toLowerCase() || '';
      const last = emp.lastName?.toLowerCase() || '';
      const email = emp.email?.toLowerCase() || '';
      return first.includes(q) || last.includes(q) || email.includes(q);
    });
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
  }
  handleDelete(e) {
    const details = e.detail.row;
    const id = details.id;
    const modal = this.renderRoot.querySelector('confirm-modal');

    modal.title = i18next.t('Are you Sure?');
    modal.message = i18next.t('Selected Employee record of will be deleted', {
      firstName: details.firstName,
      lastName: details.lastName
    });
    modal.open = true;

    const onConfirm = async () => {
      employeeStore.deleteEmployee(id);
      modal.removeEventListener('confirm', onConfirm);
      modal.removeEventListener('cancel', onCancel);
      document.getElementById('toast').show(i18next.t('Employee Deleted'));
      await this.fetchEmployees();
    };

    const onCancel = () => {
      modal.removeEventListener('confirm', onConfirm);
      modal.removeEventListener('cancel', onCancel);
    };

    modal.addEventListener('confirm', onConfirm);
    modal.addEventListener('cancel', onCancel);
  }

  render() {
    return html`
      <c-breadcrumb .title="${ i18next.t('Employee List') }">
        <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
          <input
            class="search-input"
            type="search"
            placeholder="${ i18next.t('Search') }..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
          />
          <div>
            <c-button @click=${() => this.viewMode = 'table'} .variant="${this.viewMode === 'table' ? 'primary' : 'ghost'}">
              <c-icon name="list" size="14"></c-icon>
            </c-button>
            <c-button @click=${() => this.viewMode = 'grid'} .variant="${this.viewMode === 'grid' ? 'primary' : 'ghost'}">
              <c-icon name="grid-3x3" size="14"></c-icon>
            </c-button>
          </div>
        </div>
      </c-breadcrumb>
      
      <div style="padding: 0 12px;">
        <employee-list-view
          .viewMode=${this.viewMode}
          .columns=${this.columns}
          .rows=${this.filteredEmployees}
          .searchQuery=${this.searchQuery}
          @delete-row=${this.handleDelete}
        ></employee-list-view>
      </div>

      <confirm-modal></confirm-modal>
    `;
  }
}

customElements.define('page-employees', PageEmployees);
