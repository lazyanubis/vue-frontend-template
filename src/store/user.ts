import { defineStore } from 'pinia';
import { ref } from 'vue';

import { setLocaleStorage, getLocaleStorage } from '@/utils/storage';
import { changeLanguage, findLocaleByString, SupportedLocale } from '../locale';

export const getLocaleText = 'getLocale';
export const setLocaleText = 'setLocale';

export const useUserStore = defineStore('user', () => {
    const locale = ref<SupportedLocale | ''>('');

    const setLocale = (_locale: SupportedLocale) => {
        locale.value = _locale;
        changeLanguage(_locale); // 统一设置语言
        setLocaleStorage(_locale); // 持久化 SupportedLocale对象本身就是字符串枚举
    };

    const getLocale = (): SupportedLocale => {
        if (!locale.value) locale.value = findLocaleByString(getLocaleStorage()); // 放入缓存
        return locale.value;
    };

    return { setLocale, getLocale };
});
