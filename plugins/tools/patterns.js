import Vue from 'vue'

const patterns = {
  mobile: /^1(3\d|5[0-35-9]|7[36-8]|8\d|9[89])\d{8}$/, // 大陆手机号格式

  ssn: {
    prc: /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|30|31)\d{3}(\d|x|X)$/ // 大陆身份证号
  },

  captcha_int_4: /^\d{4}$/,
  captcha_int_6: /^\d{6}$/,
  captcha_int_8: /^\d{8}$/
}

// 注册为Vue实例中方法
Vue.prototype.MY_patterns = patterns
