<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { userApi, uploadApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const userId = ref(localStorage.getItem('id'))
const userInfo = ref({
  name: localStorage.getItem('user') || '',
  avatar: localStorage.getItem('avatar') || '',
  banner: localStorage.getItem('banner') || '',
  desc: localStorage.getItem('desc') || ''
})

const loading = ref(false)
const uploadingAvatar = ref(false)
const uploadingBanner = ref(false)

async function handleUpdateAvatar(e) {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    messageApi.warning('图片大小不能超过 5MB')
    return
  }

  uploadingAvatar.value = true
  try {
    const result = await uploadApi.uploadAvatar(file)
    if (result.success) {
      const avatarUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:1000'}${result.url}`
      const updateResult = await userApi.updateAvatar(userId.value, avatarUrl)
      if (updateResult.success) {
        userInfo.value.avatar = avatarUrl
        localStorage.setItem('avatar', avatarUrl)
        messageApi.success('头像更新成功')
      }
    } else {
      messageApi.error(result.message || '上传失败')
    }
  } catch (error) {
    messageApi.error('上传失败')
  } finally {
    uploadingAvatar.value = false
  }
}

async function handleUpdateBanner(e) {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    messageApi.warning('图片大小不能超过 5MB')
    return
  }

  uploadingBanner.value = true
  try {
    const result = await uploadApi.uploadBanner(file)
    if (result.success) {
      const bannerUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:1000'}${result.url}`
      const updateResult = await userApi.updateBanner(userId.value, bannerUrl)
      if (updateResult.success) {
        userInfo.value.banner = bannerUrl
        localStorage.setItem('banner', bannerUrl)
        messageApi.success('背景更新成功')
      }
    } else {
      messageApi.error(result.message || '上传失败')
    }
  } catch (error) {
    messageApi.error('上传失败')
  } finally {
    uploadingBanner.value = false
  }
}

function logout() {
  localStorage.clear()
  messageApi.success('已退出登录')
  router.push('/login')
}

onMounted(() => {
  if (!userId.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="settings-page">
    <context-holder />

    <div class="settings-container">
      <h2 class="page-title">个人设置</h2>

      <!-- 头像设置 -->
      <a-card class="setting-card" title="头像设置">
        <div class="avatar-section">
          <a-avatar :src="userInfo.avatar" :size="100" class="user-avatar">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div class="avatar-actions">
            <a-upload
              :show-upload-list="false"
              :before-upload="() => false"
              @change="handleUpdateAvatar"
            >
              <a-button :loading="uploadingAvatar">
                <UploadOutlined /> 更换头像
              </a-button>
            </a-upload>
            <p class="tip">支持 JPG、PNG、GIF、WebP 格式，最大 5MB</p>
          </div>
        </div>
      </a-card>

      <!-- 背景设置 -->
      <a-card class="setting-card" title="背景设置">
        <div class="banner-section">
          <div
            class="banner-preview"
            :style="{ backgroundImage: `url(${userInfo.banner})` }"
          >
            <span v-if="!userInfo.banner">暂无背景图</span>
          </div>
          <a-upload
            :show-upload-list="false"
            :before-upload="() => false"
            @change="handleUpdateBanner"
          >
            <a-button :loading="uploadingBanner">
              <UploadOutlined /> 更换背景
            </a-button>
          </a-upload>
        </div>
      </a-card>

      <!-- 账号设置 -->
      <a-card class="setting-card" title="账号信息">
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="用户名">
            <UserOutlined /> {{ userInfo.name }}
          </a-descriptions-item>
          <a-descriptions-item label="个人简介">
            {{ userInfo.desc || '暂无简介' }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <!-- 安全设置 -->
      <a-card class="setting-card" title="安全设置">
        <a-space direction="vertical" style="width: 100%">
          <a-button block>
            <LockOutlined /> 修改密码
          </a-button>
          <a-divider />
          <a-button block danger @click="logout">
            退出登录
          </a-button>
        </a-space>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.settings-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.settings-container {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.setting-card {
  margin-bottom: 20px;
  border-radius: 12px;

  :deep(.ant-card-head) {
    border-radius: 12px 12px 0 0;
  }

  :deep(.ant-card-head-title) {
    font-weight: 600;
  }
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 24px;

  .user-avatar {
    border: 3px solid #f0f0f0;
  }

  .avatar-actions {
    flex: 1;

    .tip {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }
}

.banner-section {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .banner-preview {
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
  }
}

// 响应式
@media (max-width: 768px) {
  .settings-page {
    padding: 20px 12px;
  }

  .avatar-section {
    flex-direction: column;
    text-align: center;
  }
}
</style>