<template>
  <div class="container col-xs-12 col-md-8">
    
    <h2>{{ title }}</h2>
    
    <EduForm :class_name="class_name" :id_name="id_name" :value="item" @submit="submit_form" />
  
  </div><!-- end #content .container -->
</template>

<script>
  import EduForm from '~/components/edu/_form'

  export default {
    name: 'EduCreate',

    components: { EduForm },

    head() {
      return {
        title: this.title
      }
    },

    props: {
      class_name_text: {
        type: String,
        default: process.env.site.name
      },

      class_name: {
        type: String,
        default: ''
      },

      id_name: {
        type: String,
        default: ''
      }
    }, // end props

    data() {
      return {
        title: '添加' + this.class_name_text,

        item: {}
      }
    }, // end data

    created() {
      // console.clear()
      if (!this.$store.getters.is_client) this.$router.replace('/dashboard/' + this.$store.getters.auth.app_type)
    },

    methods: {
      submit_form(item) {
        const api_url = this.class_name + '/create'
        const params = {
          ...item,
          ...this.$store.getters.common_params
        }

        return this.$axios
            .$post(api_url, params)
            .then(result => {
              // console.info(result)

              if (result.status === 200) {
                alert('Create OK')

                // 更新本地状态
                item[this.id_name] = result.content.id // 补充主键
                item.user_id = this.$store.getters.user.user_id
                item.time_create = result.timestamp
                this.$store.commit('mine/updateEdu', item)

                this.$router.back()
              } else {
                alert(result.content.error.message)
              }
            })
            .catch(error => {
              console.error(error)
            })
      } // end methods.submit_form
    } // end methods
  }
</script>

<style scoped>

</style>
