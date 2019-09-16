<!--冠军视频-->
<template>
    <div>
        <!--列表-->
        <list typeName="champion"></list>
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
