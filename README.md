# TalkTalk

一个基于 Vue3 + Ant Design Vue + Express 的社区论坛平台。

## 技术栈

- **前端**: Vue 3, Vite, Ant Design Vue, Vue Router
- **后端**: Express.js, PostgreSQL (Aiven)
- **功能**: 文章发布、评论互动、点赞收藏、用户管理、文件上传

## 项目结构

```
TalkTalk/          # 前端仓库
├── src/            # Vue 源代码
├── public/         # 静态资源
└── ...

TalkTalk-Backend/  # 后端仓库
├── talktalk.js    # 服务入口
├── database.js    # 数据库操作
└── ...
```

## 快速开始

### 前端

```bash
cd TalkTalk
npm install
npm run dev
```

### 后端

```bash
cd TalkTalk-Backend
npm install
node talktalk.js
```

## 环境变量

前端 `.env.local`:
```
VITE_BACKEND_URL=http://localhost:1000
```

后端 `.env.local`:
```
PG_HOST=your_host
PG_PORT=your_port
PG_USER=your_user
PG_PASSWORD=your_password
PG_DATABASE=your_database
```

## 相关链接

- 个人主页: https://talktalk.textline.top
- 前端 GitHub: https://github.com/TextlineX/TalkTalk
- 后端 GitHub: https://github.com/TextlineX/TalkTalkBackend

---

作者: Textline