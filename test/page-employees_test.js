import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { employeeStore } from '../src/store/employee-store.js';
import '../src/pages/employees.js';
import '../src/components/confirm-modal.js';

describe('PageEmployees', () => {
  let element;

  beforeEach(async () => {
    const fakeToast = document.createElement('div');
    fakeToast.id = 'toast';
    fakeToast.show = () => {};
    document.body.appendChild(fakeToast);

    employeeStore.setEmployees([
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@company.com' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@company.com' },
      { id: '3', firstName: 'Michael', lastName: 'Brown', email: 'michael@company.com' },
    ]);

    element = await fixture(html`<page-employees></page-employees>`);
    await element.updateComplete;
    await element.fetchEmployees();
  });

  afterEach(() => {
    sinon.restore();
    const toast = document.getElementById('toast');
    if (toast) toast.remove();
  });

  it('renders all employees correctly', async () => {
    await expect(element.employees.length).to.equal(3);
    await expect(element.filteredEmployees.length).to.equal(3);
  });

  it('filters employees by name or email', async () => {
    element.handleSearch({ target: { value: 'john' } });
    await element.updateComplete;
    const filtered = element.filteredEmployees;
    await expect(filtered.length).to.equal(1);
    await expect(filtered[0].firstName).to.equal('John');
  });

  it('resets the search and shows all employees again', async () => {
    element.handleSearch({ target: { value: '' } });
    await element.updateComplete;
    await expect(element.filteredEmployees.length).to.equal(3);
  });

  it('toggles between table and grid view', async () => {
    await expect(element.viewMode).to.equal('table');

    const gridBtn = element.shadowRoot.querySelectorAll('c-button')[1];
    gridBtn.click();
    await element.updateComplete;
    await expect(element.viewMode).to.equal('grid');

    const tableBtn = element.shadowRoot.querySelectorAll('c-button')[0];
    tableBtn.click();
    await element.updateComplete;
    await expect(element.viewMode).to.equal('table');
  });

  it('renders search input and buttons', async () => {
    const input = element.shadowRoot.querySelector('.search-input');
    const buttons = element.shadowRoot.querySelectorAll('c-button');
    expect(input).to.exist;
    expect(input.placeholder.toLowerCase()).to.include('search');
    expect(buttons.length).to.be.at.least(2);
  });

  it('opens confirm modal and deletes employee on confirm', async () => {
    const row = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@company.com' };
    const modal = element.shadowRoot.querySelector('confirm-modal');

    const deleteSpy = sinon.spy(employeeStore, 'deleteEmployee');
    const fetchSpy = sinon.spy(element, 'fetchEmployees');

    element.handleDelete({ detail: { row } });
    await element.updateComplete;

    expect(modal.open).to.be.true;
    expect(modal.title.toLowerCase()).to.include('sure');

    modal.dispatchEvent(new CustomEvent('confirm'));
    await element.updateComplete;

    expect(deleteSpy.calledOnceWith('1')).to.be.true;
    expect(fetchSpy.calledOnce).to.be.true;
  });

  it('closes modal properly on cancel without deleting', async () => {
    const row = { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@company.com' };
    const modal = element.shadowRoot.querySelector('confirm-modal');

    const deleteSpy = sinon.spy(employeeStore, 'deleteEmployee');

    element.handleDelete({ detail: { row } });
    await element.updateComplete;

    modal.dispatchEvent(new CustomEvent('cancel'));
    await element.updateComplete;

    expect(deleteSpy.called).to.be.false;
  });
});
