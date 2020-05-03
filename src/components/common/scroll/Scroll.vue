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
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			
			// 2.监听滚动位置 
			if(this.probeType == 2 || this.probeType == 3) {
				this.scroll.on('scroll', (position) => {
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
			//可设置默认time
			scrollTo(x, y, time=500) {
			this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
			},
			// 封装 refresh事件
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
