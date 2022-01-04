/*
	如果当前运行环境是小程序,
		那么请求的基础路径就是http://localhost:3002
	如果当前运行环境是浏览器,
		那么请求的基础路径就是/api

	需求:根据当前代码的运行环境,来动态控制请求的基础路径
	解决:通过uni.getSystemInfoSync()可以获取到当前设备的信息
		其中具有platform属性
			属性值为ios,就代表当前是在浏览器
			属性值为devtools,就代表是在小程序上
*/
// console.log('uni.getSystemInfoSync()',uni.getSystemInfoSync())
const {platform} = uni.getSystemInfoSync();
let baseUrl;

// if(platform==="ios"){
// 	baseUrl="/api";
// }else if(platform==="devtools"){
// 	baseUrl="http://localhost:3002"
// }

// #ifdef H5
	baseUrl="/api";
// #endif

// #ifdef MP-WEIXIN
	baseUrl="http://localhost:3002";
// #endif

export default function(url,data={},method="GET"){
	return new Promise((resolve)=>{
		uni.request({
			url:baseUrl+url,
			data,
			method,
			header:{
				token:uni.getStorageSync('token')
			},
			success:(res)=>{
				resolve(res.data)
			}
		})
	})
}