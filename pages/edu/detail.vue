<template>
  <div class="container col-xs-12 col-md-8 page-biz-detail">
    
    <div v-if="item.length === 0" class="alert alert-info">
      <p>这里空空如也</p>
    </div>
    
    <div v-else class="item-detail">
      <!-- 一般性内容 -->
      <EduBrief :item="item" />
    </div>
  
  </div><!-- end #content .container -->
</template>

<script>
  /**
   * 此页面仅为演示asyncData相关功能，非实际业务页面
   */
  export default {
    name: 'EduDetail',

    head() {
      return {
        title: this.title,

        meta: [
          { name: 'robots', content: 'index,follow' },
          { name: 'description', content: this.item.name || process.env.description }
        ]
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
        item_id: '',
        item: {}
      }
    },

    computed: {
      title() {
        return this.item.org_name || this.class_name_text + '详情'
      },
      degree() {
        return this.My_enums.zh_cn.edu.degree[this.item.degree]
      },
      status() {
        return this.My_enums.zh_cn.edu.status[this.item.status]
      }
    },

    watch: {
      '$route': 'fetch_data' // 若当前页面内路由更新了，重新获取数据
    },

    // 服务端渲染
    asyncData(context) {
      // console.log(context)
      const api_url = 'edu/detail'
      const params = {
        id: context.query.id,
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
        })
    },

    created() {
      // console.clear()
    },

    methods: {
      // 获取数据
      fetch_data() {
        const api_url = this.class_name + '/detail'
        const params = {
          id: this.$route.query.id,
          ...this.$store.getters.common_params
        }

        return this.$axios
          .$post(api_url, params)
          .then(result => {
            // console.info(result)

            try {
              if (result.status === 200) {
                // console.table(result.content)
                this.item_id = params.id
                this.item = { ...result.content }
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
