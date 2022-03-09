import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const i18n = () => {
  i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ["en", "ar"],
      fallbackLng: "en",
      detection: {
        order: ["cookie", "htmlTag", "path", "localStorage"],
        caches: ["cookie", "localStorage"],
      },
      backend: {
        loadPath: "/assets/locales/{{lng}}/translation.json",
      },
    });
};
