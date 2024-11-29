import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { MMKV } from "react-native-mmkv";
import en from "@/src/locales/en.json";
import es from "@/src/locales/es.json";

const storage = new MMKV();
const languagePreference = storage.getString("language");

let language = languagePreference ? languagePreference : "en";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};

export { changeLanguage };
export default i18n;
