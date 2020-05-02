<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<!-- 设置 tab-control 吸顶效果方法： -->
		<tab-control :titles="['流行','新款','精选']" 
								 @tabClick="tabClick" 
								 ref="tabControl1" 
								 class="tab-control" v-show="isTabFixed"/>
		<!--scroll组件 实现滚动封装  可滚动的内容只要往里面一塞就可以了-->
		<!-- :probe-type="3"是 自定义需要监听的值 -->
		<!-- @scroll="contentScroll"是 自定义监听事件 -->
		<scroll class="content" 
						ref="scroll" 
						:probe-type="3" 
						@scroll="contentScroll"
						:pull-up-load="true"
						@pullingUp="loadMore">
			<!-- 轮播图 -->
			<home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
			<recommend-view :recommends="recommends"/>
			<!-- 本周流行 -->
			<feature-view/>
			<tab-control :titles="['流行','新款','精选']" 
									 @tabClick="tabClick" 
									 ref="tabControl2"/>
			<!-- 显示商品信息数据 -->
			<!-- 动态 得到 pop数据 -->
			<goods-list :goods="showGoods"/>	
		</scroll>
		<!-- 置顶小按钮 实现组件监听就得使用 .native修饰符-->
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	// Home子组件区
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	// 公共组价区（components/common）
	import NavBar from 'components/common/navbar/navBar'
	import TabControl from 'components/content/tabcontrol/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'

	// 网络请求区
	import {getHomeMultidata, getHomeGoods} from 'network/home'
	import {debounce} from 'common/Utils'
	import {itemListenerMixin, backTopMixin} from 'common/mixin'
	
	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				currentType: 'pop',
				// 吸顶变量
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			// 回来时 进行刷新 这样就不会 返回顶部了
			this.$refs.scroll.refresh()
		},
		deactivated() {
			// 1.保存 Y 值
			this.saveY = this.$refs.scroll.getScrollY()
			
			// 2.取消全局事件的监听
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		created() {
			// 1.请求多个数据
			this.getHomeMultidata()
			
			// 2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			this.tabClick(0)
		},
		methods: {
			/**
			 * 事件监听相关的方法
			 */
			tabClick(index) {
				// console.log(index);
				switch (index) {
					case 0:
					this.currentType = 'pop'
					break
					case 1:
					this.currentType = 'new'
					break
					case 2:
					this.currentType = 'sell'
					break
				}	
				
				// 此处设置 是为了 让点击选中的 currentType 保值一致
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			/*点击置顶 小按钮事件(此功能已封装到 mixin中)
			// backClick() {
			// 	// 注：在使用 $refs 时 必须要定义 ref="变量"（坑）
			// 	// scrollTo(0, 0) 为面向对象的封装，以下调用为 Scroll组件及封装的方法；
			// 	// 默认的 置顶时间为 500，也可自行定义；
			// 	// this.$refs.scroll.scrollTo(0, 0)
			// },
			*/
		
			// 调用 scroll 实施监听事件
			contentScroll(position) {
				// 判断值大于多少是 显示置顶小按钮
				// 当大于 1000 是（isShowBackTop）设置为true，显示置顶小按钮
				// 当小于是则反之
				// position.y 这样子显示的值为负的，所以要改成(-position.y)；
				
				// 1.判断BackTop是否显示(此功能已封装到 mixin中)
				// this.isShowBackTop = (-position.y) > 1000
				this.listShowBackTop(position)
				
				// 2.决定tabControl 是否吸顶（position: fixed）
				this.isTabFixed = (-position.y) > this.tabOffsetTop
				
			},
			// 实现下拉加载更多
			loadMore() {
				// console.log("监听 scroll滚动到底部");
				this.getHomeGoods(this.currentType)				
			},
			// 实现吸顶方法
			swiperImgLoad() {
				// 2.获取到 tabControl的 offsetTop
				// 所有的组件都有一个$el: 用于获取组件中的元素
				// console.log(this.$refs.tabControl.$el.offsetTop	);
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop		
			},
			
			/**
			 * 网络请求相关的方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list; 
					this.recommends = res.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				// 动态获取页码
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// 动态请求数据新语法：this.goods[type].list.push(...res.data.list)
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					// 完成下拉加载更多,调用封装的 finishPullUp()
					this.$refs.scroll.finishPullUp()
				}) 
			}
		}
	}
</script>

<!-- 细节补充：scoped 表示作用域的意思； 
				以下的样式只会在 当前 组件中起效果，而不会在 有相同类名的组件中起效果；
-->
<style scoped>
	#home {
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	/* 设置背景色：其只是用于 当前的组件，所以不放在公共的组件中 */
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	
	/* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 所使用的的样式，
		 而在 Better-Scroll 中不需要使用以下样式	
	 */	
	/* 	position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	
	/* 如何给 “.content” 确定滑动时的 中间高度 有两种方案可行： */
	.content {
		overflow: hidden;
		/* 方案一：通过 以下定位的方式 */
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	
	/* 方案二：通过 height: calc() 进行计算 */
	/* .content {
		height: calc(100% - 93%);
		overflow: hidden;
		margin-top: 44px;
	} */
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
	
</style>
