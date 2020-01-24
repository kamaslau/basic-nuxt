<template>
  <section class="edu-brief">
  
    <h3>{{ item.org_name }}</h3>
    
    <small class="edu-time">{{ item.year_start }}{{ item.year_end ? ' - '+item.year_end : '至今' }}</small>

    <p class="edu-info">
      {{ degree }}
      <span v-if="item.major" class="edu-degree"> - {{ item.major }}</span>
      <span v-if="item.status !== '10'">{{ status }}</span>
    </p>
  </section>
</template>

<script>
/**
 * 组件 简述
 */
export default {
  name: 'EduBrief',
  
  props: {
    item: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {
    degree() {
      return this.My_enums.zh_cn.edu.degree[this.item.degree]
    },
    status() {
      return this.My_enums.zh_cn.edu.status[this.item.status]
    }
  },
  
  created() {
    // console.clear()
  },
  
  methods: {
  } // end methods
}
</script>

<style scoped>

</style>
