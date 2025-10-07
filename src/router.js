import { Router } from '@vaadin/router';

export function routerInit(outlet) {

  const router = new Router(outlet);
  router.setRoutes([
    { path: '/', redirect: '/employees' },
    { path: '/employees', component: 'page-employees', action: () => import('./pages/employees.js') },
    { path: '/employees/add', component: 'add-employee', action: () => import('./pages/add-employee.js') },
    { path: '/employees/:id', component: 'edit-employee', action: () => import('./pages/edit-employee.js') },
    { path: '(.*)', component: 'not-found', action: () => import('./pages/not-found.js') },
  ]);

}
