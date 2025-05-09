<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Move from '/src/components/content/Move.vue'
let router = useRouter();
let searchValue = ref('')

/*路由切换*/
function init() {
  router.push('/news');
}

function handleClick(tab,event) {
  console.log('切换路由到:', event.target.id);
  switch (event.target.id) {
    case 'tab-0':
      router.push('/news');
      break;
    case 'tab-1':
      router.push('/classify');
      break;
    case 'tab-2':
      router.push('/toolbox');
      break;
    case 'tab-3':
      router.push('/my');
      break;
    case 'tab-4':
      router.push('/settings');
      break;
    case 'tab-5':
      router.push('/about');
      break;
  }
}

function mobile(e){
  let dd = e.currentTarget.id;
  document.querySelector(`#${dd}`).classList.add('class','vm_click');
  for(let i = 0; i < 5; i++){
    if(`t${i}` != dd){
      document.querySelector(`#t${i}`).classList.remove('vm_click');
    }
    switch(dd){
      case 't0':
        router.push('/news');
        break;
      case 't1':
        router.push('/classify');
        break;
      case 't2':
        router.push('/post');
        break;
      case 't3':
        router.push('/about');
        break;
      case 't4':
          router.push('/my');
        break;
    }
  }
}

init()
window.onload = function () {
  document.querySelector('#t0').classList.add('vm_click');
}
</script>

<template>
  <el-header class="header">
    <div class="icon-content">
    <el-image class="icon" src="/talktalk.png" fit="cover" style="width: 45px;height: 45px"></el-image>
    <el-link class="name" href="/">TalkTalk</el-link>
    </div>
    <div class="nav-content">
    <el-tabs class="nav" @tab-click="handleClick">
      <el-tab-pane label="首页" class="navs" ></el-tab-pane>
      <el-tab-pane label="分类" class="navs"></el-tab-pane>
      <el-tab-pane label="工具箱" class="navs"></el-tab-pane>
      <el-tab-pane label="我的" class="navs"></el-tab-pane>
      <el-tab-pane label="设置" class="navs"></el-tab-pane>
      <el-tab-pane label="关于" class="navs"></el-tab-pane>
    </el-tabs>
    </div>
    <div class="search-content">
    <el-input
        v-model="searchValue"
        placeholder="输入搜索"
        class="search"
        :prefix-icon="Search"
    />
    </div>
    <div class="user-content">
    <el-button class="post-button" type="primary" @click="function(){router.push('/post')}">投稿</el-button>
    <router-link to=''>
      <el-avatar class="avatar" src="/avatar.webp">
      </el-avatar>
    </router-link>
    </div>
  </el-header>
  <el-container class="content">
    <router-view></router-view>
  </el-container>
  <div class="mv_view">
    <div class="mv_layer" id="t0" @click="mobile">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
        <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
      </svg>
      首页
    </div>
    <div class="mv_layer" id="t1" @click="mobile">
      <svg t="1746705423396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2613" width="32" height="32"><path d="M256 234.666667h128a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-21.333333 21.333333H256a21.333333 21.333333 0 0 1-21.333333-21.333333V256a21.333333 21.333333 0 0 1 21.333333-21.333333zM170.666667 256a85.333333 85.333333 0 0 1 85.333333-85.333333h128a85.333333 85.333333 0 0 1 85.333333 85.333333v128a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333V256z m469.333333-21.333333h128a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-21.333333 21.333333h-128a21.333333 21.333333 0 0 1-21.333333-21.333333V256a21.333333 21.333333 0 0 1 21.333333-21.333333zM554.666667 256a85.333333 85.333333 0 0 1 85.333333-85.333333h128a85.333333 85.333333 0 0 1 85.333333 85.333333v128a85.333333 85.333333 0 0 1-85.333333 85.333333h-128a85.333333 85.333333 0 0 1-85.333333-85.333333V256z m213.333333 362.666667h-128a21.333333 21.333333 0 0 0-21.333333 21.333333v128a21.333333 21.333333 0 0 0 21.333333 21.333333h128a21.333333 21.333333 0 0 0 21.333333-21.333333v-128a21.333333 21.333333 0 0 0-21.333333-21.333333zM640 554.666667a85.333333 85.333333 0 0 0-85.333333 85.333333v128a85.333333 85.333333 0 0 0 85.333333 85.333333h128a85.333333 85.333333 0 0 0 85.333333-85.333333v-128a85.333333 85.333333 0 0 0-85.333333-85.333333h-128z m-384 64h128a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-21.333333 21.333333H256a21.333333 21.333333 0 0 1-21.333333-21.333333v-128a21.333333 21.333333 0 0 1 21.333333-21.333333zM170.666667 640a85.333333 85.333333 0 0 1 85.333333-85.333333h128a85.333333 85.333333 0 0 1 85.333333 85.333333v128a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-128z" fill="#1E1E1E" p-id="2614"></path></svg>
      分类
    </div>
    <div class="mv_layer" id="t2" @click="mobile">
      <svg t="1746705740816" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3595" width="32" height="32"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m256 537.6h-230.4v230.4c0 15.36-10.24 25.6-25.6 25.6s-25.6-10.24-25.6-25.6v-230.4h-230.4c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h230.4v-230.4c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v230.4h230.4c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6z" fill="#231815" p-id="3596"></path></svg>
      投稿
    </div>
    <div class="mv_layer" id="t3" @click="mobile">
      <svg t="1746705922337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7355" width="32" height="32"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m62.464 774.144c0 27.648-22.528 50.176-50.176 50.176h-25.088c-27.648 0-50.176-22.528-50.176-50.176V474.624c0-27.648 22.528-50.176 50.176-50.176h25.088c27.648 0 50.176 22.528 50.176 50.176v299.52zM512 349.696c-34.304 0-62.464-28.16-62.464-62.464 0-34.304 28.16-62.464 62.464-62.464s62.464 28.16 62.464 62.464c0 34.304-28.16 62.464-62.464 62.464z" fill="#040000" p-id="7356"></path></svg>
      关于
    </div>
    <div class="mv_layer" id="t4" @click="mobile">
      <svg t="1746705859929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6300" width="32" height="32"><path d="M509.115811 960.595948c-248.787226 0-450.465528-201.692628-450.465528-450.478831 0-248.787226 201.678302-450.479855 450.465528-450.479855 248.787226 0 450.465528 201.692628 450.465528 450.479855C959.58134 758.90332 757.903038 960.595948 509.115811 960.595948zM593.475128 525.33061c32.440853-22.177092 53.792137-59.735499 53.792137-102.383832 0-51.653427-31.475875-96.062869-76.207659-115.276467-0.532119-0.224104-1.047866-0.390903-1.566682-0.615007-6.891967-2.852978-14.080693-5.117554-21.533432-6.684236-0.824785-0.195451-1.606591-0.306992-2.432399-0.475837-7.662517-1.481747-15.536858-2.376117-23.617907-2.376117-0.124843 0-0.224104 0-0.348947 0-69.062935 0.11154-124.46371 56.351426-124.46371 124.561947 0 42.675962 21.337981 80.20674 53.79316 102.383832-73.439616 29.02915-124.659161 99.838869-124.659161 182.619224l34.999119 0c0-81.912591 62.336744-150.178371 141.732002-159.575392 0.853437 0 22.204721-1.704828 40.132022 0l1.705851 0c77.704756 11.102872 137.467885 77.663824 137.467885 158.709675l35.867906 0C717.267549 624.302739 666.048003 553.49302 593.475128 525.33061zM521.75569 515.934612c-2.530636 0-4.907777-0.531096-7.397481-0.727571-1.523703 0.168846-2.530636 0.224104-2.530636 0.224104-1.859347-0.167822-3.427052-0.726547-5.202489-1.006933-2.334161-0.36225-4.641717-0.782829-6.907317-1.314948-4.124947-0.979304-7.970532-2.180666-11.648294-3.607154-1.579985-0.586354-3.15997-1.146103-4.684696-1.845021-3.984754-1.790786-7.620561-3.802606-11.018961-5.956665-1.342578-0.810459-2.769067-1.538029-4.082992-2.433422-4.208858-2.964518-7.816013-6.040576-11.032264-9.089006-1.454118-1.370207-2.811022-2.824325-4.166903-4.278443-4.013407-4.307096-6.992251-8.025791-8.949836-10.851139-0.181125-0.280386-0.363274-0.531096-0.545422-0.811482-1.538029-2.293229-2.572592-3.971451-2.572592-3.971451 0.308015 0.335644 0.601704 0.559748 0.909719 0.895393-8.795317-14.290471-14.09502-30.986735-14.09502-49.079812 0-18.542308 5.495154-35.685757 14.696724-50.200332 9.480932-12.248975 67.594491-79.815837 140.082432 1.985214 0 0-21.632693-39.34817-68.992327-44.830021 2.712785-0.252757 5.341658-0.811482 8.137331-0.811482 52.072983 0 93.910856 41.809221 93.910856 93.855598C615.667569 474.124368 573.828672 515.934612 521.75569 515.934612z" fill="#2c2c2c" p-id="6301"></path></svg>
      我的
    </div>
  </div>
  <Move />
