<template>
  <div class="container col-xs-12 col-md-8">
    
    <EduForm :class_name="class_name" :id_name="id_name" :value="item" @submit="submit_form" />

  </div><!-- end #content .container -->
</template>

<script>
import EduForm from '~/components/edu/_form'

export default {
  name: 'EduEdit',
  
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

  asyncData(context) {
    // console.log(context)
    const api_url = 'edu/detail'
    const params = {
      'id': context.query.id,
      ...context.store.getters.common_params
    }

    return context.app.$axios
      .$post(api_url, params)
      .then(result => {
        // console.log(result)

        if (result.status === 200) {
          return {
            item_id: params.id,
            item: { ...result.content }
          }
        }
      })
      .catch(error => {
        context.error(error)
        console.error(error)
      })
  },

  created() {
    // console.clear()
    if (!this.$store.getters.is_client) this.$router.replace('/dashboard/' + this.$store.getters.auth.app_type)
  },

  methods: {
    // 提交表单
    submit_form(item) {
      if (JSON.stringify(item) === JSON.stringify(this.item)) return alert('未修改任何数据')

      const api_url = this.class_name + '/edit'
      const params = {
        ...item,
        'id': this.item_id,
        ...this.$store.getters.common_params
      }

      return this.$axios
        .$post(api_url, params)
        .then(result => {
          // console.info(result)

          if (result.status === 200) {
            alert('Edit OK')

            // 更新本地状态
            item.time_edit = result.timestamp
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
