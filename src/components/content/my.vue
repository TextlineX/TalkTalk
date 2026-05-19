<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { FileTextOutlined, StarOutlined, UserOutlined, SettingOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { userApi, articleApi, collectApi } from '/src/api/index.js';

const router = useRouter();
const [messageApi, contextHolder] = message.useMessage();

// 用户信息
const userInfo = ref({
  name: localStorage.getItem('user') || '游客',
  avatar: localStorage.getItem('avatar') || '',
  banner: localStorage.getItem('banner') || '',
  desc: localStorage.getItem('desc') || '这个人很懒，什么都没写',
});

// 数据
const activeTab = ref('posts');
const myArticles = ref([]);
const myCollects = ref([]);
const loading = ref(false);

// 统计数据
const stats = computed(() => ({
  articles: myArticles.value.length,
  collects: myCollects.value.length,
}));

// 初始化
onMounted(() => {
  // 检查登录状态
  if (!localStorage.getItem('id')) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  fetchMyArticles();
  fetchMyCollects();
});

// 获取我的文章
async function fetchMyArticles() {
  loading.value = true;
  try {
    const username = localStorage.getItem('user');
    const result = await userApi.getArticles(username);
    if (result.success && result.data) {
      myArticles.value = result.data;
    }
  } catch (error) {
    console.error('获取文章失败:', error);
  } finally {
    loading.value = false;
  }
}

// 获取我的收藏
async function fetchMyCollects() {
  const userId = localStorage.getItem('id');
  if (!userId) return;

  try {
    const result = await collectApi.getList(parseInt(userId));
    if (result.success && result.data) {
      myCollects.value = result.data;
    }
  } catch (error) {
    console.error('获取收藏失败:', error);
  }
}

// 跳转到文章
function goToArticle(id) {
  router.push(`/content?${id}`);
}

// 跳转到设置
function goToSettings() {
  router.push('/settings');
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split(' ')[0].split('/');
  if (parts.length >= 3) {
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  }
  return dateStr;
}

// Tab 切换
function onTabChange(key) {
  activeTab.value = key;
}
</script>

<template>
  <a-layout-content class="my-page">
    <context-holder />

    <!-- 用户头部 -->
    <div
      class="user-header"
      :style="{ backgroundImage: `url(${userInfo.banner})` }"
    >
      <div class="header-overlay">
        <div class="user-info">
          <a-avatar :src="userInfo.avatar" :size="80" class="user-avatar">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div class="user-details">
            <h2 class="username">{{ userInfo.name }}</h2>
            <p class="user-desc">{{ userInfo.desc }}</p>
          </div>
          <a-button type="text" class="settings-btn" @click="goToSettings">
            <SettingOutlined /> 设置
          </a-button>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- 统计卡片 -->
      <div class="stats-cards">
        <a-card class="stat-card">
          <a-statistic
            title="发布文章"
            :value="stats.articles"
            :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <FileTextOutlined />
            </template>
          </a-statistic>
        </a-card>

        <a-card class="stat-card">
          <a-statistic
            title="我的收藏"
            :value="stats.collects"
            :value-style="{ color: '#faad14' }"
          >
            <template #prefix>
              <StarOutlined />
            </template>
          </a-statistic>
        </a-card>
      </div>

      <!-- Tab 切换 -->
      <a-tabs v-model:active-key="activeTab" class="content-tabs">
        <!-- 我的文章 -->
        <a-tab-pane key="posts">
          <template #tab>
            <span><FileTextOutlined /> 我的文章 ({{ stats.articles }})</span>
          </template>

          <a-spin :spinning="loading">
            <div class="article-list" v-if="myArticles.length > 0">
              <div
                v-for="article in myArticles"
                :key="article.id"
                class="article-item"
                @click="goToArticle(article.id)"
              >
                <div class="article-info">
                  <h4 class="article-title">{{ article.title }}</h4>
                  <div class="article-meta">
                    <a-tag :color="'blue'">{{ article.label }}</a-tag>
                    <span class="date">{{ formatDate(article.date) }}</span>
                  </div>
                </div>
                <div class="article-stats">
                  <span><EyeOutlined /> {{ article.view_count || 0 }}</span>
                  <span><LikeOutlined /> {{ article.like_count || 0 }}</span>
                </div>
              </div>
            </div>

            <a-empty v-else description="还没有发布过文章">
              <template #extra>
                <a-button type="primary" @click="router.push('/post')">
                  去发布
                </a-button>
              </template>
            </a-empty>
          </a-spin>
        </a-tab-pane>

        <!-- 我的收藏 -->
        <a-tab-pane key="collects">
          <template #tab>
            <span><StarOutlined /> 我的收藏 ({{ stats.collects }})</span>
          </template>

          <div class="article-list" v-if="myCollects.length > 0">
            <div
              v-for="article in myCollects"
              :key="article.id"
              class="article-item"
              @click="goToArticle(article.id)"
            >
              <div class="article-info">
                <h4 class="article-title">{{ article.title }}</h4>
                <div class="article-meta">
                  <a-tag :color="'orange'">{{ article.label }}</a-tag>
                  <span class="author">@{{ article.username }}</span>
                </div>
              </div>
              <div class="article-stats">
                <span><EyeOutlined /> {{ article.view_count || 0 }}</span>
                <span><LikeOutlined /> {{ article.like_count || 0 }}</span>
              </div>
            </div>
          </div>

          <a-empty v-else description="还没有收藏过文章">
            <template #extra>
              <a-button type="primary" @click="router.push('/news')">
                去逛逛
              </a-button>
            </template>
          </a-empty>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-content>
</template>

<style lang="less" scoped>
.my-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.user-header {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;

  .header-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
    display: flex;
    align-items: center;
    padding: 0 24px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }

  .user-avatar {
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .user-details {
    flex: 1;
    color: white;

    .username {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .user-desc {
      font-size: 14px;
      opacity: 0.9;
    }
  }

  .settings-btn {
    color: white;
    &:hover {
      background: rgba(255,255,255,0.1);
    }
  }
}

.content-area {
  max-width: 900px;
  margin: -40px auto 0;
  padding: 0 16px 40px;
  position: relative;
  z-index: 1;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  .stat-card {
    text-align: center;
    border-radius: 12px;
  }
}

.content-tabs {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f0f0f0;
    transform: translateX(4px);
  }

  .article-info {
    flex: 1;
    min-width: 0;

    .article-title {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: #999;
    }
  }

  .article-stats {
    display: flex;
    gap: 16px;
    color: #999;
    font-size: 13px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}

// 响应式
@media (max-width: 768px) {
  .user-header {
    height: 160px;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .article-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>