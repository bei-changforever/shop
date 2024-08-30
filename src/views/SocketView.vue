<template>
    <div>
        <van-nav-bar title="客服" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
</template>

<script setup lang="ts">
// import { io } from "socket.io-client";
const onClickLeft = () => history.back();
// const socket = io('http://localhost:3000', {
//   autoConnect: true,   // 自动连接     
// })

// const handleEmit = () => {
//   // 向后台发送信息， response：响应信息
//   socket.emit('chatMessage', 'test-value', (response: any) => {
//     console.log(response, '发送消息，接收发送成功响应信息');
//   });
// }
// // 实时接收后台返回的数据
// socket.on('chat message', function(msg) {
//   console.log('接收消息', msg);
// });

</script>

<style scoped>

</style>