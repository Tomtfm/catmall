<template>
	<tab-bar>
		<!-- activeColor 用于添加字体颜色 （不用时，默认为red） -->
		<tab-bar-item path="/home">
			<img slot="item-icon" src="~assets/img/tabbar/home.svg">
			<img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
			<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item path="/category">
			<img slot="item-icon" src="~assets/img/tabbar/category.svg">
			<img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
			<div slot="item-text">分类</div>
		</tab-bar-item>
		<tab-bar-item path="/cart">
			<img slot="item-icon" src="~assets/img/tabbar/cart.svg">
			<img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg">
			<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item path="/profile">
			<img slot="item-icon" src="~assets/img/tabbar/profile.svg">
			<img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
			<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar'
	import TabBarItem from 'components/common/tabbar/TabBarItem'
	
	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>

