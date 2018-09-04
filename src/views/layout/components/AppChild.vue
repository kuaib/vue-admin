<template>
  <div>
    <!-- <transition name="fade-transform" mode="out-in"> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'AppChild',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<!-- 
  该组件的存在意义：当路由层级>=3的时候用来镶嵌2级路由的
 -->


