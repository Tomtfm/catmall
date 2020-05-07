<template>
	<div id="detail">
		<detail-nav-bar @titleClick="titleClick" ref="nav"/>
		<!-- 给详情页 加上 滚动效果 Better-Scroll -->
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shopInfo"/>
			<detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
			<detail-param-info ref="params" :param-info="paramInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<goods-list ref="recommend" :goods="recommends"/>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		
		<!-- 底部工具栏 -->
		<detail-bottom-bar @addCart="addToCart"/>
	</div>		
</template>

<script>
	// detail子组件区
	import DetailNavBar from './childcomps/DetailNavBar'
	import DetailSwiper from './childcomps/DetailSwiper'
	import DetailBaseInfo from './childcomps/DetailBaseInfo'
	import DetailShopInfo from './childcomps/DetailShopInfo'
	import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
	import DetailParamInfo from './childcomps/DetailParamInfo' 
	import DetailCommentInfo from './childcomps/DetailCommentInfo'
	import DetailBottomBar from './childcomps/DetailBottomBar'
	
	// 公共组价区（components/common）
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	
	// 网络请求区
	import {getDetail, Goods, getRecommend} from 'network/detail'
	import {debounce} from 'common/Utils'
	import {itemListenerMixin, backTopMixin} from 'common/mixin'
	
	import { mapActions } from 'vuex'

	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shopInfo: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0
			}
		},
		created() {
			// 1.保存传入的 iid
			this.iid = this.$route.params.iid
			
			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res);
				// 获取数据
				const data = res.result;
				
				// a、获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages
				
				// b、获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				
				// c、创建店铺信息的对象
				this.shopInfo = data.shopInfo
				
				// e、保存商品的详情数据
				this.detailInfo = data.detailInfo
				
				// f、获取参数信息
				this.paramInfo = data.itemParams
				
				// g、取出评论信息
				if(data.rate.cRate != 0) {
					this.commentInfo = data.rate.list[0]
				}
			})
			
			// 3.请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			
			// 4.给 getThemeTopY赋值
			this.getThemeTopY = debounce(() => {
				// 获取到对应的内容位置（并在 methods函数中进行 调用）
				this.themeTopYs = []
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				this.themeTopYs.push(Number.MAX_VALUE);
				// console.log(this.themeTopYs);
			}, 100)
		},
		mounted() {
			
		},
		destroyed() {
			// 取消全局事件的监听
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		methods: {
			...mapActions(['addCart']),
			detailImageLoad() {
				this.refresh()
				
				// 获取到对应的内容位置	
				this.getThemeTopY()
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
			},
			contentScroll(position) {
				// 1.获取Y值
				const positionY = -position.y
				
				// 2.positionY和主题中的值进行对比:
				let length = this.themeTopYs.length;
        
				// 使用Number.MAX_VALUE做判断
				for(let i =0; i < length - 1; i++){
					if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] &&
						positionY < this.themeTopYs[i+1])){
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex;
					}
				}
				
				// 3.判断BackTop是否显示
				this.listShowBackTop(position)
			},
			
			// 监听点击加入购物车
			addToCart() {
				// 1.获取购物车需要展示的商品信息
				const product = {}
				product.image = this.topImages[0]; 
				product.title = this.goods.title; 
				product.desc = this.goods.desc;	
				product.price = this.goods.realPrice; 
				product.iid = this.iid; 
				
				// 2.将商品添加到购物车里
				this.addCart(product).then(res => {
					// 显示 小弹窗（提示）
					this.$toast.show(res)
				})
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 1;
		background-color: #fff;
		height: 100vh;
	}

	.content {
		background-color: #fff;
		height: calc(100% - 44px - 49px);
	}
</style>
