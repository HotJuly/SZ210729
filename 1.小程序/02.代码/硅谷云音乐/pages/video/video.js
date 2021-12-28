// pages/video/video.js
import myAxios from '../../utils/myAxios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储导航列表显示数据
        navList:[],

        // 用于监视用户点击导航列表选项操作
        navId:null,

        // 用于存储视频列表数据
        videoList:[],

        // 用于控制下拉动画的显示隐藏
        isTriggered:true
    },

    // 用于监视用户下拉scroll-view区域刷新操作
    async handlePullDown(){
        // console.log('handlePullDown')
        await this.getVideoList();
        this.setData({
            isTriggered:false
        })
    },

    // 专门用于请求导航列表数据
    async getNavList(){
        const result = await this.myAxios('/video/group/list');
        this.setData({
            navList:result.data.slice(0,14),
            navId:result.data[0].id
            // navId:60100
            // navId:this.data.navList[0].id
        })
    },

    // 用于监视用户播放视频操作
    handlePlay(event){
        // console.log('handlePlay',event)
        // console.log(this.oldVid)

        // 如何知道当前视频vid
        // 可以通过标签属性id或者自定义属性进行通信
        const {id} =event.currentTarget;

        if(this.oldVid&&this.oldVid!==id){
            const videoContext = wx.createVideoContext(this.oldVid);
            
            videoContext.pause();
        }
        // 将本次视频vid缓存,留作下次使用
        // 这一次就是下一次的上一次
        this.oldVid=id;
    },

    // 该方法仅用于测试API,不是真正需求
    testApi(){
        // console.log('testApi')
        // 获取video上下文对象
        const videoContext = wx.createVideoContext("3619ACBBBAA34F4B1D7D48C812E5A961");

        // 通过videoContext的API控制视频播放
        videoContext.pause();
    },

    // 专门用于请求对应标签的视频列表数据
    async getVideoList(){
        this.setData({
            videoList:[]
        });

        const result1 = await this.myAxios('/video/group',{id:this.data.navId});
        
        // console.log(2)

        this.setData({
            videoList:result1.datas.map((item)=>{
                return item.data
            })
        })
    },

    // 用于监视用户点击导航列表操作
    async changeNavId(event){
        // const navId = event.target.dataset.id;
        const navId = event.currentTarget.dataset.id;
        this.setData({
            navId
        })

        wx.showLoading({
          title: '加载中...',
          mask:true
        })

        // console.log(1)
        // 发送请求获取对应标签的视频列表
        await this.getVideoList();

        // console.log(3)
        wx.hideLoading();
        // console.log('changeNavId')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow:async function () {

        // 用于请求导航列表
        await this.getNavList();

        //封装请求视频列表的函数
        this.getVideoList();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh:async function () {
        // console.log('onPullDownRefresh') 
        await this.getNavList();

        //封装请求视频列表的函数
        this.getVideoList();
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