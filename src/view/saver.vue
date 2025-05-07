<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
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
    <div class="icon-content">
    <el-image class="icon" src="/talktalk.png" fit="cover" style="width: 45px;height: 45px"></el-image>
    <el-link class="name">TalkTalk</el-link>
    </div>
    <div class="nav-content">
    <el-tabs class="nav" @tab-click="handleClick">
      <el-tab-pane label="首页" class="navs" ></el-tab-pane>
      <el-tab-pane label="分类" class="navs"></el-tab-pane>
      <el-tab-pane label="工具箱" class="navs"></el-tab-pane>
      <el-tab-pane label="我的" class="navs"></el-tab-pane>
      <el-tab-pane label="设置" class="navs"></el-tab-pane>
      <el-tab-pane label="关于" class="navs"></el-tab-pane>
    </el-tabs>
    </div>
    <div class="search-content">
    <el-input
        v-model="searchValue"
        placeholder="输入搜索"
        class="search"
        :prefix-icon="Search"
    />
    </div>
    <div class="user-content">
    <el-button class="post-button" type="primary" @click="function(){router.push('/post')}">投稿</el-button>
    <router-link to=''>
      <el-avatar class="avatar" src="/avatar.webp">
      </el-avatar>
    </router-link>
    </div>
  </el-header>
  <el-container class="content">
    <router-view></router-view>
  </el-container>
</template>

<style scoped>
.header{
  height: 60px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  display: inline-flex;
}

.icon-content {
  position: relative;
  width: 20%;
  left: 1%;
  top: 5px;
}

.icon {
  width: auto;
  height: auto;
 }

.name {
  font-size: 100%;
  height: 100%;
  position: relative;
  left: 5%;
  bottom: 25%;
}

.nav-content {
  position: relative;
  width: 30%;
  left: 10%;
}

.nav{
  width: 100%;
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

.search-content {
  position: relative;
  width: 20%;
  left: 10%;
}

.search {
  position: relative;
  top: 20%;
  width: 100%;
  height: 40px;
}

.user-content {
  position: relative;
  width: 30%;
  left: 15%;
}

.post-button {
  position: relative;
  top: 0;
}

.avatar {
  position: relative;
  left: 15%;
  top: 20%;
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

/*移动端适配*/
@media screen and (max-width: 768px) {
  .icon-content {
    width: 20%;
    left: 1%;
  }

  .nav-content {
    display: none;
  }

  .search-content {
    width: 40%;
    left: 10%;
  }

  .user-content {
    display: none;
  }
}
</style>