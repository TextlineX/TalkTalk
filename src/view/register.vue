<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter
import { ref,onMounted } from 'vue'
let backend_url =import.meta.env.VITE_BACKEND_URL;

let router = useRouter(); // 获取路由实例
let ensure = ref('');

let username = ref('');
let password = ref('');

let reu = 'fail';
let qr =''
let iD = ''

function post(){
  if(reu==='fail'){
    document.querySelector('.layer').style.display = 'grid';
    async function get(){
      const back = await fetch('https://v2.xxapi.cn/api/captcha?type=math',{
        mode: 'cors'
      });
      let data = await back.json();
      console.log(data);
      qr = data.data.url;
      iD = data.data.id;
      document.querySelector('.inner img').src=`${qr}`;
    }

    get();
  }else{

  }
}

function vef(){
  async function get_2(){
    const vf = await fetch(`https://v2.xxapi.cn/api/captcha?id=${iD}&key=${ensure.value}`,{
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors'
    });
    let data = await vf.json();
    console.log(data);
    if(data.data==='验证成功'){
      await register_v();
      await router.push('/login');
    }else{
      alert('验证失败');
      post()
    }
  }
  get_2();
}

async function register_v(){
  if (username.value === '' || password.value === '') {
    alert('用户名或密码不能为空');
    return;
  }else if(username.value.length<3){
    alert('用户名长度不能小于3');
    return;
  }else if(password.value.length<6){
    alert('密码长度不能小于6');
  }

  await fetch(`${backend_url}register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0'
    },
    mode: 'cors',
    body: JSON.stringify({
      'name': username.value,
      'password': password.value,
      'date': new Date().toISOString(),
      'sex': '默认',
      'description': ' ',
      'avatar': 'https://img.textline.top/file/1747010554838_avatar.webp',
      'banner': 'https://img.textline.top/file/1740911096111_rg2.jpg',
      'phone': '',
      'email': ''
    })
  }).then((rs) => {
    async function rs_db(){
      let vf = await rs.json();
      if (vf.status==409){
        alert('用户名已存在');
      }
    }
    rs_db();
  })
}

onMounted(() => {
  // 在组件挂载后隐藏layer
  document.querySelector('.layer').style.display = 'none';
});
</script>

<template>
  <el-form class="form">
    <el-form-item>
      <el-input class="i" placeholder="请输入用户名" v-model="username"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input class="i" placeholder="请输入密码" v-model="password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="i" type="primary" @click="post">注册</el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="b" type="info" @click="function(){router.push('/login')}">返回登录</el-button>
    </el-form-item>
  </el-form>
  <div class="layer">
    <div class="inner">
      <p>请输入验证码</p>
      <img alt='验证码加载失败' :src="qr">
      <el-input v-model="ensure" class="ensure_input" :maxlength="4"></el-input>
      <el-button class="ensure_btn" :type="'primary'" @click="vef">提交</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  text-align: center;
}

.form {
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 0;

  .i{
    width: 100%;
    height: 40px;
  }

}

.layer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  .inner {
    width: 50%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(229,229,229,0.9);
    border-radius: 25px;
    p {
      color: white;
      font-size: 30px;
      background-color: #409eff;
    }
    img {
      margin-top: 20px;
      width: 100px;
      height: 40px;
      background-color: #fff;
    }
    .ensure_input {
      margin-top: 20px;
      width: 100px;
      height: 40px;
    }
    .ensure_btn {
      margin-top: 20px;
    }
  }
}
</style>