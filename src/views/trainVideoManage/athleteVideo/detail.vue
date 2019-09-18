<template>
    <detail fileType="detail" typeName="athlete" :videoId="videoId"></detail>
</template>

<script>
    import detail from '../components/detail'
    export default {
        components: {detail},
        data() {
            return {
                videoId: this.$route.query.id
            }
        }
    }
</script>
