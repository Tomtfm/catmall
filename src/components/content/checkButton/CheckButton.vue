<template>
	<div class="check-button" :class="{check: isCheckde}">
		<img src="~assets/img/cart/tick.svg"/>
	</div>
</template>

<script>
	export default {
		name: 'CheckButton',
		props: {
			isCheckde: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.check-button {
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	
	.check {
		border-color: red;
		background-color: red;
	}
	
</style>
