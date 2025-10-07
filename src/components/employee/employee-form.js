import { LitElement, html, css } from 'lit';
import i18next from '../../i18n.js';
import { I18nMixin } from '../../i18n-mixin.js';
import { EMPLOYEE_FIELDS } from '../../constants/employee-fields.js';

export class EmployeeForm extends I18nMixin(LitElement) {
  static properties = {
    data: { type: Object },
  };

  constructor() {
    super();
    this.data = Object.fromEntries(EMPLOYEE_FIELDS.map(f => [f.key, '']));
  }

  static styles = css`
    .form-card {
      background-color: #FFFFFF;
      padding: 18px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
      margin: 0 12px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      align-items: start;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
      color: #444;
    }

    input,
    select {
      width: 100%;
      padding: 8px 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    input:focus,
    select:focus {
      border-color: var(--color-primary, #f97316);
    }
    input[type="date"] {
      max-width: 100%;
      width: 100%;
      min-height: 34px;
      -webkit-appearance: none;
      appearance: none;
    }

    .required::after {
      content: ' *';
      color: red;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
    }
  `;

  _onInputChange(e) {
    const { name, value } = e.target;
    this.data = { ...this.data, [name]: value };
    this.dispatchEvent(new CustomEvent('form-change', {
      detail: this.data,
      bubbles: true,
      composed: true
    }));
  }

  _onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      this.dispatchEvent(new CustomEvent('form-submit', {
        detail: this.data,
        bubbles: true,
        composed: true
      }));
    } else {
      form.reportValidity();
    }
  }

  renderField(field) {
    const { key, label, type, required, options } = field;

    if (type === 'select') {
      return html`
        <div>
          <label class=${required ? 'required' : ''}>${i18next.t(label)}</label>
          <select name=${key} ?required=${required} .value=${this.data[key]} @change=${this._onInputChange}>
            <option value="">${i18next.t("Please Select")}</option>
            ${options.map(opt => html`
              <option
                value=${opt.value}
                ?selected=${String(opt.value) === String(this.data[key])}
              >${i18next.t(opt.label)}</option>
              
            `)}
          </select>
        </div>
      `;
    }

    return html`
      <div>
        <label class=${required ? 'required' : ''}>${i18next.t(label)}</label>
        <input
          type=${type}
          name=${key}
          .value=${this.data[key]}
          ?required=${required}
          @input=${this._onInputChange}
        />
      </div>
    `;
  }

  render() {
    return html`
      <div class="form-card">
        
        <slot></slot>
        
        <form @submit=${this._onSubmit}>
          <div class="form-grid">
            ${EMPLOYEE_FIELDS.map(field => this.renderField(field))}
          </div>

          <div class="actions">
            <c-button variant="primary" type="submit" @click=${e => e.target.closest('form').requestSubmit()}>${i18next.t("Save")}</c-button>
            <c-button variant="ghost" type="button" @click=${() => this.dispatchEvent(new CustomEvent('form-cancel'))}>
              ${i18next.t("Cancel")}
            </c-button>
          </div>
        </form>  
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
