import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteEnv } from '../../../types/model';

export function viteHtmlPlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
    return createHtmlPlugin({
        minify: true,
        // entry: 'src/main.ts',
        // template: 'public/index.html',
        inject: {
            data: {
                keywords: viteEnv.VITE_KEYWORDS,
                author: viteEnv.VITE_AUTHOR,
                description: viteEnv.VITE_DESCRIPTION,
                noScriptTitle: viteEnv.VITE_NO_SCRIPT_TITLE,
                title: viteEnv.VITE_TITLE,
                debugScript:
                    !isBuild || viteEnv.VITE_SHOW_DEBUG_SCRIPT
                        ? '<script src="/spacingjs.js" defer></script>' // 开发模式可以注入这个看尺寸的工具
                        : '',
            },
            tags: [
                // {
                //   injectTo: 'body-prepend',
                //   tag: 'div',
                //   attrs: {
                //     id: 'tag',
                //   },
                // },
            ],
        },
    });
}
