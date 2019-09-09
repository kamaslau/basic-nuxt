<template>
  <ul :class="style_class" class="edu-list">
    
    <li v-for="(item, index) in items" :key="index">
      <EduBrief :item="item" />
      
      <ul v-if="item.user_id === $store.getters.user.user_id" class="item-ops row">
        <li class="col"><ItemEditBtn :id="item[id_name]" :class_name="class_name" /></li>
        <li class="col"><ItemBulkOpBtn :id_name="id_name" :class_name="class_name" :ids="item[id_name]" operation="delete" @ops-done="remove_items" /></li>
      </ul>
    </li>
  
  </ul>
</template>

<script>
/**
 * 组件 教育经历列表
 */
export default {
  name: 'EduList',
  
  props: {
    // 样式类
    style_class: {
      type: String,
      default: ''
    },
    
    // 数据项
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      class_name: 'edu',
      id_name: 'edu_id'
    }
  },

  computed: {
  },

  created() {
    // console.clear()
  },

  methods: {
    remove_items(ids) {
      const ids_count = ids.trim().split(',').length

      if (ids_count === 0) return

      // 清除状态相应项，以移除视图DOM
      for (let i = 0; i < ids_count; i++) {
        const state_items = this.$store.getters['mine/resume'].edu
        const state_index = state_items.findIndex(item => item[this.id_name] === ids[i])
        this.$store.commit('mine/deleteEdu', state_index)
      }
    } // end methods.remove_items
  } // end methods
}
</script>

<style scoped>
  .edu-list {margin-top:30px;}
</style>
