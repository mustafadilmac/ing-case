import { LitElement, html } from 'lit';
import i18next from "../i18n.js";
import '../components/c-breadcrumb.js';
import '../components/employee/employee-form.js';
import { handleGlobalCancel } from '../utils/navigation.js';
import { employeeStore } from '../store/employee-store.js';
import { Router } from '@vaadin/router';

export class AddEmployee extends LitElement {

  constructor() {
    super();
  }

  handleSave( data ) {
    employeeStore.addEmployee(data);
    Router.go('/');
  }

  render() {
    return html`
      <c-breadcrumb .title="${ i18next.t('Add Employee') }"></c-breadcrumb>

      <div class="container" style="">
        <employee-form
          @form-submit=${(e) => this.handleSave(e.detail)}
          @form-cancel=${handleGlobalCancel}
        >
        </employee-form>
      </div>
    `;
  }
}

customElements.define('add-employee', AddEmployee);
