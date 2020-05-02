<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
		<!-- 动态绑定颜色 :style="activeStyle" -->
		<div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		data() {
			return {
				// isActive: true
			}
		},
		computed: {
			isActive() {
				// $route ==> 表示哪个路由处于活跃就是哪个对象
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				//动态绑定字体颜色： 判断是否处于活跃状态，然后显示字体颜色；
				return this.isActive ? {color: this.activeColor} : {}
			}
			
		},
		methods: {
			itemClick() {
				// replace() 不想让用户 点击返回
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	
	/* .active {
		color: red;
	} */
	
</style>
