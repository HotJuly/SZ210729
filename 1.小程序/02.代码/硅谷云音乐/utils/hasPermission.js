export default function(){
    if(!wx.getStorageSync('cookie')){
        // 能进入该判断说明用户没有登录,那就弹窗提示用户
        wx.showModal({
            title:"请先登录",
            content:"该功能需要登录账号才能使用",
            confirmText:"去登陆",
            cancelText:"回到首页",
            success:({confirm})=>{
                // 无论点击确定还是取消都会触发成功回调
                // console.log('success',confirm)
                if(confirm){
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                }else{
                    wx.switchTab({
                        url:"/pages/index/index"
                    })
                }
            },
            fail:()=>{
                console.log('fail')
            }
        })
        return false;
    }
    return true;
}