<script setup>

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
    box.className = 'box';
    box.innerHTML = `
         <h1>${data[i]['title']}</h1>
        <div class="desc">${data[i]['content']}</div>
        <div class="name">${data[i]['user']}</div>
        <div class="tag">${data[i]['label']}</div>
    `
    wrapper.appendChild(box)
  }
}

init()
</script>

<template>
  <el-container class="content">
    <el-container class="wrapper">
      <div class="wrapper_01"></div>
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
    width: 500px;
    height: 200px;
    background-color: rgba(222, 222, 222, 0.93);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    display: grid;
    overflow: hidden;
    white-space: wrap;
    margin-top: 20px;

    h1 {
      width: 88%;
      margin: 10px;
      font-size: 20px;
      font-weight: bold;
      position: relative;
      left: 20px;
    }

    .desc {
      margin: 10px;
      width: 99%;
      font-size: 15px;
      position: relative;
      left: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
      .name {
        width: 50%;
        margin: 10px;
        font-size: 15px;
        position: relative;
        left: 20px;
      }

      .tag {
        margin: 10px;
        width: 20%;
        height: 40px;
        font-size: 15px;
        text-align: center;
        border-radius: 25px;
        line-height: 40px;
        color: #ffffff;
        background-color: #2c2cff;
        position: relative;
        left: 20px;
        bottom: 0;
      }
  }
    .box:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px
    }
}

/*首页文章展示*/

</style>