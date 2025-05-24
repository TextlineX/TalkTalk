<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import '@waline/client/style';
import '/src/waline.css'

const serverURL = 'https://waline.textline.top';
const path = computed(() => useRoute().path);
const emoji =  [
  'https://gcore.jsdelivr.net/gh/BLACKSHARKPLAYBT/Waline-Emoji@v1.0.4/xiaoheihe',
  'https://gcore.jsdelivr.net/gh/BLACKSHARKPLAYBT/Waline-Emoji@v1.0.4/heniang'
]


let backend_url =import.meta.env.VITE_BACKEND_URL;
function get(){
  let id_link_1 = window.location.href
  let id_link = id_link_1.split('?')[1];
  get_content(id_link)
}

async function get_content(id){
  fetch(`${backend_url}getContent`,{
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }).then((rs)=>{
    async function get2(){
      let data = await rs.json()
      let db =data.data[0]
      console.log(db);
      let title = document.querySelector('.title');
      title.innerHTML = db.title;
      let author = document.querySelector('.content_box .author .name');
      author.innerHTML = db.user
      let tm = db.DATE.split(' ')[0]
      tm = tm.split('/')
      let time = document.querySelector('.content_box .author .time');
      time.innerHTML = `${tm[0]} 年 ${tm[1]} 月 ${tm[2]} 日 `
      let status = document.querySelector('.content_box .author .status');
      status.innerHTML = `点赞数:未知 收藏数:未知 转发数:未知 阅览数:未知`
      let content = document.querySelector('.article-main-content .content-box');
      content.innerHTML = db.content
    }
    get2()
    })
}

get()
</script>

<template>
<el-container style="width: 100%;height: 100vh;display: flex;flex-direction: column">
  <div class="blank"></div>
  <div class="article-up-content">
    <div class="content_box">
      <div class="title"></div>
        <div class="author">
          <div class="avatar">
            <img src="/avatar.webp" alt="加载失败">
          </div>
          <div class="name"></div>
          <div class="time"></div>
          <div class="tag"></div>
          <div class="status"></div>
      </div>
      </div>
    <div class="extra"></div>
  </div>

  <div class="article-main-content">
    <div class="content-box"></div>
  </div>
  <Waline :serverURL="serverURL" :path="path" :emoji="emoji" />
</el-container>
</template>

<style lang="less" scoped>
.blank {
  width: 100%;
  height: 300px;
}

.article-up-content{
  width: 100%;
  height: 200px;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;

  .content_box{
    margin-top: 1%;
    width:80%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .title{
      width: 100%;
      height: 50px;
      text-align: center;
      margin-top: 1%;
      font-size: 30px;
      font-weight: 700;
    }

    .author {
      width: 100%;
      height: 50px;
      display: inline-flex;
      align-items: center;
      margin-left: 30%;
      position: relative;
      .avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        float: left;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        width: fit-content;
        font-size: 15px;
        height: 20px;
        line-height: 18px;
        font-weight: 800;
        color: #1772f6;
        position: relative;
        top: 2%;
      }
      .time {
        width: fit-content;
        margin-left: 20px;
        font-size: 15px;
        color:#6c757d;
        height: 20px;
        line-height: 18px;
        font-weight: lighter;
        position: relative;
        top: 2%;
      }

      .status{
        width: fit-content;
        margin-left: 20px;
        font-size: 14px;
        color:#6c757d;
        height: 20px;
        line-height: 18px;
        font-weight: 100;
        position: relative;
        top: 2%;
      }
    }
  }

  .extra{
    margin-top: 1%;
    margin-left: 2%;
    width: 15%;
    height: 50%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}

.article-main-content {
  width: 100%;
  height: auto;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  margin-top: 1%;

  .content-box{
    width: 80%;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 1%;
    margin-left: 1%;
    padding: 40px;
    font-size: 18px;
    line-height: 1.5;
    color: #333;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    position: relative;
  }
}

//Waline
[data-waline] {
  margin-top: 1%;
  margin-left: 1%;
  width: 80%;
  height: auto;
}


</style>