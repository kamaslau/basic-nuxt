<template>
  <div class="container col-xs-12 col-md-8">
    
    <div v-if="items.length === 0" class="alert alert-info">
      <p>这里空空如也</p>
    </div>
    
    <!-- 数据列表 -->
    <div v-else class="items-list">
      <EduList :items="items" />
    </div>
    
    <!-- 操作列表 -->
    <nav v-if="$store.getters.is_client" class="class-ops-bottom row">
      <nuxt-link class="col btn btn-outline-secondary btn-block" :to="'/' + class_name + '/create'"><i class="fal fa-plus" /> 添加</nuxt-link>
    </nav>
  
  </div><!-- end #content .container -->
</template>

<script>
  export default {
    name: 'EduIndex',

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
        title: this.class_name_text,

        user_id: '',
        items: []
      }
    },

    created() {
      // console.clear()
      this.fetch_data()
    },

    methods: {
      // 获取数据
      fetch_data() {
        const query_params = {
          user_id: this.$route.query.user_id
        }
        const api_url = this.class_name + '/index'
        const params = { ...query_params, ...this.$store.getters.common_params }

        return this.$axios
            .$post(api_url, params)
            .then(result => {
              // console.log(result)

              // 若请求成功，更新翻页参数
              try {
                if (result.status === 200) {
                  this.user_id = query_params.user_id
                  this.items = [ ...result.content ]
                }
              } catch (error) {
                console.error(error)
                result.status = 500
                result.content.error.message = '服务器错误 ERROR_API'
              }
            })
            .catch(error => {
              console.error(error)
            })
      } // end methods.fetch_data
    } // end methods
  }
</script>

<style scoped>

</style>
