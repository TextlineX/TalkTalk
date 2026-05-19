<script setup>
import {
  FileTextOutlined,
  TeamOutlined,
  StarOutlined,
  TagsOutlined,
  GithubOutlined
} from '@ant-design/icons-vue'
</script>

<template>
  <div class="about-page">
    <div class="about-container">
      <!-- 头像区域 -->
      <div class="avatar-section">
        <a-avatar :size="120" src="/talktalk.png" />
        <h1 class="site-name">TalkTalk</h1>
        <p class="site-desc">一个自由分享、交流思想的社区平台</p>
      </div>

      <!-- 功能介绍 -->
      <a-card class="feature-card" title="功能特点">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="6">
            <div class="feature-item">
              <div class="feature-icon" style="background: #1890ff">
                <FileTextOutlined />
              </div>
              <h4>文章发布</h4>
              <p>支持发布长文，分享你的见解</p>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <div class="feature-item">
              <div class="feature-icon" style="background: #52c41a">
                <TeamOutlined />
              </div>
              <h4>社区互动</h4>
              <p>评论互动，结识志同道合的朋友</p>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <div class="feature-item">
              <div class="feature-icon" style="background: #faad14">
                <StarOutlined />
              </div>
              <h4>收藏点赞</h4>
              <p>收藏喜欢的内容，支持作者</p>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <div class="feature-item">
              <div class="feature-icon" style="background: #f5222d">
                <TagsOutlined />
              </div>
              <h4>分类标签</h4>
              <p>按分类浏览，快速找到感兴趣的内容</p>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 技术栈 -->
      <a-card class="tech-card" title="技术栈">
        <a-space wrap>
          <a-tag color="blue">Vue 3</a-tag>
          <a-tag color="green">Ant Design Vue</a-tag>
          <a-tag color="orange">Vite</a-tag>
          <a-tag color="purple">Express</a-tag>
          <a-tag color="cyan">PostgreSQL</a-tag>
        </a-space>
      </a-card>

      <!-- 关于作者 -->
      <a-card class="author-card" title="关于作者">
        <div class="author-info">
          <a-avatar :size="64" src="/avatar.webp" />
          <div class="author-detail">
            <h4>Textline</h4>
            <p>热爱技术，专注于 Web 开发</p>
          </div>
        </div>
        <a-divider />
        <a-space>
          <a-button type="primary" ghost href="https://github.com/BLACKSHARKPLAYBT/TalkTalk" target="_blank">
            <GithubOutlined /> GitHub
          </a-button>
        </a-space>
      </a-card>

      <!-- 版权信息 -->
      <div class="copyright">
        <p>Copyright © 2025 TalkTalk</p>
        <p>Created by Textline</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.avatar-section {
  text-align: center;
  padding: 40px 0;
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .site-name {
    font-size: 28px;
    font-weight: 700;
    margin: 16px 0 8px;
    color: #333;
  }

  .site-desc {
    font-size: 16px;
    color: #666;
  }
}

.feature-card,
.tech-card,
.author-card {
  border-radius: 12px;
  margin-bottom: 24px;

  :deep(.ant-card-head) {
    font-weight: 600;
  }
}

.feature-item {
  text-align: center;
  padding: 16px;

  .feature-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 24px;
    color: white;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;

  .author-detail {
    h4 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    p {
      color: #666;
      margin: 0;
    }
  }
}

.copyright {
  text-align: center;
  padding: 24px;
  color: #999;
  font-size: 14px;

  p {
    margin: 4px 0;
  }
}
</style>