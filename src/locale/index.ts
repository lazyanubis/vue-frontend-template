// import { createI18n } from 'vue-i18n';
import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.js';
import commonLanguages from './languages/common';
import { setHtmlPageLang } from './locales';
import en from './languages/en';
import zhCN from './languages/zh-CN';

// 多语言选择用到的对象，给用户看的文字和对应语言之间的关系
export class LanguageItem {
    title: string;
    payload: SupportedLocale;
    constructor(title: string, payload: SupportedLocale) {
        this.title = title;
        this.payload = payload;
    }
    static of(title: string, payload: SupportedLocale): LanguageItem {
        return new LanguageItem(title, payload);
    }
}

// 代码里面运行全部用 SupportedLocale 枚举对象来表示当前显示的语言
// 必须用支持的语言类型
//! 增加语言必须在这里添加
export enum SupportedLocale {
    en = 'en',
    zhCN = 'zh-CN',
}

// 展示多语言界面列表
//! 增加语言必须在这里添加
export const languages = [
    LanguageItem.of('navbar.language.en', SupportedLocale.en),
    LanguageItem.of('navbar.language.zh-CN', SupportedLocale.zhCN),
];

// 这里的 locale 参数应当是从持久化层读取出来的，该方法转换成 SupportedLocale 对象
export function findLocaleByString(locale: string): SupportedLocale {
    locale = locale.replace('-', '');
    for (const l in SupportedLocale) {
        if (l === locale) {
            return SupportedLocale[locale];
        }
    }
    console.error('can not find supported language: ' + locale);
    return SupportedLocale.en; // 默认英文
}

// 下面个根据语言枚举查找对应的语言包
const messages = {
    en: { ...en, ...commonLanguages },
    'zh-CN': { ...zhCN, ...commonLanguages },
};
// console.log('messages', messages);

const i18n = createI18n({
    locale: SupportedLocale.en, // 默认英语
    fallbackLocale: SupportedLocale.en, // 无匹配语言情况下显示英语
    silentFallbackWarn: true,
    globalInjection: true,
    messages,
});

// 导出加入 vue 状态管理
export default i18n;

// 统一改变语言的方法，只有调用该方法才能够切换语言，一律禁止以其他方式切换语言
export function changeLanguage(locale: SupportedLocale) {
    i18n.global.locale = locale;
    setHtmlPageLang(locale);
}

// vue 文件里面 template 模板可以直接用 t ('navbar.tabs.home') 显示
// vue 代码部分显示多语言应当统一走这个方法
export function parseLanguage(key: string): string {
    const value = i18n.global.t(key);
    if (!value) {
        console.error(
            `can not find multi-language value for key '${key}' with ${i18n.global.locale} environment. Check please.`,
        );
    }
    return value;
}

export function t(key: string): string {
    return parseLanguage(key);
}
