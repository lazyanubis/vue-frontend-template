import { setLocaleStorage, getLocaleStorage } from '@/utils/storage';
import { changeLanguage, findLocaleByString, SupportedLocale } from '../../locale';

export const getLocaleText = 'getLocale';
export const setLocaleText = 'setLocale';

export class UserState {
    locale: SupportedLocale | '' = '';
}

export default {
    namespaced: true,
    state: () => new UserState(),
    mutations: {
        setLocale: (state: UserState, locale: SupportedLocale) => {
            state.locale = locale;
            changeLanguage(locale); // 统一设置语言
            setLocaleStorage(locale); // 持久化 SupportedLocale对象本身就是字符串枚举
        },
    },
    actions: {
        setLocale: ({ commit }, locale: SupportedLocale) => commit(setLocaleText, locale),
    },
    getters: {
        getLocale: (state: UserState): SupportedLocale => {
            if (state.locale) return state.locale;
            state.locale = findLocaleByString(getLocaleStorage()); // 放入缓存
            return state.locale;
        },
    },
};
