import 'element-plus/dist/index.css'; // element plus 生效的样式

import '@purge-icons/generated'; // 导入 icons
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './locale';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia()).use(i18n).use(router);

app.mount('#app');
