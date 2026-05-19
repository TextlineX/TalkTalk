<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { articleApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const categories = ref([])
const loading = ref(false)
const addModalVisible = ref(false)
const newCategoryName = ref('')
const newCategoryColor = ref('#1890ff')

async function fetchCategories() {
  loading.value = true
  try {
    const result = await articleApi.getClassify()
    if (result.success && result.data) {
      categories.value = result.data
    }
  } catch (error) {
    messageApi.error('获取分类失败')
  } finally {
    loading.value = false
  }
}

function goToTag(label) {
  router.push(`/tag?${encodeURIComponent(label)}`)
}

async function handleAddCategory() {
  if (!newCategoryName.value.trim()) {
    messageApi.warning('请输入分类名称')
    return
  }

  try {
    const result = await articleApi.addCategory(
      newCategoryName.value.trim(),
      newCategoryColor.value
    )
    if (result.success) {
      messageApi.success('分类添加成功')
      addModalVisible.value = false
      newCategoryName.value = ''
      newCategoryColor.value = '#1890ff'
      fetchCategories()
    } else {
      messageApi.error(result.message || '添加失败')
    }
  } catch (error) {
    messageApi.error('添加失败')
  }
}

async function handleDeleteCategory(id) {
  try {
    const result = await articleApi.deleteCategory(id)
    if (result.success) {
      messageApi.success('删除成功')
      fetchCategories()
    } else {
      messageApi.error(result.message || '删除失败')
    }
  } catch (error) {
    messageApi.error('删除失败')
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="classify-page">
    <context-holder />
    <div class="classify-container">
      <div class="page-header">
        <h2 class="page-title">文章分类</h2>
        <a-button type="primary" @click="addModalVisible = true">
          <PlusOutlined /> 添加分类
        </a-button>
      </div>

      <a-spin :spinning="loading">
        <div class="category-list" v-if="categories.length > 0">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            @click="goToTag(category.name)"
          >
            <a-card class="category-card" hoverable>
              <div class="card-content">
                <a-tag :color="category.isCustom ? category.color : 'blue'">
                  {{ category.isCustom ? '自定义' : '文章' }}
                </a-tag>
                <span class="category-name">{{ category.name }}</span>
                <span class="category-count">{{ category.count || 0 }} 篇</span>
                <a-button
                  v-if="category.isCustom"
                  type="text"
                  danger
                  size="small"
                  @click.stop="handleDeleteCategory(index + 1)"
                >
                  <DeleteOutlined />
                </a-button>
              </div>
            </a-card>
          </div>
        </div>

        <a-empty v-else description="暂无分类" />
      </a-spin>
    </div>

    <!-- 添加分类弹窗 -->
    <a-modal
      v-model:open="addModalVisible"
      title="添加分类"
      ok-text="添加"
      cancel-text="取消"
      @ok="handleAddCategory"
    >
      <a-form layout="vertical">
        <a-form-item label="分类名称">
          <a-input v-model:value="newCategoryName" placeholder="请输入分类名称" />
        </a-form-item>
        <a-form-item label="分类颜色">
          <a-input v-model:value="newCategoryColor" placeholder="如 #1890ff" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.classify-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.classify-container {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.category-item {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.category-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
  position: relative;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.category-count {
  font-size: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .classify-page {
    padding: 20px 12px;
  }

  .page-header {
    flex-direction: column;
    gap: 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .category-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .category-name {
    font-size: 16px;
  }
}
</style>