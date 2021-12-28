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
        videoList:[]
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
        const result = await this.myAxios('/video/group/list');
        this.setData({
            navList:result.data.slice(0,14),
            navId:result.data[0].id
            // navId:60100
            // navId:this.data.navList[0].id
        })

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