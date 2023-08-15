import * as locale from 'date-fns/locale';

export const getLocale = (lang) => {
  const subLang = lang.split('-');
  if (subLang !== 'en') {
    return locale[subLang[0]];
  }
  return locale[`${subLang[0]}${subLang[1]}`];
};
