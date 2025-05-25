<script setup>
let backend_url =import.meta.env.VITE_BACKEND_URL;
import {useRouter} from "vue-router";
let router = useRouter();

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
  console.log(rs)

  let content = document.querySelector('.content2')
  let num = rs.data.length
  for(let i = 0; i < num; i++){
    let lb = document.createElement('div')
    lb.className = 'label'
    lb.innerHTML = `<p>${rs.data[i].label}</p>`
    content.appendChild(lb)
    lb.addEventListener('click', function (){
      tag(rs.data[i].label)
    })
  }

  let bk = document.createElement('div')
  bk.className= 'blank'
  content.appendChild(bk)
}

function tag(id){
  router.push(`/tag?${id}`)
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
    background-color: rgba(0, 0, 0, 0.33);;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: 400ms;
    transition-delay: 100ms;
    transition-duration: 500ms;
  }

  .label:hover {
    cursor: pointer;
  }

  .label p:hover {
    transform: scale(110%) translateY(-20px) translateX(-5%);
    backdrop-filter: blur(0);
  }


  .blank {
    width: 100%;
    height: 200px;
  }
}
</style>