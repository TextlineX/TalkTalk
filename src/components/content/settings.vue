<script setup>
import {useRouter} from 'vue-router'
import { ref } from 'vue'
let router = useRouter()
let backend_url = import.meta.env.VITE_BACKEND_URL
let message = ref('')

async function getAdmin(){
  await fetch(`${backend_url}admin`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id : localStorage.getItem('id')
    })
  }).then((res) => {
    async function getDB(res){
      let db = await  res.json()
      if(db.status === 200){
        message.value='管理员登录成功'
      }else{
        message.value='您不是管理员'
      }
    }
    getDB(res)
   })
  }

getAdmin()

</script>

<template>
  <a-layout-content>
    <a-result :status="message === '管理员登录成功' ? 'success' : 'error'" :title="message" />
  </a-layout-content>
</template>

<style scoped>
</style>