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
				<input class="searchInput" type="text" value="" />
			</view>
			<button class="username" type="default">七月</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title:'Hello1'
		}
	},
	onLoad() {},
	methods:{}
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
			
		
	
</style>
