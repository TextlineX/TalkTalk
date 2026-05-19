<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { articleApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const categories = ref([])
const loading = ref(false)

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

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="classify-page">
    <context-holder />
    <div class="classify-container">
      <h2 class="page-title">文章分类</h2>

      <a-spin :spinning="loading">
        <div class="category-list" v-if="categories.length > 0">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            @click="goToTag(category.label)"
          >
            <a-card class="category-card" hoverable>
              <div class="card-content">
                <span class="category-name">{{ category.label }}</span>
                <span class="category-count">{{ category.count }} 篇</span>
              </div>
            </a-card>
          </div>
        </div>

        <a-empty v-else description="暂无分类" />
      </a-spin>
    </div>
  </div>
</template>

<style lang="less" scoped>
.classify-page {
  min-height: 100vh;
  background-image: url("/background/classify.jpg");
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
}

.classify-container {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
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

// 响应式
@media (max-width: 768px) {
  .classify-page {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .category-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .category-name {
    font-size: 16px;
  }

  .category-count {
    font-size: 12px;
  }
}
</style>