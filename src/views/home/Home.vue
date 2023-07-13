<script lang="ts" setup>
import { t } from '@/locale';

import { useUserStore } from '@/store/user';
import { SupportedLocale } from '@/locale';

const user = useUserStore();

const onChange = () =>
    user.setLocale(
        user.getLocale() === SupportedLocale.en ? SupportedLocale.zhCN : SupportedLocale.en,
    );
</script>

<template>
    <div class="test">
        <div class="test2" @click="onChange"> {{ t('test.test') }} </div>
    </div>
</template>

<style lang="less">
.test {
    .test2 {
        color: red;
    }
}
</style>
