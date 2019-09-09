/**
 * Template 状态模块
 */

/**
 * 调试模式开关
 *
 * 控制console调试信息的输出等，0不调试 1输出log 2更多调试级别
 * @type {number}
 */
const test_mode = 0


// 初始状态
const initial_state = {
  item: {}, // 所属企业
  items: [], // 银行卡
} // end initial_state

/**
 * 以下为状态相关业务
 */
export const state = () => {
  return {
    ...initial_state
  }
} // end state

export const mutations = {

  // 更新教育经历
  updateEdu (state, data) {
    if (test_mode) console.log('updateEdu init')
    const id_name = 'edu_id'

    // 若待更新项为单行，则查找并更新本地相应项；否则直接覆盖
    if (data[id_name]) {
      // 是否已存在于状态中
      const index = state.edu.findIndex(item => item[id_name] === data[id_name])

      // 若不存在，则作为新数据插入
      if (index > -1) {
        state.edu[index] = data
      } else {
        state.edu.push(data)
      }

      // 按开始年份倒序排序
      state.edu.sort((a, b) => { return b.year_start - a.year_start })
    } else {
      state.edu = [ ...data ]
    }

    if (test_mode) console.info('updateEdu ends with: ', state.edu)
  }, // end updateEdu

  // 删除教育经历
  deleteEdu (state, index) {
    if (state.edu.length < (index + 1)) return

    state.edu.splice(index, 1)
  }, // end deleteEdu
} // end mutations

export const actions = {

  // 获取教育经历
  fetchEdu ({ commit, rootGetters }) {
    if (test_mode) console.log('fetchEdu init')

    // 请求API
    const api_url = 'edu/index'
    const params = rootGetters.common_params

    this.$axios
      .$post(api_url, params)
      .then(result => {
        // console.info(result)

        // 若请求成功，保存用户信息到状态
        if (result.status === 200) {
          // 更新信息
          commit('updateEdu', result.content)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, // end fetchEdu
} // end actions

export const getters = {
  item (state) {
    return state.item
  },
  
  items (state) {
    return state.items
  },
} // end getters
