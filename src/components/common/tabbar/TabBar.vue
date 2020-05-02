<template>
  <div id="app">
		<div id="tab-bar">
			<slot></slot>
		</div>
  </div>
</template>

<script>
	export default {
		name: 'TabBar'
	}
</script>

<style>
	#tab-bar{
		/* 横排 且添加背景颜色 */
		display: flex;
		background-color: #f6f6f6;
		
		/* 使其 排在底部 */
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		
		/* 添加阴影 */
		box-shadow: 0 -3px 1px rgba(100,100,100,.08);
	}
</style>
