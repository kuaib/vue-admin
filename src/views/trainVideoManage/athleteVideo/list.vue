<!--运动员视频-->
<template>
    <div>
        <!--列表-->
        <list typeName="athlete"></list>
    </div>
</template>

<script>
    import list from '../components/list'
    import mixin from '@/utils/mixins'
    export default {
        mixins: [mixin],
        components: {list},
        data() {
            return {

            }
        }
    }
</script>
