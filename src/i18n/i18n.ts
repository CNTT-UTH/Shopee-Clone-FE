import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AUTH_EN from '../locales/en/auth.json'
import AUTH_VI from '../locales/vi/auth.json'  
import FOOTER_EN from '../locales/en/footer.json'
import FOOTER_VI from '../locales/vi/footer.json'

export const resources = {
    en: {
      auth: AUTH_EN,
      footer: FOOTER_EN
    },
    vi: {
      auth: AUTH_VI,
      footer: FOOTER_VI
    }
} as const;

const defaultNS = 'auth'

export default defaultNS;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',   //main language
    ns:['auth', 'footer'],
    defaultNS,
    fallbackLng : 'en',  //backup language
    interpolation: {
        escapeValue: false // react already safes from xss
    }
  })
