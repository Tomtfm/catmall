import {request} from './request'

//封装：获取对应商品数据的 url
// 1.获取详情数据
export function getDetail(iid) {
	return request({
		url: '/detail',
		params: {
			iid
		}
	})
}

// 2.获取推荐数据
export function getRecommend() {
	return request({
		url: '/recommend'
	})
} 
 

// 对复杂的数据进行封装整合（面向对象的开发）
// 1.对商品信息数据 进行封装整合
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title
	  this.desc = itemInfo.desc
	  this.newPrice = itemInfo.price
	  this.oldPrice = itemInfo.oldPrice
	  this.discount = itemInfo.discountDesc
		this.discountBgColor = itemInfo.discountBgColor
		this.columns = columns
	  this.services = services
	  this.realPrice = itemInfo.lowNowPrice
	}
}

// 2.对商家信息 进行封装整合 (由于是存在一个组件里面的，所以不进行封装了)
// export class Shop {
// 	constructor(shopInfo) {
// 		this.logo = shopInfo.shopLogo
// 		this.name = shopInfo.name
// 		this.fans = shopInfo.cFans
// 		this.sells = shopInfo.cSells
// 		this.score = shopInfo.score
// 		this.goodsCount = shopInfo.cGoods
// 	}
// }

// 3.对商品参数 进行封装整合
// export class GoodsParam {
// 	constructor(info, rule) {
// 		// 注：image可能没有值（某些商品有值，某些没有）
// 		this.image = info.image ? info.image[0] : '',
// 		this.infos = info.set
// 		this.sizes = rule.tables
// 	}
// }


