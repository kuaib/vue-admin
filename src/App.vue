<template>
  <div id="app">
    <router-view v-if="ifRouterAlive"></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App',
      data() {
        return {
            ifRouterAlive: true
        }
      },
      provide() {
        return {
            reload: this.reload
        }
      },

      methods: {
        reload() {
            this.ifRouterAlive = false;
            this.$nextTick(() => {
                this.ifRouterAlive = true;
            })
        }
      }
  }
</script>
