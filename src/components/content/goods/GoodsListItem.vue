<template>
	<div class="goods-item" @click="itemClick">
		<!-- 得到的是 动态真实的图片 -->
		<!--  没有使用懒加载的 -->
		<img :src="showImage" @load="imgLoad"/>
		
		<!-- 使用了 懒加载的 -->
		<!-- <img v-lazy="showImage" @load="imgLoad"/> -->
		
		<div class="goods-info">
			<!-- 动态得到 数据中 想要显示的 数据 -->
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsListItem',
		// 获取 动态的数据
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img
			}
		},
		methods: {
			// 通过 事件总线（$bus）来发射事件
			imgLoad() {
				this.$bus.$emit('itemImgLoad')
			},
			// 点击跳转 详情页面
			itemClick() {
				// 获取商品数据的id
				this.$router.push('/detail/' + this.goodsItem.iid)
			}
		}
	}
</script>

<style scoped>
	.goods-item {
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	
	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}
	
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}
	
	.goods-info .collect {
		position: relative;
	}
	
	/* 收藏 小按钮 伪元素 样式*/
	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
	}
</style>
