<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SearchOutlined, HomeOutlined, FileTextOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const [messageApi, contextHolder] = message.useMessage()

const searchValue = ref('')
const userAvatar = ref(localStorage.getItem('avatar') || '/avatar.webp')
const userName = ref(localStorage.getItem('user') || '')
const userDesc = ref(localStorage.getItem('desc') || '')
const drawerVisible = ref(false)

// 导航到页面
function goTo(path) {
  router.push(path)
}

// 打开用户抽屉
function openDrawer() {
  drawerVisible.value = true
}

// 退出登录
function logout() {
  localStorage.clear()
  messageApi.success('已退出登录')
  drawerVisible.value = false
  router.push('/login')
}

// 搜索
function handleSearch() {
  if (searchValue.value.trim()) {
    // TODO: 实现搜索功能
    messageApi.info('搜索功能开发中')
  }
}

// 初始化
onMounted(() => {
  const storedAvatar = localStorage.getItem('avatar')
  const storedUser = localStorage.getItem('user')
  const storedDesc = localStorage.getItem('desc')
  if (storedAvatar) userAvatar.value = storedAvatar
  if (storedUser) userName.value = storedUser
  if (storedDesc) userDesc.value = storedDesc
})
</script>

<template>
  <a-layout class="app-layout">
    <context-holder />

    <!-- 顶部导航 -->
    <a-header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo-section" @click="goTo('/')">
          <a-avatar :src="'/talktalk.png'" :size="40" />
          <span class="logo-text">TalkTalk</span>
        </div>

        <!-- 导航菜单 -->
        <div class="nav-section">
          <a-menu
            mode="horizontal"
            :selected-keys="[route.path]"
            @click="({ key }) => goTo(key)"
          >
            <a-menu-item key="/">
              <span>首页</span>
            </a-menu-item>
            <a-menu-item key="/news">
              <span>文章</span>
            </a-menu-item>
            <a-menu-item key="/classify">
              <span>分类</span>
            </a-menu-item>
            <a-menu-item key="/my">
              <span>我的</span>
            </a-menu-item>
            <a-menu-item key="/about">
              <span>关于</span>
            </a-menu-item>
          </a-menu>
        </div>

        <!-- 搜索 -->
        <div class="search-section">
          <a-input-search
            v-model:value="searchValue"
            placeholder="搜索文章..."
            style="width: 200px"
            @search="handleSearch"
          />
        </div>

        <!-- 用户区域 -->
        <div class="user-section">
          <a-button type="primary" @click="goTo('/post')">
            投稿
          </a-button>
          <a-avatar
            :src="userAvatar"
            :size="36"
            class="user-avatar"
            @click="openDrawer"
          />
        </div>
      </div>
    </a-header>

    <!-- 主内容区 -->
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>

    <!-- 用户抽屉 -->
    <a-drawer
      v-model:open="drawerVisible"
      title="个人中心"
      placement="right"
      width="300"
    >
      <template #extra>
        <a-space>
          <a-button size="small" @click="goTo('/settings')">设置</a-button>
        </a-space>
      </template>

      <div class="drawer-user-info">
        <a-avatar :src="userAvatar" :size="64" />
        <p class="username">{{ userName || '未登录' }}</p>
        <p class="user-desc">{{ userDesc || '' }}</p>
      </div>

      <a-divider />

      <a-space direction="vertical" style="width: 100%">
        <a-button block @click="goTo('/my')">我的文章</a-button>
        <a-button block @click="goTo('/settings')">账号设置</a-button>
        <a-divider />
        <a-button block danger @click="logout">退出登录</a-button>
      </a-space>
    </a-drawer>

    <!-- 移动端底部导航 -->
    <div class="mobile-nav">
      <div
        class="nav-item"
        :class="{ active: route.path === '/' }"
        @click="goTo('/')"
      >
        <HomeOutlined />
        <span>首页</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: route.path === '/news' }"
        @click="goTo('/news')"
      >
        <FileTextOutlined />
        <span>文章</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: route.path === '/post' }"
        @click="goTo('/post')"
      >
        <PlusCircleOutlined />
        <span>投稿</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: route.path === '/my' }"
        @click="goTo('/my')"
      >
        <UserOutlined />
        <span>我的</span>
      </div>
    </div>
  </a-layout>
</template>

<style lang="less" scoped>
.app-layout {
  min-height: 100vh;
}

.header {
  background: white;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  gap: 24px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;

  .logo-text {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
}

.nav-section {
  flex: 1;

  :deep(.ant-menu-horizontal) {
    border: none;
    line-height: 60px;
  }
}

.search-section {
  flex-shrink: 0;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  .user-avatar {
    cursor: pointer;
  }
}

.main-content {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  padding-bottom: 60px;
}

.drawer-user-info {
  text-align: center;
  padding: 16px 0;

  .username {
    font-size: 18px;
    font-weight: 600;
    margin: 12px 0 4px;
  }

  .user-desc {
    color: #999;
    font-size: 14px;
    margin: 0;
  }
}

// 移动端底部导航
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  z-index: 100;
  padding: 8px 0;
  padding-bottom: env(safe-area-inset-bottom);

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    color: #999;
    font-size: 12px;
    transition: color 0.3s;

    &.active {
      color: #1890ff;
    }

    :deep(.anticon) {
      font-size: 20px;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 12px;
  }

  .nav-section,
  .search-section {
    display: none;
  }

  .mobile-nav {
    display: flex;
  }

  .main-content {
    margin-top: 64px;
    padding-bottom: 80px;
  }
}
</style>