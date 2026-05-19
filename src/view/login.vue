<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { userApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const loading = ref(false)
const user = ref('')
const password = ref('')

async function handleLogin() {
  if (!user.value.trim()) {
    messageApi.warning('请输入用户名')
    return
  }
  if (!password.value) {
    messageApi.warning('请输入密码')
    return
  }

  loading.value = true
  try {
    const result = await userApi.login({
      username: user.value.trim(),
      password: password.value
    })

    if (result.success && result.status === 200) {
      const data = result.data
      localStorage.setItem('user', data.name)
      localStorage.setItem('avatar', data.avatar || '')
      localStorage.setItem('banner', data.banner || '')
      localStorage.setItem('desc', data.description || '')
      localStorage.setItem('time', data.date || '')
      localStorage.setItem('id', data.id)
      messageApi.success('登录成功')
      router.push('/news')
    } else {
      messageApi.error(result.message || '用户名或密码错误')
    }
  } catch (error) {
    messageApi.error('登录失败，请检查网络')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <context-holder />
    <div class="login-container">
      <a-card class="login-card" :bordered="false">
        <template #title>
          <div class="card-title">
            <a-avatar :size="48" src="/talktalk.png" />
            <span>TalkTalk</span>
          </div>
        </template>

        <a-form
          :model="{}"
          layout="vertical"
          @finish="handleLogin"
        >
          <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input
              v-model:value="user"
              placeholder="用户名"
              size="large"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password
              v-model:value="password"
              placeholder="密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              登录
            </a-button>
          </a-form-item>

          <div class="register-link">
            还没有账号？
            <router-link to="/register">立即注册</router-link>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  :deep(.ant-card-head) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;

    .ant-card-head-title {
      padding: 20px 0;
    }
  }

  :deep(.ant-card-body) {
    padding: 32px;
  }
}

.card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: white;

  span {
    font-size: 20px;
    font-weight: 600;
  }
}

.register-link {
  text-align: center;
  color: #666;

  a {
    color: #667eea;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>