<script>
	import myAxios from './utils/myAxios.js'
	export default {
		onLaunch: function() {
			// console.log('App Launch1')
			wx.login({
				async success({code}){
					console.log('code',code)
					const openId = await myAxios('/getOpenId',{code});
					uni.setStorage({
						key:"token",
						data:openId
					})
				}
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	@import url('/static/iconfont/iconfont.styl')
	page
		height 100%
</style>
