import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			// 1.查找之前数组中是否有该商品
			let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
			
			// 2.判断 oldProduct，并 +1
			if (oldProduct) {
				// oldProduct.count += 1 数量 +1的
				context.commit(ADD_COUNTER, oldProduct)
				resolve("当前商品数量 +1")
			} else{
				payload.count = 1
				// state.cartList.push(payload) 添加新商品的
				context.commit(ADD_TO_CART, payload)
				resolve("成功加入购物车")
			}
		}) 
	}
}
