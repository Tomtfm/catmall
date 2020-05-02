<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name: 'Scroll',
		props: {
			// 实现动态监听：这样能够很好的满足于 一些需要进行监听的和一些不需要进行监听的；
			// probeType 为滚动监听；
			probeType: {
				type: Number,
				default: 0
			},
			// pullUpLoad 为上拉加载更多，默认为false
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			// 1.创建 BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				// 设置 scroll 滚动事件的 监听点击（click），
				// 其默认是 false, 要改为true 方案实现
				// 其是 控制类似div元素 是否能被点击的
				click: true,
				// probeType: 3 ；每次滚动都实时监听，大大的影响性能
				
				// 动态监听：根据传入的值 开决定 “probeType” 它的值是多少；
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			
			// 2.监听滚动位置 
			// (加 if判断的目的： 为了让代码更严谨，且性能也会有所提高)
			if(this.probeType == 2 || this.probeType == 3) {
				this.scroll.on('scroll', (position) => {
					// 通过 自定义事件 把scroll 传出去，谁要调用监听事件，谁就调用它即可
					this.$emit('scroll', position)
				})
			}
			
			// 3.监听 scroll滚动到底部
			if(this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp')
				})
			}
		},
		methods: {
			// scrollTo(x, y, time=500) 定义置顶按钮方法，可设置默认time
			//逻辑语：this.scroll && this.scroll.scrollTo &&:
			 // 用于判断 scroll有没有值，再去进行他的一个调用
			scrollTo(x, y, time=500) {
			this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
			},
			// 封装 refresh事件，解决滚动区域 bug问题
			refresh() {
				this.scroll && this.scroll.refresh && this.scroll.refresh()
			},
			// 封装 finishPullUp 完成下拉加载更多
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
			},
			// 封装 getScrollY() 获取它的 动态高度
			getScrollY() {
				// 此为判断它有没有值，有的话就返回，否则就返回 0
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style>
</style>
