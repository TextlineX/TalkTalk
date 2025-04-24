<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import news from '/src/components/content/news.vue';
import home from '/src/components/content/home.vue';
import classify from "/src/components/content/classify.vue";
import toolbox from "/src/components/content/toolbox.vue";
import my from "/src/components/content/my.vue";
import settings from "/src/components/content/settings.vue";
import about from "/src/components/content/about.vue";
import { useRouter } from 'vue-router';
let router = useRouter();

let searchValue = ref('')

/*路由切换*/
function init() {
  router.push('/news');
}

function handleClick(tab,event) {
  console.log('切换路由到:', event.target.id);
  switch (event.target.id) {
    case 'tab-0':
      router.push('/news');
      break;
    case 'tab-1':
      router.push('/classify');
      break;
    case 'tab-2':
      router.push('/toolbox');
      break;
    case 'tab-3':
      router.push('/my');
      break;
    case 'tab-4':
      router.push('/settings');
      break;
    case 'tab-5':
      router.push('/about');
      break;
  }
}

init()
</script>

<template>
  <el-header class="header">
    <el-image class="icon" src="/talktalk.png" fit="cover" style="width: 45px;height: 45px"></el-image>
    <p class="name">TalkTalk</p>
    <el-tabs class="nav" @tab-click="handleClick">
      <el-tab-pane label="首页" class="navs" ></el-tab-pane>
      <el-tab-pane label="分类" class="navs"></el-tab-pane>
      <el-tab-pane label="工具箱" class="navs"></el-tab-pane>
      <el-tab-pane label="我的" class="navs"></el-tab-pane>
      <el-tab-pane label="设置" class="navs"></el-tab-pane>
      <el-tab-pane label="关于" class="navs"></el-tab-pane>
    </el-tabs>
    <el-input
        v-model="searchValue"
        style="width: 280px;height: 40px"
        placeholder="输入搜索"
        class="search"
        :prefix-icon="Search"
    />
    <el-button type="primary" style="position: relative;bottom: 250%;left: 70%" @click="function(){router.push('/post')}">投稿</el-button>
    <router-link to=''>
      <el-avatar class="avatar" src="/avatar.webp">
      </el-avatar>
    </router-link>
  </el-header>
  <el-container class="content">
    <router-view></router-view>
  </el-container>
</template>

<style scoped>
.header{
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
}

.icon {
  position: relative;
  left: 1%;
  top: 5px;
}

.name {
  position: relative;
  width: 100px;
  left: 5%;
  bottom: 50%;
  font-size: 20px;
}

.nav{
  width: auto;
  position: relative;
  bottom: 120%;
  left: 25%;
}

.el-tabs {
  --el-tabs-header-height: 60px;
}

.el-tab-pane {
  display: none;
}

.navs {
  width: 80px;
  height: 60px;
  font-size: 20px;
  line-height: 60px;
  text-align: center;
  color: #000000;
  margin: 0 10px;
  padding: 0;
  border: none;
  background-color: #ffffff;
}

.search {
  position: relative;
  bottom: 250%;
  left: 55%;
}

.avatar {
  position: relative;
  left: 75%;
  bottom: 230%;
}

/*页面切换*/
.content {
  position: fixed;
  top: 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}
</style>