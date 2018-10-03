<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import usersDashboard from './users'

export default {
  name: 'dashboard',
  components: { usersDashboard, adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'usersDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('ROLE_admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
