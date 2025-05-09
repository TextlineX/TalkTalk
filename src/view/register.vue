<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter
import { ref,onMounted } from 'vue'

let router = useRouter(); // 获取路由实例
let ensure = ref('');
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

onMounted(() => {
  // 在组件挂载后隐藏layer
  document.querySelector('.layer').style.display = 'none';
});
</script>

<template>
  <el-form class="form">
    <el-form-item>
      <el-input class="i" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input class="i" placeholder="请输入密码"></el-input>
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
      <el-input v-model:="ensure" class="ensure_input" :maxlength="4"></el-input>
      <el-button class="ensure_btn" :type="'primary'">提交</el-button>
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
  left: 20%;

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