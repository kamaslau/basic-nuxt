<template>
  
  <form role="form" @submit.prevent="submit_form">
    <HintTop v-show="form_message !== ''" :text="form_message" />
    
    <fieldset>
      <div class="form-group row">
        <label class="col-form-label col-md-2">机构名称 *</label>
    
        <div class="input-group col-md-10">
          <input v-model.trim.lazy="item.org_name" class="form-control" placeholder="请填写教育/培训机构全称" required autofocus>
        </div>
      </div>
  
      <div class="form-group row">
        <label class="col-form-label col-md-2">学历/学位 *</label>
    
        <div class="input-group col-md-10">
          <select v-model.trim.lazy="item.degree" class="form-control">
            <option v-for="(option, index) in options.degree" :key="'degree-'+index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="form-group row">
        <label class="col-form-label col-md-2">起止年份 *</label>
        <div class="col-md-10 form-row">
          <div class="col input-group">
            <input v-model.trim.lazy.number="item.year_start" class="form-control" type="number" step="1" placeholder="起始年份" required>
          </div>
      
          <div class="col input-group">
            <input v-model.trim.lazy.number="item.year_end" class="form-control" type="number" step="1" placeholder="结束年份；就读中可填写预计毕业时间或不填">
          </div>
        </div>
      </div>
    </fieldset>

    <!-- 切换所有字段的显示 -->
    <button class="btn btn-default btn-block" @click.prevent="toggle_advanced">
      <span v-if="show_advanced"><i class="fal fa-compress-alt" /> 精简</span>
      <span v-else><i class="fal fa-expand-alt" /> 更多</span>
    </button>

    <fieldset v-if="show_advanced">
      <div class="form-group row">
        <label class="col-form-label col-md-2">状态 *</label>
    
        <div class="input-group col-md-10">
          <select v-model.trim="item.status" class="form-control" required>
            <option v-for="(option, index) in options.status" :key="'status-'+index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
  
      <div v-if="item.degree > 30" class="form-group row">
        <label class="col-form-label col-md-2">专业</label>
    
        <div class="input-group col-md-10">
          <input v-model.trim.lazy="item.major" class="form-control" placeholder="高中以上学历可填写专业">
        </div>
      </div>
    </fieldset>
    
    <!-- 提交按钮 -->
    <ButtonSubmit :disabled="false" @submit-form="submit_form" />
  
  </form>

</template>

<script>
export default {
  name: 'EduForm',

  props: {
    value: {
      type: Object,
      required: false,
      default: null
    },

    class_name: {
      type: String,
      default: ''
    },

    id_name: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      form_message: '',

      item: this.value
        ? { ...this.value }
        : {
          org_name: '',
          year_start: '',
          year_end: '',
          degree: '',
          major: '',
          status: '10'
        },
      
      show_advanced: false,

      // 单选框、复选框选项
      options: {
        degree: [
          { value: '', text: '请选择' },
          { value: '0', text: '小学' },
          { value: '10', text: '初中' },
          { value: '20', text: '职高/中专/技校' },
          { value: '30', text: '高中' },
          { value: '40', text: '专科/副学士' },
          { value: '50', text: '本科/学士' },
          { value: '60', text: '硕士/双学士' },
          { value: '70', text: '副博士' },
          { value: '80', text: '博士' }
        ],
        status: [
          { value: '10', text: '毕业' },
          { value: '5', text: '肄业' },
          { value: '0', text: '就读' }
        ]
      }
    }
  },
  
  methods: {
    // 切换全部字段的显示
    toggle_advanced() {
      this.show_advanced = !this.show_advanced
    },
    
    // 提交表单
    submit_form() {
      // 重置错误提示
      this.form_message = ''

      console.log('item: ', this.item)
      this.$emit('submit', this.item) // 触发父组件submit事件
    } // end methods.submit_form
  } // end methods
}
</script>

<style scoped>

</style>
