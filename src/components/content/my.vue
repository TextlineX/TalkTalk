<script setup>
let name = localStorage.getItem('user')
let banner = localStorage.getItem('banner')
let avatar = localStorage.getItem('avatar')
let desc = localStorage.getItem('desc')

import { useRouter } from "vue-router";
let router = useRouter();

function init(){
  let get_bd = document.querySelector('.up_content');
  get_bd.style.backgroundColor='#262ae0';
  get_bd.style.backgroundImage = `url(${banner})`;
}

function check(){
  if(name == null){
    router.push('/login')
  }
}

check()
</script>

<template>
  <el-container class="outer_content">
    <div class="up_content" :style='{backgroundImage: `url(${banner})`}'>
      <div class="up_me">
        <div class="avatar_box">
          <el-avatar :src="avatar" style="width: 5rem;height: 5rem">
          </el-avatar>
        </div>
        <div class="name">
          <p>{{name}}</p>
        </div>
        <div class="desc_box">
          <p>{{desc}}</p>
        </div>
      </div>
    </div>
    <div class="down_content"></div>
  </el-container>
</template>

<style lang="less" scoped>
.outer_content {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.up_content {
  width: 100%;
  height: 30%;
  background-color: #f0f0f0;

  .up_me {
    width: 90%;
    height: 60%;
    position: relative;
    left: 5%;
    top: 40%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;

    .avatar_box {
      width:20%;
      height: 100%;
      display: inline-flex; 
      justify-content: center;
      align-items: center;
    }

    .name {
      width: 70%;
      height: 40%;
      p {
        font-weight: bold;
        font-size: 1.5rem;
        position: relative;
        left: 5%;
        top: 10%;
        color: white;
      }
    }

    .desc_box {
      width: 70%;
      height: 60%;

      p{
        font-size: 1rem;
        line-height: 1.2rem;
        position: relative;
        color: white;
        left: 5%;
      }
    }
  }
}

.down_content {
  width: 100%;
  height: 70%;
  background-color: #f0f0f0;
}

@media screen and (max-width: 750px) {
  .avatar_box span {
    width: 4rem !important;
    height: 4rem !important;
  }
}
</style>