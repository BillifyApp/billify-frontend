import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/i18n/en.json';
import de from './src/i18n/de.json';

export const resources = {
    en: {
        translation: en,
    },
    de: {
        translation: de,
    },
}

//https://brainsandbeards.com/blog/i18n-in-react-native-apps/

i18n.use(initReactI18next).init({
    debug: true, //TODO change
    compatibilityJSON: 'v3', //https://stackoverflow.com/questions/70493788/i18nextpluralresolver-your-environment-seems-not-to-be-intl-api-compatible-u
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})


/*i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
            compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
            resources,
            lng: 'en', // default language to use.
            // if you're using a language detector, do not define the lng optioninterpolation: {
            //escapeValue: false,
            //},
        }
    );*/
export default i18n;