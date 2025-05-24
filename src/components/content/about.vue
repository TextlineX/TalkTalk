<script setup>

</script>

<template>
  <el-container  style="width: 100%; height: 90%">
    <el-header>
    <p style="text-align: center;margin-top: 20px;font-size: 40px">TalkTalk</p>
      <el-image style="width: 100px;height: 100px;left: calc(50% - 50px)" src="/talktalk.png"></el-image>
    </el-header>
    <el-main class="info" style="text-align: center;margin-top: 80px;font-size: 20px;margin-left: 20px">
      <p>TalkTalk是一个基于Vue3和Element Plus的论坛社区。</p>
      <p>用户可以在这里自由讨论与交流。</p>
      <p>感谢您的使用！</p>
      <el-link href="https://github.com/BLACKSHARKPLAYBT/TalkTalk" :underline='false'>
        <el-image src="/icons/github.png" style="width: 30px;height: 30px;margin-right: 10px"></el-image>
      </el-link>
    </el-main>
    <el-footer class="footer" style="text-align: center">
      <p style="margin-bottom: 5px">Copyright © 2025 TalkTalk</p>
      <p style="">Created by Textline</p>
    </el-footer>
  </el-container>
</template>
<style scoped>
.info p {
  margin-top: 20px;
}

@media screen and (max-width: 750px) {
  .info p {
    font-size: 15px;
  }

  .footer {
    margin-bottom: 20%;
  }
}
</style>