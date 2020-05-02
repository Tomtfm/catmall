<template>
	<nav-bar class="nav-bar">
		<div slot="left" class="back" @click="backClick">
			<img src="~assets/img/common/back.svg"/>
		</div>
		<div slot="center" class="title">
			<div v-for="(item, index) in titles" 
				   class="title-item" 
					 :class="{active: index == currentIndex}"
					 @click="titleClick(index)">
					 {{item}}
			</div>
		</div>
	</nav-bar>
</template>

<script>
	import NavBar from 'components/common/navbar/navBar'
	
	export default {
		name: 'DetailNavBar',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			titleClick(index) {
				this.currentIndex = index
				
				// 转出对应的 标题
				this.$emit('titleClick', index)
			},
			backClick() {
				// 点击返回
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	
	.title {
		display: flex;
		font-size: 13px;
	}
	
	.title-item {
		flex: 1;
	}
	.active{
		color: var(--color-high-text);
	}
	
	.back img {
		margin-top: 12px;
		width: 18px;
		height: 18px;
	}
</style>
