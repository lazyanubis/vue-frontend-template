export declare interface ViteEnv {
    VITE_KEYWORDS: string; // 首页关键词
    VITE_AUTHOR: string; // 首页作者
    VITE_DESCRIPTION: string; // 首页描述
    VITE_NO_SCRIPT_TITLE: string; // 首页不支持脚本提示标题
    VITE_TITLE: string; // 首页标题

    VITE_DROP_CONSOLE?: boolean; // 是否移除 console 输出
    VITE_DROP_DEBUGGER?: boolean; // 是否移除 debugger 点

    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY?: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
    VITE_SHOW_DEBUG_SCRIPT: boolean;
}
