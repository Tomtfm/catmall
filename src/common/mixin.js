import {debounce} from './Utils'
import BackTop from 'components/content/backtop/BackTop'
	
// 混入封装：对两个组件之间使用的"公用代码"进行 合并
export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			refresh: null
		}
	},
	mounted() {
		// 1.包装 refresh 防抖：监听item 中图片加载完成  
		this.refresh = debounce(this.$refs.scroll.refresh, 100)
		
		// 2.对监听的事件进行保存
		this.itemImgListener = () => {
			this.refresh()
		}
		this.$bus.$on('itemImgLoad', this.itemImgListener) 
	}
}

// 混入封装：回到顶部 小按钮功能
export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0, 0)
		},
		listShowBackTop(position) {
			// 判断BackTop是否显示
			this.isShowBackTop = (-position.y) > 1000
		}
	}
}










