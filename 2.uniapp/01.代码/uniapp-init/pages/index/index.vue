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
				<view class="iconfont icon-sousuo"></view>
				<input class="searchInput" placeholder="搜索商品" placeholder-class="placeholder" type="text" value="" />
			</view>
			<button class="username" type="default">七月</button>
		</view>
		<scroll-view class="navScroll" scroll-x v-if="indexData.kingKongModule">
			<view	
			class="navItem"	
			:class="{
					active: navIndex === -1
				}"	
			@click="changeNavIndex(-1)"
			>
				推荐
			</view>
			<view	
			class="navItem"	
			:class="navIndex === index ? 'active' : ''"	
			@click="changeNavIndex(index)"	
			v-for="(kingKong, index) in indexData.kingKongModule.kingKongList"	
			:key="kingKong.L1Id"
			>
				{{ kingKong.text }}
			</view>
		</scroll-view>

		<scroll-view class="contentScroll" scroll-y="true" >
			<Recommend v-if="navIndex === -1" />
			<CateList :navIndex="navIndex" v-else />
		</scroll-view>
	</view>
</template>

<script>
import { mapState , mapActions} from 'vuex';
import myAxios from '../../utils/myAxios.js';
import Recommend from '../../components/Recommend/Recommend.vue';
import CateList from '../../components/CateList/CateList.vue';
export default {
	data() {
		return {
			title: 'Hello11',
			// indexData:{},
			navIndex: -1
		};
	},
	components: {
		Recommend,
		CateList
	},
	/*
		uniapp同时兼容小程序和Vue的生命周期,推荐使用Vue的生命周期
	*/
	async mounted() {
		// 小程序使用wx.request发送请求
		// Vue使用axios发送请求
		// uniapp兼容小程序的所有API
		// 建议API相关的还是使用uniapp自己的
		// console.log('mounted')
		// this.indexData = result
		// uni.request({
		// 	url:"/api/getIndexData",
		// 	success:(res)=>{
		// 		console.log('res',res)
		// 		this.indexData = res.data
		// 	}
		// })
		// console.log('myAxios',this.myAxios)

		// this.$store.dispatch('home/getIndexData');
		// this["home/getIndexData"]();

		this.getIndexData1();
		// console.log('store',this.$store.state.home)
	},
	// onLoad() {
	// 	console.log('onLoad')
	// },
	// created(){
	// 	console.log('created')
	// },
	methods: {
		changeNavIndex(index) {
			this.navIndex = index;
		},
		// ...mapActions(["home/getIndexData"])
		...mapActions("home",{
			getIndexData1:"getIndexData"
		})
	},
	computed: {
		// indexData() {
		// 	return this.$store.state.home.indexData;
		// }
		
		// 如果没有进行modules划分
		// ...mapState(["indexData"])
		
		// 如果进行了modules划分
		// ...mapState({
		// 	indexData:(state)=>state.home.indexData
		// })
		
		// 如果进行了modules划分,同时开启了命名空间的使用
		...mapState("home",["indexData"])
	}
};
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
			flex-shrink 0
		.search
			position relative
			background-color #ccc
			flex-grow 1
			border-radius 10upx
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
			line-height 60upx
			color red
			margin 0 20upx
			flex-shrink 0
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
				border-bottom 4upx solid red
	.contentScroll
	// /* #ifdef MP-WEIXIN */
	// 	// 小程序:height=屏幕100%高度-header高度-nav高度
	// 	height calc( 100vh - 80upx - 84upx)
	// /* #endif */
	// /* #ifdef H5 */
	// 	// h5:height=屏幕100%高度-header高度-nav高度-导航栏高度-tabBar高度
	// 	height calc( 100vh - 80upx - 84upx - 88upx - 100upx)
	// /* #endif */
	
		height calc( 100vh - 80upx - 84upx - var(--window-top) - var(--window-bottom))
</style>
