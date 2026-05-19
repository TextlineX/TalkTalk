/**
 * API 统一封装层
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1000';

// 通用请求方法
async function request(url, data = {}, method = 'POST') {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });
    return await response.json();
  } catch (error) {
    console.error(`API 请求失败 [${url}]:`, error);
    return { success: false, message: '网络请求失败' };
  }
}

// ==================== 文章相关 ====================
export const articleApi = {
  getList: (data = {}) => request('/getArticle', { current: 1, pageSize: 20, ...data }),
  getDetail: (id) => request('/getContent', { id }),
  publish: (data) => request('/db', data),
  update: (data) => request('/updateArticle', data),
  delete: (data) => request('/deleteArticle', data),
  search: (keyword) => request('/searchArticle', { keyword }),
  getClassify: () => request('/getClassify', {}, 'GET'),
  getByTag: (tag) => request('/getTagArticle', { tag }),
  addCategory: (name, color) => request('/addCategory', { name, color }),
  deleteCategory: (id) => request('/deleteCategory', { id }),
};

// ==================== 点赞相关 ====================
export const likeApi = {
  toggle: (articleId, userId) => request('/toggleLike', { articleId, userId }),
  check: (articleId, userId) => request('/checkLike', { articleId, userId }),
};

// ==================== 收藏相关 ====================
export const collectApi = {
  toggle: (articleId, userId) => request('/toggleCollect', { articleId, userId }),
  check: (articleId, userId) => request('/checkCollect', { articleId, userId }),
  getList: (userId) => request('/getUserCollects', { userId }),
};

// ==================== 用户相关 ====================
export const userApi = {
  login: (data) => request('/login', data),
  register: (data) => request('/register', data),
  getInfo: (userId) => request('/getUserInfo', { userId }),
  update: (data) => request('/updateUser', data),
  updateAvatar: (userId, avatar) => request('/updateAvatar', { userId, avatar }),
  updateBanner: (userId, banner) => request('/updateBanner', { userId, banner }),
  getArticles: (user) => request('/getUserContent', { user }),
  verifyPassword: (userId, oldPassword) => request('/verifyPassword', { userId, oldPassword }),
  changePassword: (userId, newPassword) => request('/changePassword', { userId, newPassword }),
};

// ==================== 评论相关 ====================
export const commentApi = {
  add: (data) => request('/addComment', data),
  getList: (articleId, current = 1, pageSize = 20) =>
    request('/getComments', { articleId, current, pageSize }),
  delete: (commentId, userId) => request('/deleteComment', { commentId, userId }),
};

// ==================== 文件上传 ====================
export const uploadApi = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return fetch(`${BASE_URL}/upload/avatar`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },

  uploadBanner: (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    return fetch(`${BASE_URL}/upload/banner`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },

  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(`${BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },
};

// ==================== 管理员相关 ====================
export const adminApi = {
  check: (id) => request('/admin', { id }),
  getStatistics: () => request('/getStatistics', {}, 'GET'),
};

export default {
  article: articleApi,
  like: likeApi,
  collect: collectApi,
  user: userApi,
  comment: commentApi,
  upload: uploadApi,
  admin: adminApi,
};