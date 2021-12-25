/*
    此文件暴露的一定是函数
    axios->ajax+promise

    封装代码
        1.保留重复出现的部分
        2.提取每次都不相同的内容
        3.将不同内容通过外界动态传入
*/
import config from './config';
// const baseUrl1 = "http://localhost:3000"
export default function(url,data={},method="GET"){
    // 发送请求是同步发送,但是响应是异步接受(响应属于宏任务)
    // let result;
    return new Promise((resolve,reject)=>{
        wx.request({
            url:config.mpHost + url,
            data,
            method,
            success:(res)=>{
            //   console.log('res',res)
            //   result=res;
              // res就是响应报文,其中具有响应头和响应体
            //   但是开发者只想要data数据
              resolve(res.data)
            }
        })
    })
    // return result;
}