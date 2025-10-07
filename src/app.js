//import { LitElement, html } from 'lit';
//import {LitElement, html} from '../node_modules/lit-element/lit-element.js'
import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';


import './components/c-header.js';
import './components/c-toast.js';
import './components/c-icon.js';
import './components/c-button.js';
import i18next from "./i18n.js";
import { routerInit } from './router.js';


export class MyApp extends LitElement {
  createRenderRoot() {
    return this;
  }
  constructor() {
    super();

    i18next.on("languageChanged", () => {
      document.documentElement.lang = i18next.language;
      this.forceGlobalRerender();
    });
  }

  forceGlobalRerender() {
    this.requestUpdate();
    document.querySelectorAll("*").forEach((el) => {
      if (el.requestUpdate) el.requestUpdate();
    });
  }

  firstUpdated() {
    routerInit(this.renderRoot.querySelector('#outlet'));
    i18next.on("languageChanged", () => this.requestUpdate());
  }

  changeLanguage(lang) {
    i18next.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  render() {
    return html`
      <c-header></c-header>
      <main id="outlet" class="container" style="padding: 0 0 42px 0"></main>
      <c-toast id="toast"></c-toast>
    `;
  }
}

customElements.define('my-app', MyApp);
