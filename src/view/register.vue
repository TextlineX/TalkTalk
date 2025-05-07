<script setup>

</script>

<template>
  <el-form class="form">
    <el-form-item>
      <el-input placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">注册</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">返回登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
* {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>