</template>

<style lang="less" scoped>
.header{
  height: 60px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  display: inline-flex;
}

.icon-content {
  position: relative;
  width: 20%;
  left: 1%;
  top: 5px;
}

.icon {
  width: auto;
  height: auto;
 }

.name {
  font-size: 100%;
  height: 100%;
  position: relative;
  left: 5%;
  bottom: 25%;
}

.nav-content {
  position: relative;
  width: 30%;
  left: 10%;
}

.nav{
  width: 100%;
}

.el-tabs {
  --el-tabs-header-height: 60px;
}

.el-tab-pane {
  display: none;
}

.navs {
  width: 80px;
  height: 60px;
  font-size: 20px;
  line-height: 60px;
  text-align: center;
  color: #000000;
  margin: 0 10px;
  padding: 0;
  border: none;
  background-color: #ffffff;
}

.search-content {
  position: relative;
  width: 20%;
  left: 10%;
}

.search {
  position: relative;
  top: 20%;
  width: 100%;
  height: 40px;
}

.user-content {
  position: relative;
  width: 30%;
  left: 15%;
}

.post-button {
  position: relative;
  bottom: 8%;
}

.avatar {
  position: relative;
  left: 15%;
  top: 20%;
}

/*页面切换*/
.content {
  position: fixed;
  top: 60px;
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  z-index: 0;
}

.mv_view {
  display:none;
}

/*移动端适配*/
@media screen and (max-width: 768px) {
  .icon-content {
    width: 20%;
    left: 1%;
  }

.name {
  display: none;
}

  .nav-content {
    display: none;
  }

  .search-content {
    width: 70%;
    left: 10%;
  }

  .search div{
    border-radius: 50%;
  }

  .user-content {
    display: none;
  }

  .mv_view {
    width: 100%;
    height: 10%;
    display: inline-flex;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: rgba(225,225,225,0.5);
  }

  .mv_layer {
    width: 20%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      width:30px;
      height: 30px;
      path {
        fill: #dee2e6;
      }
    }
  }

  .mv_layer.vm_click {
    width: 20%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      width: 30px;
      height: 30px;
    }
      path {
        fill: #000000;
      }
    }
}
</style>