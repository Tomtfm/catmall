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
				// 循环 判断商品是否已选中完，如已选中完 全选按钮则显示，否则反之；
				
				// 没有商品数据的情况下 它也显示全选按钮，所以要给它做一个判断(必加):
				if(this.cartList.length == 0) return false
				
				// 方法一:（filter缺点：性能不是特别高）
				// return !(this.cartList.filter(item => !item.checked).length)
				
				// 方法二：使用 find函数
				return !this.cartList.find(item => !item.checked)
				
				// 方法三：使用 for循环
				// for (let item of this.cartList) {
				// 	if(!item.checked) {
				// 		return false
				// 	}
				// }
				// return true
			}
		},
		methods: {
			// 点击全选按钮设置
			checkClick() {
				// 判断逻辑：
				if(this.isSelectAll) {
					// 1.如果原来都是全部选中的，点击时让其 全部不选中；
					this.cartList.forEach(item => item.checked = false)
				}else {
					// 2.如果原来都是不选中的（或者 某些不选中的），点击时让其 全部选中；
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
