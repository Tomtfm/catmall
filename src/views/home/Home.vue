<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行','新款','精选']" 
								 @tabClick="tabClick" 
								 ref="tabControl1" 
								 class="tab-control" v-show="isTabFixed"/>
		<scroll class="content" 
						ref="scroll" 
						:probe-type="3" 
						@scroll="contentScroll"
						:pull-up-load="true"
						@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
			<recommend-view :recommends="recommends"/>
			<feature-view/>
			<tab-control :titles="['流行','新款','精选']" 
									 @tabClick="tabClick" 
									 ref="tabControl2"/>
			<goods-list :goods="showGoods"/>	
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/navBar'
	import TabControl from 'components/content/tabcontrol/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'

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
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
			
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		created() {
			this.getHomeMultidata()
			
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			this.tabClick(0)
		},
		methods: {
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
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			contentScroll(position) {
				// 显示置顶小按钮
				this.listShowBackTop(position)
		
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			// 实现下拉加载更多
			loadMore() {
				this.getHomeGoods(this.currentType)				
			},
			// 实现吸顶方法
			swiperImgLoad() {
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop		
			},
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
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					// 完成下拉加载更多
					this.$refs.scroll.finishPullUp()
				}) 
			}
		}
	}
</script>

<style scoped>
	#home {
		height: 100vh;
		position: relative;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	}

	.content {
		overflow: hidden;
    
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
	
</style>
