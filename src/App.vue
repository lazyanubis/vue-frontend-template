<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { changeLanguage } from './locale';
import { useUserStore } from '@/store/user';

const user = useUserStore();

const locale = computed(() => user.getLocale());

// 设置语言 直接用 不用当成方法调用
onMounted(() => changeLanguage(locale.value));
</script>

<template>
    <router-view />
</template>

<style lang="less"></style>
