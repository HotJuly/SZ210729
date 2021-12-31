<template>
	<view>
		detail
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		// onLoad(options){
		// 	console.log('onLoad',options)
		// },
		mounted(options){
			// 在Vue生命周期中,只能通过this.$mp可以获取到当前小程序的重要参数(例如:query传参)
			console.log('mounted',this)
		}
	}
</script>

<style lang="stylus">

</style>
