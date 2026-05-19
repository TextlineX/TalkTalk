<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LikeOutlined, StarOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { articleApi, likeApi, collectApi } from '/src/api/index.js';
import CommentSection from '/src/components/common/CommentSection.vue';

const route = useRoute();
const router = useRouter();
const [messageApi, contextHolder] = message.useMessage();

// 文章数据
const article = ref(null);
const loading = ref(false);
const liked = ref(false);
const collected = ref(false);
const currentUserId = ref(localStorage.getItem('id') || '');

// 获取文章详情
async function fetchArticle() {
  const id = route.fullPath.split('?')[1] || route.params.id;
  if (!id) {
    messageApi.error('文章ID不存在');
    return;
  }

  loading.value = true;
  try {
    const result = await articleApi.getDetail(id);
    if (result.success && result.data && result.data[0]) {
      article.value = result.data[0];

      if (currentUserId.value && article.value) {
        checkLikeStatus();
        checkCollectStatus();
      }
    } else {
      messageApi.error('文章不存在');
    }
  } catch (error) {
    messageApi.error('获取文章失败');
  } finally {
    loading.value = false;
  }
}

// 检查点赞状态
async function checkLikeStatus() {
  if (!currentUserId.value || !article.value) return;

  const result = await likeApi.check(article.value.id, parseInt(currentUserId.value));
  if (result.success) {
    liked.value = result.liked;
  }
}

// 检查收藏状态
async function checkCollectStatus() {
  if (!currentUserId.value || !article.value) return;

  const result = await collectApi.check(article.value.id, parseInt(currentUserId.value));
  if (result.success) {
    collected.value = result.collected;
  }
}

// 点赞
async function handleLike() {
  if (!currentUserId.value) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  try {
    const result = await likeApi.toggle(article.value.id, parseInt(currentUserId.value));
    if (result.success) {
      liked.value = result.liked;
      article.value.like_count = result.liked
        ? (article.value.like_count || 0) + 1
        : Math.max(0, (article.value.like_count || 0) - 1);
      messageApi.success(result.message);
    }
  } catch (error) {
    messageApi.error('操作失败');
  }
}

// 收藏
async function handleCollect() {
  if (!currentUserId.value) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  try {
    const result = await collectApi.toggle(article.value.id, parseInt(currentUserId.value));
    if (result.success) {
      collected.value = result.collected;
      article.value.collect_count = result.collected
        ? (article.value.collect_count || 0) + 1
        : Math.max(0, (article.value.collect_count || 0) - 1);
      messageApi.success(result.message);
    }
  } catch (error) {
    messageApi.error('操作失败');
  }
}

// 返回
function goBack() {
  router.back();
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split(' ')[0].split('/');
  if (parts.length >= 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`;
  }
  return dateStr;
}

onMounted(() => {
  fetchArticle();
});
</script>

<template>
  <a-layout class="article-page">
    <context-holder />

    <!-- 返回按钮 -->
    <div class="back-bar">
      <a-button type="text" @click="goBack">
        <ArrowLeftOutlined /> 返回
      </a-button>
    </div>

    <a-spin :spinning="loading">
      <!-- 文章内容 -->
      <div class="article-container" v-if="article">
        <!-- 文章头部 -->
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-author">
            <a-avatar :src="article.user_avatar" size="small">
              {{ article.username?.charAt(0) }}
            </a-avatar>
            <span class="author-name">{{ article.username }}</span>
            <span class="article-date">{{ formatDate(article.date) }}</span>
          </div>

          <div class="article-tags">
            <a-tag color="blue">{{ article.label }}</a-tag>
          </div>

          <!-- 统计数据 -->
          <div class="article-stats">
            <span><EyeOutlined /> 阅读 {{ article.view_count || 0 }}</span>
            <span><LikeOutlined /> 点赞 {{ article.like_count || 0 }}</span>
            <span><StarOutlined /> 收藏 {{ article.collect_count || 0 }}</span>
          </div>
        </div>

        <!-- 文章正文 -->
        <div class="article-content" v-html="article.content"></div>

        <!-- 操作栏 -->
        <div class="article-actions">
          <a-button
            type="primary"
            size="large"
            :class="{ 'active': liked }"
            @click="handleLike"
          >
            <LikeOutlined :style="{ color: liked ? '#ff4d4f' : 'inherit' }" />
            {{ liked ? '已点赞' : '点赞' }}
          </a-button>

          <a-button
            type="primary"
            size="large"
            :class="{ 'active': collected }"
            @click="handleCollect"
          >
            <StarOutlined :style="{ color: collected ? '#faad14' : 'inherit' }" />
            {{ collected ? '已收藏' : '收藏' }}
          </a-button>
        </div>

        <!-- 评论区 -->
        <div class="article-comments" v-if="article">
          <CommentSection :article-id="article.id" />
        </div>
      </div>

      <!-- 空状态 -->
      <a-result v-else-if="!loading" status="404" title="文章不存在" sub-title="抱歉，找不到这篇文章">
        <template #extra>
          <a-button type="primary" @click="goBack">返回</a-button>
        </template>
      </a-result>
    </a-spin>
  </a-layout>
</template>

<style lang="less" scoped>
.article-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.back-bar {
  max-width: 900px;
  margin: 0 auto 16px;

  .ant-btn {
    color: #666;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

.article-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.article-header {
  padding: 32px 32px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.article-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  line-height: 1.4;
  margin-bottom: 16px;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  .author-name {
    font-weight: 500;
    color: #333;
  }

  .article-date {
    color: #999;
    font-size: 14px;
  }
}

.article-tags {
  margin-bottom: 12px;
}

.article-stats {
  display: flex;
  gap: 24px;
  color: #666;
  font-size: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}

.article-content {
  padding: 32px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(img) {
    max-width: 100%;
    border-radius: 8px;
  }

  :deep(pre) {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
  }

  :deep(code) {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
}

.article-actions {
  padding: 24px 32px;
  display: flex;
  gap: 16px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;

  .ant-btn {
    min-width: 120px;

    &.active {
      background: #fff3e6;
      border-color: #faad14;
      color: #faad14;
    }
  }
}

.article-comments {
  padding: 24px 32px 32px;
}

// 响应式
@media (max-width: 768px) {
  .article-page {
    padding: 12px;
  }

  .article-header {
    padding: 20px;
  }

  .article-title {
    font-size: 22px;
  }

  .article-content {
    padding: 20px;
  }

  .article-actions {
    padding: 16px;
  }
}
</style>