<script setup>
let backend_url =import.meta.env.VITE_BACKEND_URL;
async function getLabel() {
  console.log('getLabel....')
  fetch(`${backend_url}getClassify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res)=>{
    async function resolve(){
      let rs = await res.json();
      generate(rs)
    }
    resolve()
  })
}

function generate(rs){
  console.log('generate....')

  let content = document.querySelector('.content2')
  let num = rs.data.length
  for(let i = 0; i < num; i++){
    let lb = document.createElement('div')
    lb.className = 'label'
    lb.innerHTML = rs.data[i].label
    content.appendChild(lb)
  }
}

getLabel()
</script>

<template>
  <el-container class="cn1">
    <div class="content2">
    </div>
  </el-container>
</template>

<style lang="less">
.cn1 {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.content2 {
  width: 100%;
  height: 100vh;
  padding: 5%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  overflow: hidden;

  .label {
    width: auto;
    height: 2rem;
    transform: scale(120%);
    background-color: #9a27de;
    color: #fff;
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 8px;
    transition: 400ms;
    transition-delay: 100ms;
    transition-duration: 500ms;
    margin: 1.5rem;
  }

  .label:hover {
    background-color: #7b1fa2;
    cursor: pointer;
    transform: scale(140%);
  }

  .label:nth-child(n){
    background-color: #67c23a;
  }


  .label:nth-child(2n){
    background-color: #f56c6c;
  }

  .label:nth-child(3n){
    background-color: #e6a23c;
  }

  .label:nth-child(4n){
    background-color: #409eff;
  }

  .label:nth-child(5n){
    background-color: #9a27de;
  }

  .label:nth-child(6n){
    background-color: #67c23a;
  }

  .label:nth-child(7n){
    background-color: #f56c6c;
  }

  .label:nth-child(8n){
    background-color: #e6a23c;
  }

  .label:nth-child(9n){
    background-color: #409eff;
  }
}
</style>