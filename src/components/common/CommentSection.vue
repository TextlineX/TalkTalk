<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { commentApi } from '/src/api/index.js';

const props = defineProps({
  articleId: {
    type: [Number, String],
    required: true
  }
});

const [messageApi, contextHolder] = message.useMessage();

const comments = ref([]);
const loading = ref(false);
const submitting = ref(false);
const commentContent = ref('');
const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0
});

// 获取评论列表
async function fetchComments() {
  loading.value = true;
  try {
    const result = await commentApi.getList(
      props.articleId,
      pagination.value.current,
      pagination.value.pageSize
    );
    if (result.success) {
      comments.value = result.data;
      pagination.value.total = result.total;
    }
  } catch (error) {
    messageApi.error('获取评论失败');
  } finally {
    loading.value = false;
  }
}

// 提交评论
async function handleSubmit() {
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('user');

  if (!userId || !userName) {
    messageApi.warning('请先登录');
    return;
  }

  if (!commentContent.value.trim()) {
    messageApi.warning('请输入评论内容');
    return;
  }

  submitting.value = true;
  try {
    const result = await commentApi.add({
      articleId: props.articleId,
      userId: parseInt(userId),
      userName: userName,
      content: commentContent.value
    });

    if (result.success) {
      messageApi.success('评论成功');
      commentContent.value = '';
      fetchComments();
    } else {
      messageApi.error(result.message);
    }
  } catch (error) {
    messageApi.error('评论失败');
  } finally {
    submitting.value = false;
  }
}

// 删除评论
async function handleDelete(comment) {
  const userId = localStorage.getItem('id');

  if (!userId) {
    messageApi.warning('请先登录');
    return;
  }

  if (comment.user_id !== parseInt(userId)) {
    messageApi.warning('只能删除自己的评论');
    return;
  }

  try {
    const result = await commentApi.delete(comment.id, parseInt(userId));
    if (result.success) {
      messageApi.success('删除成功');
      fetchComments();
    } else {
      messageApi.error(result.message);
    }
  } catch (error) {
    messageApi.error('删除失败');
  }
}

// 格式化时间
function formatTime(timeStr) {
  if (!timeStr) return '';
  const date = new Date(timeStr);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

onMounted(() => {
  fetchComments();
});
</script>

<template>
  <div class="comment-section">
    <context-holder />

    <!-- 评论区标题 -->
    <h3 class="comment-title">
      评论
      <span class="comment-count">({{ pagination.total }})</span>
    </h3>

    <!-- 评论输入框 -->
    <div class="comment-input-wrapper">
      <a-textarea
        v-model:value="commentContent"
        placeholder="写下你的评论..."
        :rows="3"
        :maxlength="500"
        show-count
      />
      <a-button
        type="primary"
        :loading="submitting"
        @click="handleSubmit"
        class="submit-btn"
      >
        发布评论
      </a-button>
    </div>

    <!-- 评论列表 -->
    <a-spin :spinning="loading">
      <div class="comment-list" v-if="comments.length > 0">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment-item"
        >
          <a-avatar
            :src="comment.user_avatar"
            size="small"
            class="comment-avatar"
          >
            {{ comment.user_name?.charAt(0) }}
          </a-avatar>

          <div class="comment-body">
            <div class="comment-header">
              <span class="comment-author">{{ comment.user_name }}</span>
              <span class="comment-time">{{ formatTime(comment.created_at) }}</span>
            </div>

            <div class="comment-content">
              {{ comment.content }}
            </div>

            <div class="comment-actions" v-if="comment.user_id === parseInt(localStorage.getItem('id'))">
              <a-button type="text" size="small" danger @click="handleDelete(comment)">
                删除
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <a-empty v-else description="暂无评论，快来抢沙发！" />
    </a-spin>
  </div>
</template>

<style lang="less" scoped>
.comment-section {
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
  margin-top: 16px;
}

.comment-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #1890ff;
  display: inline-block;

  .comment-count {
    font-size: 14px;
    color: #999;
    font-weight: normal;
  }
}

.comment-input-wrapper {
  margin-bottom: 24px;

  .submit-btn {
    margin-top: 12px;
    float: right;
  }
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  word-break: break-word;
}

.comment-actions {
  margin-top: 8px;
}
</style>