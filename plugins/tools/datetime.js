import Vue from 'vue'

// 主方法
const datetime = (format, timestamp) => {
  const time = timestamp

  return time_tools.format_time(time, format)
}

Vue.filter('datetime', datetime)

const time_tools = {
  // 返回秒级时间戳
  get_timestamp: type => {
    return parseInt(Date.now() / 1000)
  },

  // 根据格式字符串格式化传入的时间戳
  format_time: (format_string, time_to_deal) => {
    const timestamp = time_to_deal || Date.parse(new Date())
    // 确保处理的是毫秒级时间戳
    const milliseconds = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
    const time = new Date(milliseconds)
    const format = format_string || 'Y-m-d'

    // 获取年月日
    const year = time.getFullYear()
    const month_js = time.getMonth() + 1
    const month = month_js > 9 ? month_js : '0' + month_js // 补位"0"
    const day_js = time.getDate()
    const day = day_js > 9 ? day_js : '0' + day_js // 补位"0"
    let result = year + '-' + month + '-' + day

    if (format === 'Y-m-d H:i:s') {
      // 获取时分秒
      const hour_js = time.getHours()
      const hour = hour_js > 9 ? hour_js : '0' + hour_js // 补位"0"

      const minute_js = time.getMinutes()
      const minute = minute_js > 9 ? minute_js : '0' + minute_js // 补位"0"

      const second_js = time.getSeconds()
      const second = second_js > 9 ? second_js : '0' + second_js // 补位"0"

      result += ' ' + hour + ':' + minute + ':' + second
    }

    return result
  }
}

Vue.prototype.timeTools = time_tools
