<template>
	<div class="goods">
		<!-- 根据列表遍历出 许多的GoodsListItem 小组件 -->
		<goods-list-item v-for="item in goods" :goods-item="item"/>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem'
	
	export default {
		name: 'GoodsList',
		components: {
			GoodsListItem
		},
		// 动态的 获取数据
		props: {
			goods: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style>
	.goods {
		display: flex;
		
		/* flex-wrap: wrap; 属性 表示一行里面要显示多少 个图片数据 */
		flex-wrap: wrap; 
		
		/* justify-content: space-around; 属性 实现图片均等分的 */
		justify-content: space-around;
		padding: 2px;
	}
</style>
