import { expect } from '@open-wc/testing';
import { employeeStore } from '../src/store/employee-store.js';

describe('employeeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    employeeStore.state.employees = [];
  });

  it('setEmployees() correctly updates state and localStorage', () => {
    const list = [{ id: '1', firstName: 'Ali' }];
    employeeStore.setEmployees(list);

    expect(employeeStore.state.employees.length).to.equal(1);
    expect(employeeStore.state.employees[0].firstName).to.equal('Ali');

    const saved = JSON.parse(localStorage.getItem('employees'));
    expect(saved.length).to.equal(1);
    expect(saved[0].firstName).to.equal('Ali');
  });

  it('addEmployee() adds a new employee at the top of the list', () => {
    const initial = [
      { id: '1', firstName: 'Esra' },
      { id: '2', firstName: 'Mehmet' },
    ];
    employeeStore.setEmployees(initial);

    employeeStore.addEmployee({ firstName: 'New' });
    expect(employeeStore.state.employees[0].firstName).to.equal('New');
    expect(employeeStore.state.employees.length).to.equal(3);

    const saved = JSON.parse(localStorage.getItem('employees'));
    expect(saved[0].firstName).to.equal('New');
  });

  it('updateEmployee() correctly updates an existing employee', () => {
    const emp = { id: '1', firstName: 'John', lastName: 'Doe' };
    employeeStore.setEmployees([emp]);

    employeeStore.updateEmployee('1', { lastName: 'Kaya' });
    expect(employeeStore.state.employees[0].lastName).to.equal('Kaya');

    const saved = JSON.parse(localStorage.getItem('employees'));
    expect(saved[0].lastName).to.equal('Kaya');
  });

  it('deleteEmployee() removes the employee from state and localStorage', () => {
    const list = [
      { id: '1', firstName: 'John' },
      { id: '2', firstName: 'Jack' },
    ];
    employeeStore.setEmployees(list);

    employeeStore.deleteEmployee('1');
    expect(employeeStore.state.employees.length).to.equal(1);
    expect(employeeStore.state.employees[0].id).to.equal('2');

    const saved = JSON.parse(localStorage.getItem('employees'));
    expect(saved.length).to.equal(1);
    expect(saved[0].id).to.equal('2');
  });

  it('constructor loads mockEmployees if localStorage is empty', () => {
    localStorage.clear();
    new employeeStore.constructor();
    const data = JSON.parse(localStorage.getItem('employees'));
    expect(data).to.be.an('array');
    expect(data.length).to.be.greaterThan(0);
  });
});
