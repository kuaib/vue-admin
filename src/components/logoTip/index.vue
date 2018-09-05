<template>
    <div class="top-logo clearfix">
        <div class="left">
            <img src="http://t2.hddhhn.com/uploads/tu/201707/200/8.jpg" alt="">
            <span>擎动科技</span>
        </div>
        <div class="right">
            <slot></slot>
        </div>
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
        img {
            width: 100px;
            height: 60px;
            vertical-align: middle;
        }
        .left {
            float: left;
            span {
                color: #409EFF;
                font-size: 30px;
                font-weight: 700;
            }
        }
        .right {
            float: right;
        }
    }
</style>

<!--
    作用：每个页面的logo和项目名称显示
-->