<script setup>
import { useRouter } from 'vue-router';
let router = useRouter()


let backend_url =import.meta.env.VITE_BACKEND_URL;
async function init(){
  fetch(`${backend_url}getArticle`,{
    method: 'get',
    mode: 'cors'
  }).then(res=> {
    async function get_Response(){
      let vf = await res.json();
      console.log(vf)
      loadA(vf)
    }
    get_Response();
  })
}

function loadA(data){
  console.log(data[0]['title'])
  for(let i=0;i<data.length;i++){
    let wrapper = document.querySelector('.wrapper');
    let box = document.createElement('div');
    box.className = `box data${i}`;
    let date = data[i]['DATE'].split(' ')[0]
    date = date.split('/')
    box.innerHTML = `
         <h1>${data[i]['title']}</h1>
        <div class="desc">${data[i]['content']}</div>
        <div class="tag">${data[i]['label']}</div>
        <div class="time">${date[0]}年${date[1]}月${date[2]}日</div>
        <div class="action">
        <ol class="like">点赞</ol>
        <ol class="collect">收藏</ol>
        <ol class="share">分享</ol>

</div>
    `
    wrapper.appendChild(box)
  }
  let wrapper = document.querySelector('.wrapper')
  let bb = document.createElement('div');
  bb.className = 'news_wrapper';
  wrapper.appendChild(bb)
  for(let i = 0;i < data.length;i++){
    let get_box = document.querySelector(`.data${i}`);
    let get_box_label = document.querySelector(`.data${i} .tag`)
    get_box.addEventListener('click',function(e){
      articleClick(data[i]['id'])
    })
    get_box_label.addEventListener('click',function(e){
      tagClick(data[i]['label'])
      e.stopPropagation()
    })
  }
}

function articleClick(link){
  router.push(`/content?${link}`)
}

function tagClick(tagLink) {
  router.push(`/tag?${tagLink}`)
}

init()
</script>

<template>
  <el-container class="content">
    <el-container class="wrapper">
      <div class="wrapper_01">
      </div>
    </el-container>
  </el-container>
</template>

<style lang="less">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/background/news.jpg");
}

.wrapper_01 {
  width: 100%;
  height: 100px;
  position: relative;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: 0;

  .box {
    width: 90%;
    height: 200px;
    background-color: rgba(222, 222, 222, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    transition: all 0.5s ease-in-out;
    display: grid;
    overflow: hidden;
    white-space: wrap;
    margin-top: 20px;
    cursor: context-menu;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    h1 {
      width: 88%;
      margin: 10px;
      font-size: 20px;
      font-weight: bold;
      position: relative;
      left: 20px;
    }

    .desc {
      margin: 10px 10px 10px 20px;
      width: 99%;
      height: 20px;
      font-size: 15px;
      font-weight: lighter;
      position: relative;
      left: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
      .tag {
        margin: 10px;
        width: fit-content;
        height: 40px;
        font-size: 15px;
        padding: 1%;
        text-align: center;
        border-radius: 25px;
        line-height: 15px;
        font-weight: bold;
        color: rgba(36, 97, 255, 0.86);
        background-color:rgba(156, 181, 255, 0.86);
        position: relative;
        left: 20px;
        top: 50px;
        transition-duration: 300ms;
        transition-delay: 200ms;
        transition-timing-function: ease;
        cursor: pointer;
      }

    .tag:hover {
      background-color: rgba(87, 127, 255, 0.86);
    }

    .time {
      width: auto;
      margin: 10px;
      font-size: 15px;
      position: relative;
      left: 90%;
      top: 10px;
      font-weight: 200;
    }

    .action {
      width: 30%;
      height: 40px;
      position: relative;
      left: 50%;
      bottom: 40px;
      background-color: rgba(231, 231, 231, 0.5);
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in-out;
      display: inline-flex;
      justify-content: space-around;
      align-items: center;

      ol {
        color:#6c757d;
        transition: 200ms ease-in-out;
        cursor: pointer;
      }

      ol:hover {
        color: #007bff;
      }

      ol::before {
        font-family: iconfont,serif;
        margin-right: 5px;
      }

      .like::before {
        content: "\F087";
      }

      .collect::before {
        content: "\2b50";
      }

      .share::before {
        content: "\f08e";
      }
    }
  }
}

.news_wrapper {
  width: 100%;
  height: 100px;
}
</style>