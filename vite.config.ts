import { defineConfig, loadEnv, UserConfig } from 'vite';
import * as path from 'path';

import { createVitePlugins } from './build/vite/plugins';

import { ViteEnv } from './types/model';

enum ConfigMode {
    development = 1, // 防止 0 情况 if 出错
    production,
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log('command ->', command);
    console.log('mode ->', mode);

    const configMode = getConfigMode(mode); // 获取配置模式
    console.log('config mode ->', ConfigMode[configMode]); // 输出查询出来的配置模式

    const readEnv = loadEnv(mode, './env');
    // @ts-ignore force transform, not a bit problem for string variable
    const viteEnv: ViteEnv = readEnv; // 导入设置的环境变量，会根据选择的 mode 选择文件
    // but matters other types
    if (readEnv.VITE_DROP_CONSOLE !== undefined)
        viteEnv.VITE_DROP_CONSOLE = readEnv.VITE_DROP_CONSOLE === 'true';
    if (readEnv.VITE_DROP_DEBUGGER !== undefined)
        viteEnv.VITE_DROP_DEBUGGER = readEnv.VITE_DROP_DEBUGGER === 'true';
    console.log('viteEnv ->', viteEnv); // 输出加载的变量

    process.env.configMode = ConfigMode[configMode];

    mode = getMode(configMode);
    const isBuild = mode === 'production';
    const common: UserConfig = {
        publicDir: 'public', // 该目录下文件会原封不动存放至 dist
        mode, // 运行模式
        define: {
            'process.env.NODE_ENV': JSON.stringify(getNodeEnv(configMode)), // 接口文件里面需要用来判断 莫名其妙要加双引号
            'process.env': process.env, // 环境变量
        },
        plugins: [...createVitePlugins(viteEnv, isBuild)], // 插件
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'), // @符号要解析
                '~/': `${path.resolve(__dirname, 'src')}/`, // element-plus 可能要用
                // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 浏览器总是有 warning，这样就不显示了
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'], // import 可以省略的拓展名
        },
        build: {
            minify: isBuild ? 'esbuild' : false, // 默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%
            // terserOptions: {
            //     compress: {
            //         drop_console:
            //             configMode == ConfigMode.production
            //                 ? true // 线上部署的生产打包一定不包含
            //                 : viteEnv.VITE_DROP_CONSOLE === undefined
            //                 ? isBuild
            //                 : viteEnv.VITE_DROP_CONSOLE, // 生产环境去除 console
            //         drop_debugger:
            //             configMode == ConfigMode.production
            //                 ? true // 线上部署的生产打包一定不包含
            //                 : viteEnv.VITE_DROP_DEBUGGER === undefined
            //                 ? isBuild
            //                 : viteEnv.VITE_DROP_DEBUGGER, // 生产环境去除 debugger
            //     },
            // },
            rollupOptions: {
                // external: ["element-plus"], //! 天坑的，因为这个配置耗费了好几个小时，我白白的睡眠时间啊
                output: {
                    manualChunks: {
                        vue: ['vue', 'vue-router'], // 目前打包还是这个最小，还没有 bug
                        'element-plus': ['element-plus'],
                    },
                    // manualChunks(id) {
                    //     if (id.includes("node_modules")) {
                    //         return "vendor"
                    //     }
                    //     // if (
                    //     //     id.includes("node_modules") &&
                    //     //     id.match(/element-plus|legacy/)
                    //     // ) { // TODO 本来是想解决打包过大问题，但是现在发现，打的包会失效无法线上运行，得嘞，虽然不报 charset 的错误了，但是不能运行也太坑了
                    //     //     return id
                    //     //         .toString()
                    //     //         .split("node_modules/")[1]
                    //     //         .split("/")[0]
                    //     //         .toString()
                    //     // }
                    // },
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false, // TODO 没作用 element-plus 的 index.css 在被打包时会报错 warning: "@charset" must be the first rule in the f
                    // additionalData: `@use "~/assets/theme/element-variables.scss" as *;`,
                },
            },
        },
        envDir: 'env',
        clearScreen: false,
    };

    if (!isBuild) {
        return {
            // serve 独有配置 开发模式
            ...common,
            server: {
                hmr: true, // 热更新
                proxy: {
                    '/api': {
                        target: 'http://localhost',
                        changeOrigin: true,
                        rewrite: (path) => path,
                    },
                },
                cors: true,
                host: '0.0.0.0',
                port: 3000,
            },
        };
    } else {
        return {
            // build 独有配置 生产模式
            ...common,
        };
    }
});

// 判断配置模式
function getConfigMode(mode: string): ConfigMode {
    if (ConfigMode[mode]) {
        return ConfigMode[mode];
    }
    throw new Error('can not recognize mode: ' + mode);
}

function getMode(configMode: ConfigMode) {
    let mode = '';
    switch (configMode) {
        case ConfigMode.development:
            mode = 'development';
            break;
        case ConfigMode.production:
            mode = 'production';
            break;
        default:
            throw new Error(`what a config config mode: ${configMode} ${ConfigMode[configMode]}`);
    }
    return mode;
}

function getNodeEnv(mode: ConfigMode): string {
    let env = '';
    switch (mode) {
        case ConfigMode.development:
            env = 'development';
            break;
        case ConfigMode.production:
            env = 'production';
            break;
        default:
            throw new Error(`what a config config mode: ${mode} ${ConfigMode[mode]}`);
    }
    return env;
}
