const Koa = require('koa');
const KoaRouter = require('koa-router');

// 1.创建服务器应用实例对象
// const app = express();
const app = new Koa();

// 3.注册路由返回数据
// app.get(路由地址,路由回调函数)

// 3.1创建路由器实例对象
const router = new KoaRouter();

/* 
	3.2声明使用中间件
		app.use(中间件函数)
		app.use(express.static())
		中间件的用处:
			中间件可以拦截请求,对请求进行统一处理,决定是否要执行下一个中间件
				1.可以检查用户请求是否具有某些特定数据,例如token
				2.对请求头和响应头进行修改
*/
// 声明使用所有已注册的路由
app.use(router.routes())

/*
 3.3注册路由(接口)
	express服务器:
		app.get(路由路径,路由回调函数)
			路由回调函数接收参数个数:3个
				1.request->请求报文对象
				2.response->响应报文对象
					response.send(返回数据)
				3.next->执行下一个中间件(就是放行)
	koa服务器中:
		路由路径必须以/开头
		路由回调函数接受参数个数:2个
				1.ctx->request+response->请求报文对象+响应报文对象
					返回数据的方法:
						ctx.body=需要返回的数据
						使用该方法返回数据,格式一定是json文本
				2.next->执行下一个中间件(就是放行)
*/
router.get("/test",(ctx,next)=>{
	console.log('/test success')
	ctx.body={}
})

// 当前接口用于返回首页相关数据
const indexData = require('./datas/index.json')
router.get("/getIndexData",(ctx,next)=>{
	// console.log('/test success')
	ctx.body=indexData
})

// 当前接口用于返回分类页面相关数据
const categoryDatas = require('./datas/categoryDatas.json')
router.get("/getCategoryDatas",(ctx,next)=>{
	// console.log('/test success')
	ctx.body=categoryDatas
})


// 2.将服务器应用实例运行到某个指定端口上,并监听该端口
app.listen("3002",(error)=>{
	if(error){
		console.log('服务器启动失败,'+ error)
	}else{
		console.log('服务器启动成功,地址为http://localhost:3002')
	}
})