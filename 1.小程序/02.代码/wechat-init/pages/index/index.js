// pages/index/index.js
// 注册一个页面实例对象
const citySelector = requirePlugin('citySelector');
Page({

    /**
     * 页面的初始数据
     */
    /*
      乞丐版深拷贝:JSON.parse(JSON.stringify(data))
      缺点:
        1.无法拷贝函数
        2.会导致原型链丢失
        3.他无法转换特殊类型数据,例如Map(转为普通对象),Set(转为普通数组)
    */
    data: {
      msg:"我是初始化数据",
      userInfo:{},
      city:""
    },

    // 用于跳转展示城市选择器界面
    toLocation(){
      const key = 'BZ7BZ-QQWCU-DHWV2-BFJJG-B2JZF-KSBT3'; // 使用在腾讯位置服务申请的key
      const referer = '七月入栈1'; // 调用插件的app的名称
      const hotCitys = '北京,上海,武汉,深圳,泉州'; // 用户自定义的的热门城市

      wx.navigateTo({
        url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
      })
    },

    // 获取用户个人信息-中期版本
    getUserInfo(event){
      // 框架给回调函数传递数据,一般两种渠道,一种this,一种实参
      console.log('getUserInfo',event)
      if(event.detail.rawData){
        // 能进入这个判断,说明用户允许授权了
        const userInfo = event.detail.userInfo;
        this.setData({
          userInfo
        })
      }
    },

    // 获取用户个人信息-最新版本
    getUserProfile(){
      // console.log('getUserProfile')
      
      wx.getUserProfile({
        desc:"用于测试小程序用户授权功能",
        success:(detail)=>{
          // console.log('res',res)
          const userInfo = detail.userInfo;
          this.setData({
            userInfo
          })
        },
        fail:()=>{
          console.log('fail')
        }
      })
    },

    // 用于修改当前页面的msg数据
    changeMsg(){
      this.setData({
        msg:"我是修改之后的数据"
      })
    },

    handleParent(){
      console.log('handleParent')
    },
    handleClick(){
      // console.log('handleClick')
      // wx.navigateTo({
      //   url: '../log/log',
      // })
      wx.redirectTo({
        // url: '/pages/log/log',
        url: '../log/log',
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log('msg',this.data.msg)
      // this.data.msg = "我是修改之后的数据"
      // console.log('msg',this.data.msg)
      // console.log(1)
      // this.setData({
      //   msg:"我是修改之后的数据"
      // })
      // console.log('msg',this.data.msg)

      // this.msg=123;
      // console.log(this.msg)

      // console.log('---------onLoad--------')
      // debugger

      // wx.getUserInfo({
      //   success:(detail)=>{
      //     // console.log('detail',detail)
      //     this.setData({
      //       userInfo:detail.userInfo
      //     })
      //   }
      // })

      wx.getUserProfile({
        desc:"用于测试小程序用户授权功能",
        success:(detail)=>{
          // console.log('res',res)
          const userInfo = detail.userInfo;
          this.setData({
            userInfo
          })
        },
        fail:()=>{
          console.log('fail')
        }
      })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      console.log('---------onReady--------')

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log('---------onShow--------')
      const selectedCity = citySelector.getCity();
      if(!selectedCity)return;
      const city = selectedCity.name;
      // console.log(selectedCity)
      this.setData({
        city
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      console.log('---------onHide--------')

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log('---------onUnload--------')

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})