<template>
    <div class="leijun">
        <div class="img-box">
            <van-image src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0f2792dbc1d25a4b0a220e7a9c6b1ce8.jpg" />

            <van-image style="margin-top: 10px;"
                src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/237b2e0f26632763395923a302d054c9.jpeg" />

            <van-image src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/17d86c10ea62d25f10eeec5a8bda325e.jpg" />

        </div>
        <div class="video-box">
            <video controls src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/2db262c0aec1d02f32972dd5ffa4b61d.mp4"></video>
        </div>

        <van-image src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b21b0786369c428c23ab5d99990fcd7.png" />


        <van-image src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/49978d27f809351885986abb6fe117aa.jpg" />

    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.leijun {
    width: 100%;

    .img-box {
        width: 100%;
    }

    .video-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;


        video {
            width: 100%;
            object-fit: fill;
        }
    }
}
</style>