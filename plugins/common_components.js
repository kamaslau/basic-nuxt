/**
 * 引入并注册全局/常用组件到Vue示例
 */

import Vue from 'vue' // 引入Vue示例

/**
 * 引入组件
 */
import HeaderMain from '~/components/header/header'
import HeaderClass from '~/components/header/class'
import FooterMain from '~/components/footer'

import NavBottom from '~/components/page/_navBottom' // 底部导航栏
import Paging from '~/components/page/paging' // 分页组件
import ItemBulkOpBtn from '~/components/page/_bulkOpBtn' // 批量操作组件
import ItemEditBtn from '~/components/page/_editBtn' // 修改按钮
import Uploader from '~/components/form/uploader' // 上传组件

import ArticleBrief from '~/components/article/_brief' // 数据单项组件
import ArticleList from '~/components/article/_list' // 数据列表组件


/**
 * 注册组件到Vue示例
 */
Vue.component('HeaderMain', HeaderMain)
Vue.component('HeaderClass', HeaderClass)
Vue.component('FooterMain', FooterMain)

Vue.component('NavBottom', NavBottom)
Vue.component('Paging', Paging)
Vue.component('ItemBulkOpBtn', ItemBulkOpBtn)
Vue.component('ItemEditBtn', ItemEditBtn)
Vue.component('Uploader', Uploader)

Vue.component('ArticleBrief', ArticleBrief)
Vue.component('ArticleList', ArticleList)
