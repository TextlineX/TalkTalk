<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FileTextOutlined, TeamOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { articleApi, adminApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const stats = ref({
  articles: 0,
  users: 0,
  comments: 0,
  likes: 0
})
const latestArticles = ref([])
const loading = ref(false)

async function fetchStats() {
  try {
    const result = await adminApi.getStatistics()
    if (result.success) {
      stats.value = {
        articles: result.data.articles,
        users: result.data.users,
        comments: result.data.comments,
        likes: result.data.likes
      }
    }
  } catch (error) {
    console.error('获取统计失败:', error)
  }
}

async function fetchLatestArticles() {
  loading.value = true
  try {
    const result = await articleApi.getList({ current: 1, pageSize: 5 })
    if (result.data) {
      latestArticles.value = result.data
    }
  } catch (error) {
    messageApi.error('获取文章失败')
  } finally {
    loading.value = false
  }
}

function goToArticle(id) {
  router.push(`/content?${id}`)
}

function goToNews() {
  router.push('/news')
}

onMounted(() => {
  fetchStats()
  fetchLatestArticles()
})
</script>

<template>
  <div class="home-page">
    <context-holder />

    <!-- Hero 区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到 TalkTalk</h1>
        <p class="hero-desc">一个自由分享、交流思想的社区平台</p>
        <a-space>
          <a-button type="primary" size="large" @click="goToNews">
            浏览文章
          </a-button>
          <a-button size="large" @click="router.push('/post')">
            分享内容
          </a-button>
        </a-space>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stats-container">
        <a-row :gutter="[16, 16]">
          <a-col :xs="12" :sm="6">
            <a-card class="stat-card" hoverable>
              <a-statistic
                :value="stats.articles"
                :value-style="{ color: '#1890ff' }"
              >
                <template #prefix>
                  <FileTextOutlined />
                </template>
                <template #title>文章总数</template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :xs="12" :sm="6">
            <a-card class="stat-card" hoverable>
              <a-statistic
                :value="stats.users"
                :value-style="{ color: '#52c41a' }"
              >
                <template #prefix>
                  <TeamOutlined />
                </template>
                <template #title>用户总数</template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :xs="12" :sm="6">
            <a-card class="stat-card" hoverable>
              <a-statistic
                :value="stats.comments"
                :value-style="{ color: '#faad14' }"
              >
                <template #prefix>
                  <CommentOutlined />
                </template>
                <template #title>评论总数</template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :xs="12" :sm="6">
            <a-card class="stat-card" hoverable>
              <a-statistic
                :value="stats.likes"
                :value-style="{ color: '#f5222d' }"
              >
                <template #prefix>
                  <HeartOutlined />
                </template>
                <template #title>点赞总数</template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

    <!-- 最新文章 -->
    <div class="articles-section">
      <div class="articles-container">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <a-button type="link" @click="goToNews">查看更多</a-button>
        </div>

        <a-spin :spinning="loading">
          <div class="article-list" v-if="latestArticles.length > 0">
            <div
              v-for="article in latestArticles"
              :key="article.id"
              class="article-item"
              @click="goToArticle(article.id)"
            >
              <h4 class="article-title">{{ article.title }}</h4>
              <p class="article-content">{{ article.content }}</p>
              <div class="article-meta">
                <a-tag color="blue">{{ article.label }}</a-tag>
                <span class="article-author">@{{ article.username }}</span>
              </div>
            </div>
          </div>
          <a-empty v-else description="暂无文章" />
        </a-spin>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
}

.hero-desc {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.stats-section {
  padding: 40px 20px;
  margin-top: -40px;
}

.stats-container {
  max-width: 900px;
  margin: 0 auto;
}

.stat-card {
  border-radius: 12px;
  text-align: center;

  :deep(.ant-statistic-title) {
    margin-top: 8px;
    font-size: 14px;
  }
}

.articles-section {
  padding: 40px 20px;
}

.articles-container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
}

.article-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.article-content {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 12px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;

  .article-author {
    font-size: 12px;
    color: #999;
  }
}

// 响应式
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-desc {
    font-size: 16px;
  }
}
</style>