<script setup>
import { ref } from 'vue';
let orignUrl = decodeURIComponent(window.location.href);
let Tag = orignUrl.split('?')[1];
let backend_url = import.meta.env.VITE_BACKEND_URL;

let num = ref(0)
let object = ref([])
async function getTag() {
  try {
    const response = await fetch(`${backend_url}getTagArticle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: Tag
      })
    });
    const data = await response.json();
    object.value = data.data; // 正确更新 ref 的 .value
    num.value = data.data.length; // 更新 num
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

function createArticle() {

}

getTag()
createArticle()
</script>

<template>
  <a-flex class="main" wrap="wrap" justify="center">
    <a-flex class="tag_info" justify="center" align="center" wrap="wrap">
      <a-tooltip>标签:
        <template #title>
          这是一个标签
        </template>
      </a-tooltip>
      <a-tooltip  style="margin: 20px">{{Tag}}</a-tooltip>
      <a-badge :count="num" />
    </a-flex>
    <a-flex gap="middle" align="center" wrap="wrap" justify="space-around" class="content_box">
      <a-card :title="item.title" :bordered="false" style="width: 300px" v-for="item in object " :key="item.id">
        <p>{{ item.content }}</p>
      </a-card>
    </a-flex>
  </a-flex>
</template>

<style lang="less" scoped>
.main {
  margin: 0 auto;
  width: 100%;
  height: 100%;

  .tag_info {
    width: 100%;
    height: 20%;
    font-size: 20px;
    font-weight: 700;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
}
</style>