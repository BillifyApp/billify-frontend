import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_common from "./src/i18n/en/common";
import de_common from "./src/i18n/de/common";

export const resources = {
  en: {
    translation: {
      common: en_common,
    },
  },
  de: {
    translation: {
      common: de_common,
    },
  },
};

//https://brainsandbeards.com/blog/i18n-in-react-native-apps/

i18n.use(initReactI18next).init({
  debug: true, //TODO change
  compatibilityJSON: "v3", //https://stackoverflow.com/questions/70493788/i18nextpluralresolver-your-environment-seems-not-to-be-intl-api-compatible-u
  resources,
  lng: "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
