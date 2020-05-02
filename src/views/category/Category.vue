<template>
	<div id="category">
		<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
		<div class="content">
			<!-- 1.左边菜单分类导航  -->
			<tab-menu :categories="categories" @selectItem="selectItem"/>
			<scroll id="tab-content">
					<tab-content-category :subcategories="showSubcategory"/>
					
					<!-- <tab-control :titles="['综合', '新品', '销量']"/> -->
			</scroll>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/navBar'
	
	import TabMenu from './childComps/TabMenu'
	import Scroll from 'components/common/scroll/Scroll'
	import TabContentCategory from './childComps/TabContentCategory'
	import TabControl from 'components/content/tabcontrol/TabControl'

	import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
	
	export default {
		name: 'Category',
		components: {
			NavBar,
			TabMenu,
			Scroll,
			TabContentCategory,
			TabControl
		},
		data () {
			return {
				categories: [],
				categoryData: {},
				currentIndex: -1
			}
		},
		created() {
			// 1.请求分类数据
			this._getCategory()
		},
		computed: {
			showSubcategory() {
				if(this.currentIndex == -1) return {}
				return this.categoryData[this.currentIndex].subcategories
			}	
		},
		methods: {
			_getCategory() {
				getCategory().then(res => {
					// 1.获取分类数据
				  this.categories = res.data.category.list;
					// console.log(this.categories);
					
					// 2.初始化每个类别的子数据
					for(let i = 0; i < this.categories.length; i++) {
						this.categoryData[i] = {
							subcategories: {}
							// categoryDetail: {}
						}
					}

					// 3.请求第一个分类数据
					this._getSubcategories(0)
				})
			},
			_getSubcategories(index) {
				this.currentIndex = index;
				const maitKey = this.categories[index].maitKey;
				getSubcategory(maitKey).then(res => {
					this.categoryData[index].subcategories = res.data;
					this.categoryData = {...this.categoryData}
				})	
			},
			// 事件响应相关方法
			selectItem(index) {
				this._getSubcategories(index)
			}
		}
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
		
		position: relative;
		z-index: 9;
  }

	.content {
		 position: absolute;
		 top: 44px;
		 bottom: 49px;
		 left: 0;
		 right: 0;
		 
		display: flex;
	 }
 
	#tab-content {
    height: 100%;
    flex: 1;
  }

</style>
