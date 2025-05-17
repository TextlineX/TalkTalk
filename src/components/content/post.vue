<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

let title = ref('');
let content = ref('');
let category = ref('');
let router = useRouter();

let backend_url =import.meta.env.VITE_BACKEND_URL;

if(localStorage.getItem('user') == null){
  alert('请先登录');
  router.push('/login');
}

function post(){
  let date = new Date();
  let time = date.toLocaleString();
  if(title.value == '' || content.value == '' || category.value == ''){
    alert('请填写完整');
  }else {
    fetch(`${backend_url}db`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0'
      },
      body: JSON.stringify({"title":`${title.value}`,"content":`${content.value}`,"category":`${category.value}`,"author":`${localStorage.getItem('user')}`,"time":`${time}`})
    }).then((res,r)=>{
      console.log('开始输出。')
      console.log(res,r);
    });
    alert('提交成功');
    router.push('/news');
  }
}
</script>

<template>
  <el-container style="width: 100%;height: 100vh;display: flex;flex-direction: column;flex-basis: 0;">
    <el-form style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
        <el-input style="width: 20%;margin-top:50px;" placeholder="填写标题" maxlength="30" show-word-limit v-model="title"></el-input>
      <el-input type="textarea" style="width:80%;margin-top:20px;font-size: 20px" :rows="10" v-model="content"></el-input>
      <el-input placeholder="输入分区" style="width: 100px;height: 30px;position: relative;margin-top: 20px" v-model="category"></el-input>
      <el-button style="width: 100px;height: 30px;position: relative;margin-top: 20px" type="primary" @click="post()">提交</el-button>
      <div class="blank"></div>
    </el-form>
  </el-container>
</template>

<style scoped>
.blank {
  width: 100%;
  height: 200px;
}
</style>