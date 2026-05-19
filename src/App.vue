<script setup>
import saver from '/src/view/saver.vue';

import 'ant-design-vue/dist/reset.css';
import '@ant-design/icons-vue';
</script>
<template>
  <a-watermark content="TalkTalk" :gap-y="100" :z-index="0">
    <saver />
  </a-watermark>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}

.ant-watermark {
  pointer-events: none !important;
}
</style>
