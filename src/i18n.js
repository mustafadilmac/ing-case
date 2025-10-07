import i18next from "i18next";
import en from "./locales/en.js";
import tr from "./locales/tr.js";

await i18next.init({
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
});

document.documentElement.lang = i18next.language;

i18next.on("languageChanged", (lang) => {
  document.documentElement.lang = lang;
});

export default i18next;
