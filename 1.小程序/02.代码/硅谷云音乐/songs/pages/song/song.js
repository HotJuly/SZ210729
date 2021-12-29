// pages/song/song.js
import PubSub from 'pubsub-js'
const appInstance = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储当前页面歌曲详细信息
        songObj:{},

        // 用于存储当前页面歌曲的url信息
        musicUrl:"",

        // 用于控制当前页面的C3效果
        isPlay:false,

        // 用于存储当前页面歌曲id
        songId:null,

        // 用于记录歌曲当前时间
        currentTime:"00:00",

        // 用于记录歌曲总时间
        durationTime:"--:--",

        // 用于记录歌曲的播放百分比
        currentWidth:0
    },

    // 用于绑定与背景音频管理器相关的事件监听
    addEvent(){
        // onPlay是一个方法,不是一个普通属性
        // 用于监视背景音频的是否正在播放
        this.backgroundAudioManager.onPlay(()=>{
            // console.log('onPlay')
            this.setData({
                isPlay:true
            })

            appInstance.globalData.playState=true;
        })

        // 用于监视背景音频的是否处于暂停
        this.backgroundAudioManager.onPause(()=>{
            // console.log('onPause')
            this.setData({
                isPlay:false
            })
            appInstance.globalData.playState=false;
        })

        // 用于监视背景音频的进度更新事件
        this.backgroundAudioManager.onTimeUpdate(()=>{
            // console.log('onTimeUpdate',this.backgroundAudioManager.currentTime)
            this.setData({
                currentTime:this.moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss"),
                // currentWidth:this.backgroundAudioManager.currentTime/this.data.songObj.dt
                currentWidth:this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration*100
            })
        })
    },

    // 专门用于请求歌曲的详细信息
    async getMusicDetail(){

        const result = await this.myAxios('/song/detail',{
            ids:this.data.songId
        })
        this.setData({
            songObj:result.songs[0],
            durationTime:this.moment(result.songs[0].dt).format("mm:ss")
        })

        wx.setNavigationBarTitle({
            title:this.data.songObj.name
        })
    },

    // 专门用于请求歌曲的音频链接
    async getMusicUrl(){
        const result2 = await this.myAxios('/song/url',{id:this.data.songId})
        this.setData({
            musicUrl:result2.data[0].url
        })
    },

    // 用于监视用户点击下一首按钮操作
    switchType(event){
        const type = event.currentTarget.id;
        PubSub.publish('switchType',type);
    },

    // 用于监视用户点击播放按钮,实现歌曲播放功能
    async handlePlay(){
        // console.log('handlePlay1')
        // const backgroundAudioManager = wx.getBackgroundAudioManager();
        
        if(!this.data.isPlay){

            if(!this.data.musicUrl){
                await this.getMusicUrl()
            }
            this.backgroundAudioManager.src=this.data.musicUrl;
            this.backgroundAudioManager.title=this.data.songObj.name;

            // 缓存当前歌曲播放状态
            appInstance.globalData.playState=true;
            // 缓存当前播放歌曲id
            appInstance.globalData.audioId=this.data.songId;
        }else{
            this.backgroundAudioManager.pause();

            // 缓存当前歌曲播放状态
            appInstance.globalData.playState=false;
            // 能进入该判断,就说明歌曲已经正在播放了,所以不需要缓存当前播放歌曲id
        }
        
        this.setData({
            isPlay:!this.data.isPlay
        })
        // console.log('handlePlay2')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        // console.log('options',options.songId)

        const songId = options.songId;

        this.setData({
            songId
        })

        this.backgroundAudioManager = wx.getBackgroundAudioManager();
        // const song = JSON.parse(options.song)
        this.getMusicDetail();

        // this.getMusicUrl();
        // console.log('result',result)

        // console.log('appInstance1',appInstance.a.msg)
        // appInstance.a.msg="我是修改之后的数据"
        // console.log('appInstance2',appInstance.a.msg)

        const {playState,audioId} = appInstance.globalData;
        // console.log('onLoad',playState,audioId,this.data.songId)
        if(playState&&audioId == this.data.songId){
            this.setData({
                isPlay:true
            })
        }

        // console.log('PubSub',PubSub)
        
        this.token= PubSub.subscribe('sendId',async (msg,songId)=>{
            console.log('sendId',msg,songId)
            this.setData({
                songId
            })

            const detail=this.getMusicDetail();
            const url=this.getMusicUrl();
            await Promise.all([detail,url])
            
            this.backgroundAudioManager.src=this.data.musicUrl;
            this.backgroundAudioManager.title=this.data.songObj.name;

            this.setData({
                isPlay:true
            })

            // 缓存当前歌曲播放状态
            appInstance.globalData.playState=true;
            // 缓存当前播放歌曲id
            appInstance.globalData.audioId=this.data.songId;
        })

        this.addEvent();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
        PubSub.unsubscribe(this.token)
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