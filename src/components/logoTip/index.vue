<template>
    <div class="top-logo clearfix">
        <img src="../../assets/logo.png" alt="">
    </div>
</template>
<script>
    export default ({
        data() {
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .top-logo {
        width: 145px;
        height: 73.98px;
        background: #abc;
        position: fixed;
        top: 0;
        left: 0;
        img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
        }
    }
</style>

<!--
    作用：每个页面的logo和项目名称显示
-->