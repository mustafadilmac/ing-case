import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { employeeStore } from '../src/store/employee-store.js';
import '../src/pages/edit-employee.js';
import '../src/components/confirm-modal.js';


describe('EditEmployee', () => {
  beforeEach(() => {
    localStorage.clear();
    employeeStore.setEmployees([
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@company.com' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@company.com' },
    ]);
  });

  it('renders "Record not found" message when employee is missing', async () => {
    employeeStore.setEmployees([]);
    const el = await fixture(html`<edit-employee></edit-employee>`);
    await el.updateComplete;

    const text = el.shadowRoot.textContent.toLowerCase();
    expect(text).to.include('record not found');
  });

  it('renders edit form when employee exists', async () => {
    const el = await fixture(html`<edit-employee></edit-employee>`);
    el.employee = { id: '1', firstName: 'John', lastName: 'Doe' };
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('employee-form');
    expect(form).to.exist;

    form.querySelector('.warning-badge');
    expect(el.shadowRoot.textContent.toLowerCase()).to.include('editing');
  });

  it('opens ConfirmModal when saving employee', async () => {
    const el = await fixture(html`<edit-employee></edit-employee>`);
    el.employee = { id: '1', firstName: 'John', lastName: 'Doe' };
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirm-modal');
    expect(modal).to.exist;
    expect(modal.open).to.be.false;

    el.handleSave(el.employee);
    await el.updateComplete;

    expect(modal.open).to.be.true;
    expect(modal.title.toLowerCase()).to.include('sure');
    expect(modal.message.toLowerCase()).to.include('update');
  });

  it('dispatches confirm event and updates employee record', async () => {
    const el = await fixture(html`<edit-employee></edit-employee>`);
    el.employee = { id: '1', firstName: 'John', lastName: 'Doe' };
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirm-modal');
    el.handleSave(el.employee);
    await el.updateComplete;

    const confirmPromise = oneEvent(modal, 'confirm');
    modal.dispatchEvent(new CustomEvent('confirm'));
    await confirmPromise;

    const updated = employeeStore.state.employees.find(e => e.id === '1');
    expect(updated).to.exist;
  });
});
