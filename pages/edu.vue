<template>
  <div id="content">
    <HeaderClass :title="class_name_text" :class_name="class_name" />
    
    <div id="class-title" class="row">
      <nav class="class-nav-top">
        <ul>
          <nuxt-link class="btn btn-outline-secondary" :to="'/' + class_name" exact><i class="fal fa-list" /> 所有</nuxt-link>
          <nuxt-link class="btn btn-outline-secondary" :to="'/' + class_name + '/create'" exact><i class="fal fa-plus" /> 添加</nuxt-link>
        </ul>
      </nav>
    </div>
  
    <nuxt-child
        :class_name_text="class_name_text"
        :class_name="class_name"
        :id_name="id_name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      class_name_text: '教育/培训经历',
      class_name: 'edu',
      id_name: 'edu_id'
    }
  },

  created() {
    if (!this.$store.getters.is_client) this.$router.replace('/dashboard/' + this.$store.getters.auth.app_type)
  },
  
  methods: {
    
  } // end methods
}
</script>

<style scoped>

</style>
