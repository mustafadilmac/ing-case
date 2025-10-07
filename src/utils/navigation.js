import { Router } from '@vaadin/router';

export function handleGlobalCancel() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    Router.go('/');
  }
}

