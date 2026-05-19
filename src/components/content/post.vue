<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { InboxOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { articleApi } from '/src/api/index.js';

const router = useRouter();
const [messageApi, contextHolder] = message.useMessage();

// 表单数据
const title = ref('');
const content = ref('');
const category = ref('');
const submitting = ref(false);

// 分类列表
const categories = ref([]);
const categoryOptions = computed(() => [
  { value: '', label: '请选择分类' },
  ...categories.value.map(c => ({ value: c.label, label: c.label }))
]);

// 获取分类列表
async function fetchCategories() {
  try {
    const result = await articleApi.getClassify();
    if (result.success && result.data) {
      categories.value = result.data;
    }
  } catch (error) {
    console.error('获取分类失败:', error);
  }
}

// 提交文章
async function handleSubmit() {
  // 验证
  if (!title.value.trim()) {
    messageApi.warning('请填写标题');
    return;
  }
  if (!content.value.trim()) {
    messageApi.warning('请填写内容');
    return;
  }
  if (!category.value) {
    messageApi.warning('请选择分类');
    return;
  }

  // 检查登录
  const user = localStorage.getItem('user');
  if (!user) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }

  submitting.value = true;
  try {
    const result = await articleApi.publish({
      title: title.value.trim(),
      content: content.value.trim(),
      category: category.value,
      author: user,
      time: new Date().toLocaleString()
    });

    if (result.success) {
      messageApi.success('发布成功！');
      // 清空表单
      title.value = '';
      content.value = '';
      category.value = '';
      // 跳转到文章列表
      setTimeout(() => {
        router.push('/news');
      }, 1000);
    } else {
      messageApi.error(result.message || '发布失败');
    }
  } catch (error) {
    messageApi.error('发布失败，请重试');
  } finally {
    submitting.value = false;
  }
}

// 初始化
onMounted(() => {
  // 检查登录状态
  if (!localStorage.getItem('user')) {
    messageApi.warning('请先登录');
    router.push('/login');
    return;
  }
  fetchCategories();
});
</script>

<template>
  <a-layout-content class="post-page">
    <context-holder />

    <div class="post-container">
      <a-card class="post-card">
        <template #title>
          <span class="card-title">
            <InboxOutlined /> 发布文章
          </span>
        </template>

        <a-form
          :model="{}"
          layout="vertical"
          class="post-form"
        >
          <!-- 标题 -->
          <a-form-item label="文章标题" required>
            <a-input
              v-model:value="title"
              placeholder="请输入文章标题"
              :maxlength="100"
              show-count
              size="large"
            />
          </a-form-item>

          <!-- 分类 -->
          <a-form-item label="文章分类" required>
            <a-select
              v-model:value="category"
              placeholder="请选择分类"
              :options="categoryOptions"
              size="large"
            >
              <template #suffixIcon>
                <DownOutlined />
              </template>
            </a-select>
          </a-form-item>

          <!-- 内容 -->
          <a-form-item label="文章内容" required>
            <a-textarea
              v-model:value="content"
              placeholder="请输入文章内容..."
              :rows="12"
              :maxlength="10000"
              show-count
            />
          </a-form-item>

          <!-- 提示 -->
          <div class="tips">
            <a-typography-paragraph type="secondary">
              <ul>
                <li>标题和内容为必填项</li>
                <li>请选择合适的分类，便于他人阅读</li>
                <li>内容支持富文本格式</li>
              </ul>
            </a-typography-paragraph>
          </div>

          <!-- 提交按钮 -->
          <a-form-item>
            <a-space>
              <a-button
                type="primary"
                size="large"
                :loading="submitting"
                @click="handleSubmit"
              >
                {{ submitting ? '发布中...' : '发布文章' }}
              </a-button>

              <a-button size="large" @click="router.push('/news')">
                取消
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </a-layout-content>
</template>

<style lang="less" scoped>
.post-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 16px;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-card {
  border-radius: 16px;
  overflow: hidden;

  :deep(.ant-card-head) {
    background: #1890ff;
    color: white;

    .ant-card-head-title {
      color: white;
    }
  }

  :deep(.ant-card-body) {
    padding: 24px;
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
}

.post-form {
  :deep(.ant-form-item-label > label) {
    font-weight: 500;
  }

  :deep(.ant-input-textarea-show-count::after) {
    color: #999;
  }
}

.tips {
  margin-bottom: 24px;
  padding: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 8px;

  ul {
    margin: 0;
    padding-left: 20px;
    color: #52c41a;
  }

  li {
    margin-bottom: 4px;
    font-size: 14px;
  }
}

// 响应式
@media (max-width: 768px) {
  .post-page {
    padding: 20px 12px;
  }

  :deep(.ant-card-body) {
    padding: 16px;
  }
}
</style>