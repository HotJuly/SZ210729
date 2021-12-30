<template>
	<!-- <view class="indexContainer">
		indexContainer
	</view> -->
	<!-- <div>
		<div>123</div>
		<i>123</i>
		<i>234</i>
	</div> -->
	<!-- <swiper  indicator-dots="true"  autoplay="true"  interval="3000"  duration="1000">
		<swiper-item>
			<view class="swiper-item">123</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">234</view>
		</swiper-item>
	</swiper> -->
	<!-- uniapp同时兼容小程序和html的标签,但是建议使用小程序标签
		因为html在小程序上兼容性一般,但是小程序标签在html上兼容良好-->
		
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<view class="iconfont icon-sousuo">
				</view>
				<input class="searchInput" placeholder="搜索商品" placeholder-class="placeholder" type="text" value="" />
			</view>
			<button class="username" type="default">七月</button>
		</view>
		<scroll-view class="navScroll" scroll-x>
			<view 
			class="navItem" 
			:class="{
				active:navIndex===-1
			}"
			@click="changeNavIndex(-1)"
			>
				推荐
			</view>
			<view 
			class="navItem" 
			:class="navIndex===index?'active':''"
			@click="changeNavIndex(index)"
			v-for="(kingKong,index) in indexData.kingKongModule.kingKongList"
			:key="kingKong.L1Id"
			>
				{{kingKong.text}}
			</view>
		</scroll-view>
		
		<Recommend v-if="navIndex===-1"/>
		<CateList v-else/>
	</view>
</template>

<script>
import Recommend from '../../components/Recommend/Recommend.vue'
import CateList from '../../components/CateList/CateList.vue'
export default {
	data() {
		return {
			title:'Hello11',
			indexData:{},
			navIndex:-1
		}
	},
	components:{
		Recommend,
		CateList
	},
	/*
		uniapp同时兼容小程序和Vue的生命周期,推荐使用Vue的生命周期
	*/
	mounted(){
		// 小程序使用wx.request发送请求
		// Vue使用axios发送请求
		// uniapp兼容小程序的所有API
		// 建议API相关的还是使用uniapp自己的
		// console.log('mounted')
		uni.request({
			url:"http://localhost:3002/getIndexData",
			success:(res)=>{
				console.log('res',res)
				this.indexData = res.data
			}
		})
	},
	// onLoad() {
	// 	console.log('onLoad')
	// },
	// created(){
	// 	console.log('created')
	// },
	methods:{
		changeNavIndex(index){
			this.navIndex = index;
		}
	}
}
</script>

<style lang="stylus">
	// shift+tab可以向前缩进,tab是向后缩进
	.indexContainer
		.header
			/*
				使用padding替代margin 
					1.不能有边框
					2.不能有背景颜色
			*/
			padding-top 20upx
			display flex
			align-items center
			.logo
				width 118upx
				height 40upx
				margin 0 20upx
				flex-shrink  0
			
			.search
				position relative
				background-color  #ccc
				flex-grow 1
				border-radius  10upx
				height 60upx
				padding-left 60upx
				.searchInput
					height 100%
					.placeholder
						text-align center
						font-size 24upx
						text-indent -60upx
				.iconfont
					position absolute
					left 20upx
					top 50%
					transform translateY(-50%)
			
			.username
				width 140upx
				height 60upx
				font-size 24upx
				line-height  60upx
				color  red
				margin 0 20upx
				flex-shrink  0
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				width 140upx
				height 80upx
				text-align center
				line-height 80upx
				font-size 26upx
				&.active
					border-bottom 4upx solid red;
			
		
	
</style>
