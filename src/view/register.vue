<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { userApi } from '/src/api/index.js'

const router = useRouter()
const [messageApi, contextHolder] = message.useMessage()

const loading = ref(false)
const formState = ref({
  username: '',
  password: '',
  confirmPassword: '',
  agree: false
})

// 验证码相关
const captchaText = ref('')
const captchaInput = ref('')
const captchaCanvas = ref(null)

// 生成验证码
function generateCaptcha() {
  const canvas = captchaCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // 生成随机字符
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let text = ''
  for (let i = 0; i < 4; i++) {
    text += chars[Math.floor(Math.random() * chars.length)]
  }
  captchaText.value = text

  // 绘制背景
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // 绘制干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200}, 0.5)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }

  // 绘制字符
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < text.length; i++) {
    const x = (width / 5) * (i + 1)
    const y = height / 2 + (Math.random() - 0.5) * 10
    const angle = (Math.random() - 0.5) * 0.3
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.8)`
    ctx.fillText(text[i], 0, 0)
    ctx.restore()
  }
}

async function handleRegister() {
  if (!formState.value.username.trim()) {
    messageApi.warning('请输入用户名')
    return
  }
  if (formState.value.username.trim().length < 3) {
    messageApi.warning('用户名长度不能少于3位')
    return
  }
  if (!formState.value.password) {
    messageApi.warning('请输入密码')
    return
  }
  if (formState.value.password.length < 6) {
    messageApi.warning('密码长度不能少于6位')
    return
  }
  if (formState.value.password !== formState.value.confirmPassword) {
    messageApi.warning('两次输入的密码不一致')
    return
  }
  if (!captchaInput.value.trim()) {
    messageApi.warning('请输入验证码')
    return
  }
  if (captchaInput.value.toLowerCase() !== captchaText.value.toLowerCase()) {
    messageApi.warning('验证码错误')
    captchaInput.value = ''
    generateCaptcha()
    return
  }

  loading.value = true
  try {
    const result = await userApi.register({
      name: formState.value.username.trim(),
      password: formState.value.password,
      date: new Date().toISOString(),
      sex: '默认',
      description: '这个人很懒，什么都没写',
      avatar: '',
      banner: '',
      phone: '',
      email: ''
    })

    if (result.success) {
      messageApi.success('注册成功！请登录')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } else {
      messageApi.error(result.message || '注册失败')
    }
  } catch (error) {
    messageApi.error('注册失败，请检查网络')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  generateCaptcha()
})
</script>

<template>
  <div class="register-page">
    <context-holder />
    <div class="register-container">
      <a-card class="register-card" :bordered="false">
        <template #title>
          <div class="card-title">
            <a-avatar :size="48" src="/talktalk.png" />
            <span>注册 TalkTalk</span>
          </div>
        </template>

        <a-form
          :model="formState"
          layout="vertical"
          @finish="handleRegister"
        >
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名长度不能少于3位' }
            ]"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="用户名"
              size="large"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            name="confirmPassword"
            :rules="[{ required: true, message: '请确认密码' }]"
          >
            <a-input-password
              v-model:value="formState.confirmPassword"
              placeholder="确认密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item label="验证码">
            <div class="captcha-wrapper">
              <a-input
                v-model:value="captchaInput"
                placeholder="请输入验证码"
                size="large"
                style="flex: 1"
              />
              <canvas
                ref="captchaCanvas"
                width="120"
                height="40"
                class="captcha-canvas"
                @click="generateCaptcha"
              />
              <a-button size="large" @click="generateCaptcha">
                <ReloadOutlined />
              </a-button>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              注册
            </a-button>
          </a-form-item>

          <div class="login-link">
            已有账号？
            <router-link to="/login">立即登录</router-link>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 400px;
}

.register-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  :deep(.ant-card-head) {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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

.login-link {
  text-align: center;
  color: #666;

  a {
    color: #11998e;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

.captcha-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.captcha-canvas {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
}
</style>