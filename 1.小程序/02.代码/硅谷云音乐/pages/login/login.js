// pages/login/login.js
import myAxios from '../../utils/myAxios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于收集用户的手机号码
        phone:"17688197777",
        password:"",
        form:{
            phone:"123"
        }
    },

    // 用于监视用户点击登录按钮,实现登录操作
    async handleLogin(){
        /*
            1.收集数据
            2.处理数据
            3.表单校验
                前端校验
                后端校验
            4.发送请求
            5.接收响应,区分成功失败
                状态码区分:
                    400->手机号格式错误
                    501->手机号不存在
                    502->密码错误
                    200->登录成功
        */

        // 1.收集数据
        const {phone,password} = this.data;

        // 3.表单校验
        if(!phone.trim()){
            // 弹窗提示用户,请输入手机号
            wx.showToast({
                title:"请输入手机号",
                icon:"error"
            })
            return;
        }
        if(!password.trim()){
            // 弹窗提示用户,请输入密码
            wx.showToast({
                title:"请输入密码",
                icon:"error"
            })
            return;
        }

        //4.发送请求
        const result = await myAxios('/login/cellphone',{
            phone,
            password
        })

        // 5.接收响应,区分成功失败
        // console.log(result)
        const code = result.code;
        // if(code===200){
        //     // 能进入这里,说明用户登录成功
        //     wx.showToast({
        //       title: '登录成功,即将跳转',
        //       icon:"none"
        //     })
        // }else if(code===400){
        //     // 能进入这里,说明用户帐号格式错误
        //     wx.showToast({
        //       title: '帐号格式错误',
        //       icon:"error"
        //     })
        // }else if(code===501){
        //     // 能进入这里,说明用户帐号不存在
        //     wx.showToast({
        //       title: '帐号不存在',
        //       icon:"error"
        //     })
        // }else if(code===502){
        //     // 能进入这里,说明用户密码错误
        //     wx.showToast({
        //       title: '密码错误',
        //       icon:"error"
        //     })
        // }

        // 使用策略模式
        // 好处:不再需要纠结先判断谁,性能较高
        const codeFn = {
            200(){
                // 能进入这里,说明用户登录成功
                wx.showToast({
                  title: '登录成功,即将跳转',
                  icon:"none"
                })

                // wx.setStorageSync("userInfo",result.profile)
                wx.setStorage({
                    key:"userInfo",
                    data:result.profile
                })
                
                // console.log(wx.getStorageSync('userInfo'))

                // 用于跳转到指定的tabBar页面
                // switchTab可以跳转tabBar页面,并且关闭所有非tabBar页面
                wx.switchTab({
                  url: '/pages/personal/personal'
                })
            },
            400(){
                // 能进入这里,说明用户帐号格式错误
                wx.showToast({
                  title: '帐号格式错误',
                  icon:"error"
                })
            },
            501(){
                // 能进入这里,说明用户帐号不存在
                wx.showToast({
                  title: '帐号不存在',
                  icon:"error"
                })
            },
            502(){
                // 能进入这里,说明用户密码错误
                wx.showToast({
                  title: '密码错误',
                  icon:"error"
                })
            }
        }
        
        codeFn[code]&&codeFn[code]();
    },

    // 用于监视用户修改phone输入框,并同步修改data中的数据
    handlePhone(event){
        // 通过event.detail.value可以获取到输入框的最新值
        // console.log('handlePhone',event)
        const phone = event.detail.value;
        this.setData({
            phone
        })
    },

    // 用于监视用户修改password输入框,并同步修改data中的数据
    handlePassWord(event){
        // 通过event.detail.value可以获取到输入框的最新值
        const password = event.detail.value;
        this.setData({
            password
        })
    },

    // 通过一个函数,收集到两个输入框的数据,并实现更新data
    handleChange(event){
        // 小程序向事件回调函数内部传参是通过自定义属性实现的

        // 需要在执行函数的时候,就知道是哪个输入框触发的该函数
        const type = event.target.dataset.type;
        const value = event.detail.value;
        this.setData({
            [type]:value
        })
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