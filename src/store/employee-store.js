import { reactive } from '../utils/reactive.js';
import { mockEmployees } from '../mock/mock-employees.js';

class EmployeeStore {
  constructor() {
    const saved = localStorage.getItem('employees');

    this.state = reactive({
      employees: saved !== null ? JSON.parse(saved) : mockEmployees,
    });

    if (!saved) {
      localStorage.setItem('employees', JSON.stringify(mockEmployees));
    }
  }

  setEmployees(list) {
    this.state.employees = list;
    localStorage.setItem('employees', JSON.stringify(this.state.employees));
  }

  addEmployee(emp) {
    const newEmp = { id: crypto.randomUUID(), ...emp };
    this.setEmployees([newEmp, ...this.state.employees]);
  }

  updateEmployee(id, updated) {
    const list = this.state.employees.map(emp =>
      emp.id === id ? { ...emp, ...updated } : emp
    );

    this.setEmployees(list);
  }

  deleteEmployee(id) {
    const list = this.state.employees.filter(emp => emp.id !== id);
    this.setEmployees(list);
  }
}

export const employeeStore = new EmployeeStore();
