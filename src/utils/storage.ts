// 本地保存语言选择
const LANGUAGE_LOCALE = '__LANGUAGE_LOCALE__';

export const setLocaleStorage = (locale: string): void =>
    localStorage.setItem(LANGUAGE_LOCALE, locale);

export const getLocaleStorage = (): string => {
    const locale = localStorage.getItem(LANGUAGE_LOCALE);
    return locale ? locale : 'en';
};
