<template>
	<div class="toast" v-show="isShow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default {
		name: 'Toast',
		data() {
			return {
				message: '',
				isShow: false
			}
		},
		methods: {
			show(message='默认文字', duration=2000) {
				this.isShow = true
				this.message = message
				
				setTimeout(() => {
					this.isShow = false
					this.message = ''
				}, duration)
			}
		}
	}
</script>

<style scoped>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);  /* 根据自己的 高度进行偏移 */
		padding: 8px 10px;
		color: #fff;
		z-index: 999;
		background-color: rgba(0, 0, 0, .75);
	}
</style>
