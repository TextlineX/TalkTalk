<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'; // 导入 useRouter
const router = useRouter(); // 获取路由实例
const user = ref('')
const password = ref('')
const msg = '未登录'
const backend_url =import.meta.env.VITE_BACKEND_URL;

function login() {
  console.log('登录中。。。')
  async function login() {
    await fetch(`${backend_url}login`, {
      mode:'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0'
      },
      body: JSON.stringify({
        username: user.value,
        password: password.value
      })
    }).then(res =>{
      async function get_Response(){
        let vf = await res.json();
        console.log(vf);
        if(vf.message==='登录成功'){
          localStorage.setItem('user', user.value);
          localStorage.setItem('avatar',vf.avatar);
          router.push('/news');
        }else{
          alert('用户名或密码错误');
        }
      }
      get_Response();
    })
  }
   login();
}
</script>

<template>
  <el-container style="width: 100%;height: 100%">
    <el-form class="form">
      <h1>登录</h1>
      <el-input v-model="user" placeholder="请输入内容"></el-input>
      <h1>密码</h1>
      <el-input v-model="password" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
      <router-link to="/register" style="color: #909399;text-decoration: none;transform: translateX(150px) translateY(8px)">注册</router-link>
    </el-form>
  </el-container>
  <el-aside>
    <el-alert type="error">{{msg}}</el-alert>
  </el-aside>
</template>

<style scoped>
.el-aside {
  position:relative;
  top: 10px;
  right: 20px;
  width: 200px;
  height: 100px;
  float: right;
}

.form {
  position: absolute;
  width: calc(60% - 20px);
  height: 400px;
  top: 20%;
  left: calc(50% - 30%);
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 0;
  box-shadow: 0 0 8px rgba(206, 212, 218,0.8);
}

.el-input {
  width: 40%;
  margin: 20px 0 20px 0;
}

.el-button {
  width: 40%;
  margin: 20px 0 20px 0;
}

</style>