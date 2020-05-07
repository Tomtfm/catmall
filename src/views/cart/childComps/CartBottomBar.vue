<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button 
						 :is-checkde="isSelectAll"
						 class="check-bottm"
						 @click.native="checkClick"/>
			<span>全选</span>
		</div>
		
		<div class="price">
			合计：{{totalPrice}}
		</div>
		
		<div class="calcuate" @click="calcClick">
			去结算 ({{checkLength}})
		</div>
		
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	
	import {mapGetters} from 'vuex'
	
	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartList']),
			// 计算 所选中的商品的总价格
			totalPrice() {
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.cartList.filter(item => item.checked).length
			},
			// 全选按钮显示状态 设置
			isSelectAll() {
				if(this.cartList.length == 0) return false

				// 方法二：使用 find函数
				return !this.cartList.find(item => !item.checked)
			}
		},
		methods: {
			// 点击全选按钮设置
			checkClick() {
				if(this.isSelectAll) {
					this.cartList.forEach(item => item.checked = false)
				}else {
					this.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick() {
				if(!this.isSelectAll) {
					this.$toast.show('请选择购买的商品')
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		position: relative;
		display: flex;
		height: 40px;
		line-height: 40px;
		background-color: #eee;
		font-size: 14px;
	}
	
	.check-content {
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}
	
	.check-bottm {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	
	.price {
		margin-left: 20px;
		flex: 1;
	}
	
	.calcuate {
		width: 90px;
		background: red;
		color: #fff;
		text-align: center;
	}
</style>
