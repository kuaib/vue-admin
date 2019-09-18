<template>
    <add-and-edit fileType="edit" typeName="champion" :videoId="videoId"></add-and-edit>
</template>

<script>
    import addAndEdit from '../components/addAndEdit'
    export default {
        components: {addAndEdit},
        data() {
            return {
                videoId: this.$route.query.id
            }
        }
    }
</script>
