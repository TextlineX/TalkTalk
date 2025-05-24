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
    lb.innerHTML = `<p>${rs.data[i].label}</p>`
    content.appendChild(lb)
  }

  let bk = document.createElement('div')
  bk.className= 'blank'
  content.appendChild(bk)
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
  background-image: url("/background/classify.jpg");
  background-size: cover;
}

.content2 {
  width: 100%;
  padding: 5%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  overflow: hidden;
  flex-wrap: wrap;

  .label {
    width: auto;
    height: 3rem;
    padding: 20px;
    background-color: rgba(231, 231, 231, 0.62);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;
    transition: 400ms;
    transition-delay: 100ms;
    transition-duration: 500ms;
    margin: 1.5rem;
  }

  .label p{
    width: 135%;
    transform: translateY(-15px) translateX(-5%);
    background-color: rgb(255 255 255 / 30%);;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: 400ms;
    transition-delay: 100ms;
    transition-duration: 500ms;
  }

  .label:hover {
    cursor: pointer;
    transform: scale(140%);
  }

  .label p:hover {
    transform: scale(120%);
    backdrop-filter: blur(0);
  }

  .label:nth-child(n) {
    background-color: rgba(170, 0, 255, 0.5);
  }
  .label:nth-child(2n) {
    background-color: rgba(255, 0, 0, 0.5);
  }
  .label:nth-child(3n) {
    background-color: rgba(230, 162, 60, 0.5);
  }
  .label:nth-child(4n) {
    background-color: rgba(64, 158, 255, 0.5);
  }
  .label:nth-child(5n) {
    background-color: rgba(154, 39, 222, 0.5);
  }
  .label:nth-child(6n) {
    background-color: rgba(103, 194, 58, 0.5);
  }
  .label:nth-child(7n) {
    background-color: rgba(245, 108, 108, 0.5);
  }
  .label:nth-child(8n) {
    background-color: rgba(230, 162, 60, 0.5);
  }
  .label:nth-child(9n) {
    background-color: rgba(64, 158, 255, 0.5);
  }

  .label:nth-child(n) p{
    background-color: rgba(153 50 204 /50%);
  }


  .label:nth-child(2n) p{
    background-color: rgba(255 0 0 /50%);
  }

  .label:nth-child(3n) p{
    background-color: rgba(230 162 60 /50%);
  }

  .label:nth-child(4n) p{
    background-color: rgba(64,158,255,0.5);
  }

  .label:nth-child(5n) p{
    background-color: rgba(154,39,222,0.5 );
  }

  .label:nth-child(6n) p{
    background-color: rgba(103,194,58,0.5);
  }

  .label:nth-child(7n) p{
    background-color: rgba(245,108,108,0.5);
  }

  .label:nth-child(8n) p{
    background-color: rgba(230,162,60,0.5);
  }

  .label:nth-child(9n) p{
    background-color: rgba(64,158,255,0.5);
  }

  .blank {
    width: 100%;
    height: 200px;
  }
}
</style>