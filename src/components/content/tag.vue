<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { articleApi } from '/src/api/index.js'

const route = useRoute()
const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const tagName = computed(() => {
  const params = route.fullPath.split('?')[1]
  return params ? decodeURIComponent(params) : ''
})

const articles = ref([])
const loading = ref(false)

async function fetchTagArticles() {
  if (!tagName.value) return

  loading.value = true
  try {
    const result = await articleApi.getByTag(tagName.value)
    if (result.success && result.data) {
      articles.value = result.data
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

function goBack() {
  router.back()
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split(' ')[0].split('/')
  if (parts.length >= 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`
  }
  return dateStr
}

onMounted(() => {
  fetchTagArticles()
})
</script>

<template>
  <div class="tag-page">
    <context-holder />

    <!-- 返回按钮 -->
    <div class="back-bar">
      <a-button type="text" @click="goBack">
        <ArrowLeftOutlined /> 返回
      </a-button>
    </div>

    <div class="tag-container">
      <!-- 标签信息 -->
      <div class="tag-header">
        <a-tag color="blue" class="tag-name">{{ tagName }}</a-tag>
        <span class="tag-count">共 {{ articles.length }} 篇文章</span>
      </div>

      <!-- 文章列表 -->
      <a-spin :spinning="loading">
        <div class="article-list" v-if="articles.length > 0">
          <div
            v-for="article in articles"
            :key="article.id"
            class="article-card"
            @click="goToArticle(article.id)"
          >
            <h3 class="article-title">{{ article.title }}</h3>
            <div class="article-content">{{ article.content }}</div>
            <div class="article-meta">
              <a-tag color="blue">{{ article.label }}</a-tag>
              <span class="article-date">{{ formatDate(article.date) }}</span>
            </div>
          </div>
        </div>

        <a-empty v-else description="暂无文章" />
      </a-spin>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.back-bar {
  max-width: 900px;
  margin: 0 auto 16px;

  .ant-btn {
    color: #666;
  }
}

.tag-container {
  max-width: 900px;
  margin: 0 auto;
}

.tag-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .tag-name {
    font-size: 24px;
    padding: 8px 16px;
  }

  .tag-count {
    font-size: 14px;
    color: #999;
  }
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
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
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.article-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
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

  .article-date {
    font-size: 12px;
    color: #999;
  }
}

// 响应式
@media (max-width: 768px) {
  .tag-page {
    padding: 12px;
  }

  .tag-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .tag-name {
      font-size: 20px;
    }
  }

  .article-card {
    padding: 16px;
  }

  .article-title {
    font-size: 16px;
  }
}
</style>