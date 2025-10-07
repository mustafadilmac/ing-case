// src/i18n-mixin.js
import i18next from './i18n.js';

export const I18nMixin = (superclass) => class extends superclass {
  constructor() {
    super();
    this._boundLangChange = this._langChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    i18next.on('languageChanged', this._boundLangChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    i18next.off('languageChanged', this._boundLangChange);
  }

  _langChanged() {
    this.requestUpdate();
  }
};
