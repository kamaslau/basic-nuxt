import Vue from 'vue'

// 获取当前设备地理信息
const getGeoInfo = () => {
  if (navigator.geolocation) console.log('geoLocation OK')

  navigator.geolocation.getCurrentPosition(data => {
    console.log(data)
    const geo_info = {}

    // 获取并格式化经度
    geo_info.longitude = subStringBy(
      data.coords.longitude,
      '.',
      5
    )

    // 获取并格式化纬度
    geo_info.latitude = subStringBy(
      data.coords.latitude,
      '.',
      5
    )

    // 拼合经纬度字符串
    geo_info.longlat = geo_info.longitude + ',' + geo_info.latitude

    // 获取并格式化海拔
    if (data.coords.altitude)
      geo_info.altitude = subStringBy(
        data.coords.altitude,
        '.'
      )

    console.log(geo_info)
    return geo_info
  })
}

// 将传入的数字转为字符，并根据小数点位置截取字符串
const subStringBy = (data, label, besides) => {
  const string = data.toString()
  const append_strings = besides + 1 || 0
  const end_index = string.indexOf(label) + append_strings
  return string.substring(0, end_index)
}

// 注册为Vue实例中方法
Vue.prototype.MY_getGeoInfo = getGeoInfo
