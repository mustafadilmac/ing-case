import { LitElement, html, css } from 'lit';
import i18next from "../i18n.js";
import { employeeStore } from "../store/employee-store.js";
import '../components/c-breadcrumb.js';
import '../components/employee/employee-form.js';
import '../components/confirm-modal.js';
import { handleGlobalCancel } from '../utils/navigation.js';
import { Router } from '@vaadin/router';

export class EditEmployee extends LitElement {

  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = null;
  }

  onBeforeEnter(location) {
    const id = location.params.id;
    const found = employeeStore.state.employees.find(e => e.id === id);
    this.employee = found ? { ...found } : null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.employee) {
      const id = window.location.pathname.split('/').pop();
      const found = employeeStore.state.employees.find(e => e.id === id);
      this.employee = found ? { ...found } : null;
    }
  }

  async handleSave( data ) {
    const modal = this.renderRoot.querySelector('confirm-modal');

    modal.title = i18next.t('Are you Sure?');
    modal.message = i18next.t('Employee record of will be update');
    modal.open = true;

    const onConfirm = async () => {
      employeeStore.updateEmployee(data.id, data);
      modal.removeEventListener('confirm', onConfirm);
      modal.removeEventListener('cancel', onCancel);
      //window.location.href = '/';
      Router.go('/');
    };

    const onCancel = () => {
      modal.removeEventListener('confirm', onConfirm);
      modal.removeEventListener('cancel', onCancel);
    };

    modal.addEventListener('confirm', onConfirm);
    modal.addEventListener('cancel', onCancel);
  }

  static styles = css`
    .warning-badge {
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #facc15;
      background-color: #fef3c7;
      color: #92400e;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 22px;
    }

    .error-badge {
      display: block;
      padding: 24px 32px;
      border: 1px solid #fee2e2;
      background: #fef2f2;
      color: #b91c1c;
      font-weight: 600;
      border-radius: 8px;
    }
  `;

  render() {
    if (!this.employee) {
      return html`
      <c-breadcrumb .title="${i18next.t('Edit Employee')}"></c-breadcrumb>
      
      <div class="container">
        <div class="error-badge">
          ${i18next.t('Record not found')}
        </div>
      </div>
    `;
    }

    return html`
      <c-breadcrumb .title="${i18next.t('Edit Employee')}"></c-breadcrumb>

      <div class="container">
        <employee-form
          .data=${this.employee}
          @form-submit=${(e) => this.handleSave(e.detail)}
          @form-cancel=${handleGlobalCancel}
        >
          <div class="warning-badge">
            ${i18next.t('you are editing an employee', {
              firstName: this.employee.firstName,
              lastName: this.employee.lastName,
            })}
          </div>
        </employee-form>
      </div>

      <confirm-modal></confirm-modal>
    `;
  }

}

customElements.define('edit-employee', EditEmployee);
