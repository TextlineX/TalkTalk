<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowUpOutlined, LikeOutlined, StarOutlined, ShareAltOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { articleApi, likeApi, collectApi } from '/src/api/index.js';

const router = useRouter();
const [messageApi, contextHolder] = message.useMessage();

// 响应式数据
const articles = ref([]);
const current = ref(1);
const total = ref(0);
const loading = ref(false);

// 获取文章列表
async function fetchArticles() {
  loading.value = true;
  try {
    const result = await articleApi.getList({ current: current.value, pageSize: 10 });
    if (result.data) {
      articles.value = result.data;
      total.value = result.total || result.data.length;
    }
  } catch (error) {
    messageApi.error('获取文章失败');
  } finally {
    loading.value = false;
  }
}

// 翻页
function onPageChange(page) {
  current.value = page;
  fetchArticles();
  scrollToTop();
}

// 回到顶部
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 点击文章
function goToArticle(id) {
  router.push(`/content?${id}`);
}

// 点击标签
function goToTag(tag, event) {
  event.stopPropagation();
  router.push(`/tag?${encodeURIComponent(tag)}`);
}

// 点赞
async function handleLike(article, event) {
  event.stopPropagation();
  const userId = localStorage.getItem('id');

  if (!userId) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  try {
    const result = await likeApi.toggle(article.id, parseInt(userId));
    if (result.success) {
      // 更新本地数据
      const index = articles.value.findIndex(a => a.id === article.id);
      if (index !== -1) {
        articles.value[index].liked = result.liked;
        articles.value[index].like_count = result.liked
          ? (articles.value[index].like_count || 0) + 1
          : Math.max(0, (articles.value[index].like_count || 0) - 1);
      }
      messageApi.success(result.message);
    }
  } catch (error) {
    messageApi.error('操作失败');
  }
}

// 收藏
async function handleCollect(article, event) {
  event.stopPropagation();
  const userId = localStorage.getItem('id');

  if (!userId) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  try {
    const result = await collectApi.toggle(article.id, parseInt(userId));
    if (result.success) {
      const index = articles.value.findIndex(a => a.id === article.id);
      if (index !== -1) {
        articles.value[index].collected = result.collected;
        articles.value[index].collect_count = result.collected
          ? (articles.value[index].collect_count || 0) + 1
          : Math.max(0, (articles.value[index].collect_count || 0) - 1);
      }
      messageApi.success(result.message);
    }
  } catch (error) {
    messageApi.error('操作失败');
  }
}

// 分享
function handleShare(article, event) {
  event.stopPropagation();
  const url = `${window.location.origin}/#/content?${article.id}`;
  navigator.clipboard.writeText(url).then(() => {
    messageApi.success('链接已复制到剪贴板');
  }).catch(() => {
    messageApi.info('请手动复制链接');
  });
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

// 初始化
onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <a-layout-content class="content">
    <context-holder />

    <!-- 加载状态 -->
    <a-spin :spinning="loading">
      <div class="article-list">
        <!-- 文章卡片 -->
        <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="goToArticle(article.id)"
        >
          <h2 class="article-title">{{ article.title }}</h2>

          <div class="article-content">{{ article.content }}</div>

          <div class="article-meta">
            <a-tag
              class="article-tag"
              color="blue"
              @click="goToTag(article.label, $event)"
            >
              {{ article.label }}
            </a-tag>

            <span class="article-date">{{ formatDate(article.date) }}</span>

            <span class="article-stats">
              <EyeOutlined /> {{ article.view_count || 0 }}
            </span>
          </div>

          <!-- 操作按钮 -->
          <div class="article-actions" @click.stop>
            <a-button
              type="text"
              :class="{ 'active': article.liked }"
              @click="handleLike(article, $event)"
            >
              <LikeOutlined />
              <span>{{ article.like_count || 0 }}</span>
            </a-button>

            <a-button
              type="text"
              :class="{ 'active': article.collected }"
              @click="handleCollect(article, $event)"
            >
              <StarOutlined />
              <span>{{ article.collect_count || 0 }}</span>
            </a-button>

            <a-button type="text" @click="handleShare(article, $event)">
              <ShareAltOutlined />
              <span>分享</span>
            </a-button>
          </div>
        </div>

        <!-- 空状态 -->
        <a-empty v-if="articles.length === 0 && !loading" description="暂无文章" />
      </div>
    </a-spin>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <a-pagination
        v-model:current="current"
        :total="total"
        :page-size="10"
        show-quick-jumper
        @change="onPageChange"
      />
    </div>

    <!-- 回到顶部 -->
    <a-back-top :visibility-height="300" />
  </a-layout-content>
</template>

<style lang="less" scoped>
.content {
  width: 100%;
  min-height: 100vh;
  background-image: url("/background/news.jpg");
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.article-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
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
  flex-wrap: wrap;
}

.article-tag {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}

.article-date {
  font-size: 12px;
  color: #999;
}

.article-stats {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;

  .ant-btn {
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: #1890ff;
    }

    &.active {
      color: #ff4d4f;
    }

    span {
      font-size: 13px;
    }
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-bottom: 40px;
}

// 响应式
@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .article-card {
    padding: 16px;
  }

  .article-title {
    font-size: 16px;
  }
}
</style>