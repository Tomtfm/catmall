import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
	addCart(context, payload) {
		/* 如何查找之前数组中是否有该商品？
			// 解决思路：
			// 	判断新添加的商品中是否与 之前数组中的商品有相同的，
			// 	如果有的话就在原商品中“+1”即可，否则 则添加成一个新的商品；
			
			// 解决方法：
			// 方法一：遍历循环
			let oldProduct = null;
			for (let item of state.cartList) {
				if(item.iid == payload.iid) {
					oldProduct = item
				}
			}
			
			// 判断 oldProduct，并 +1
			if (oldProduct) {
				oldProduct.count += 1
			} else{
				payload.count = 1
				state.cartList.push(payload)
			}
			
			// 方法二：使用数组方法 find()
			let oldProduct = state.cartList.find(item => item.iid == payload.iid)
			
			// 判断 oldProduct，并 +1
			if (oldProduct) {
				oldProduct.count += 1
			} else{
				payload.count = 1
				state.cartList.push(payload)
			}*/
		
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