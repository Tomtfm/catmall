<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
		
		<!-- 商品列表 -->
		<cart-list/>
		
		<!-- 底部工具栏汇总 -->
		<cart-bottom-bar/>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/navBar'
	
	import CartList from './childComps/CartList'
	import CartBottomBar from './childComps/CartBottomBar'
	
	import {mapGetters} from 'vuex'
	
	export default {
		name: 'Cart',
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			// 新语法 ...mapGetters 的两种用法：
			// 用法1：数组形式，但不可自定义名称
			// ...mapGetters(['cartLength', 'cartList'])
			
			// 用法2：对象形式，可自定义名称
			...mapGetters({
				length: 'cartLength'
			})
		}
	}
</script>

<style scoped>
	.cart {
		height: 100vh;
	}
	
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}	
</style>
