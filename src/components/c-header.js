import { LitElement, html } from 'lit';
import i18next from "../i18n.js";

export class CHeader extends LitElement {
  createRenderRoot() {
    return this;
  }

  toggleLanguage() {
    const currentLang = i18next.language || localStorage.getItem("lang") || "en";
    const newLang = currentLang === "en" ? "tr" : "en";

    i18next.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    this.requestUpdate();
    document.dispatchEvent(new CustomEvent("language-changed", { detail: { lang: newLang } }));
  }

  render() {
    const currentLang = i18next.language || localStorage.getItem("lang") || "en";
    const isEnglish = currentLang === "en";

    const flagSrc = isEnglish
      ? "/assets/images/flags/tr.png"
      : "/assets/images/flags/en.png";

    const flagAlt = isEnglish ? "Türkçe" : "English";

    return html`
      <header style="background: white; position: sticky; top: 0; left: 0; right: 0; border-bottom: 1px solid #F5F5F5; padding: 8px 12px;">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">

          <a href="/" style="display: flex; align-items: center; gap: 8px; cursor: pointer; text-decoration: none">
            <img width="22" height="22" src="/assets/images/ing-icon.png" alt="ing icon">
            <h3 style="font-size: 14px; font-weight: bold; color: black">ING</h3>
          </a>

          <div style="display: flex; align-items: center; justify-content: stretch; gap: 8px;">
            <c-button href="/employees" variant="ghost">
              <c-icon name="users" size="14"></c-icon>
              ${ i18next.t("Employees") }
            </c-button>

            <c-button href="/employees/add" variant="ghost">
              <c-icon name="plus" size="14"></c-icon>
              ${ i18next.t("Add New") }
            </c-button>

            <div style="cursor: pointer; display: flex; align-items: center;justify-content: center;" @click=${this.toggleLanguage} title="${flagAlt}">
              <img width="20" height="20" src="${flagSrc}" alt="${flagAlt}">
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('c-header', CHeader);
