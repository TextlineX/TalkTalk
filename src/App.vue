<script setup>
import saver from '/src/view/saver.vue';
import { ref } from 'vue';

import 'ant-design-vue/dist/reset.css';
import '@ant-design/icons-vue';
</script>
<template>
  <a-watermark content="Textline制作">
    <div style="height: 500px" />
  </a-watermark>
  <saver />
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
