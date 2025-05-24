<script setup>
let orignUrl = decodeURIComponent(window.location.href);
let Tag = orignUrl.split('?')[1];
console.log(Tag)
</script>

<template>
<p>{{ Tag }}</p>
</template>

<style scoped>

</style>