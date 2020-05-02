// 导入常量
import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
	[ADD_COUNTER](state, payload) {
		payload.count++
	},
	[ADD_TO_CART](state, payload) {
		payload.checked = false  	// 默认是否选中该商品(true/false)
		state.cartList.push(payload)
	}
}