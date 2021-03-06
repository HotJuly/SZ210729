const Koa = require('koa');
const KoaRouter = require('koa-router');

const Fly=require("flyio/src/node")
const fly=new Fly;

const jwt = require('jsonwebtoken');

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

// 当前接口用于返回首页分类相关数据
const indexCateList = require('./datas/indexCateList.json')
router.get("/getIndexCateList",async (ctx,next)=>{
	// console.log('/test success')
	
	// koa服务器无法使用定时器延迟数据的返回
	// koa服务器如果路由回调函数返回一个promise对象,他就会等待当前promise对象的状态发生变化
	// setTimeout(()=>{
	// 	console.log(1)
	// 	ctx.body=indexCateList
	// },2000)
	await new Promise((resolve)=>{
		setTimeout(resolve,2000)
	})
	ctx.body=indexCateList
})

// 当前接口用于返回详情页相关数据
const goods = require('./datas/goods.json')
router.get("/getGoodDetail",(ctx,next)=>{
	// console.log('/test success')
	// 1.获取到前端传递的商品id
	const id = ctx.query.id;
	console.log('id',id)
	
	const result = goods.find((good)=>{
		// >>>右移运算符 <<<左移运算符
		return good.id === id>>>0;
	})
	ctx.body=result;
	// console.log('result',result)
})


// 用于获取到用户唯一标识openId
router.get('/getOpenId',async (ctx)=>{
	const {code} = ctx.query;
	// console.log('code',code)
	const appId = 'wxe5931a68ea66cece';
	const appSecret = 'b3d715c8c0ebd0f00454816cedb369b2';
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
	const {data} = await fly.get(url);
	// 注意请求体data是json格式的对象
	const {openid} = JSON.parse(data);
	// console.log(openid)
	
	
	// const token = jwt.sign(需要加密的数据, 盐);
	const salt = 'atguigu';
	const token = jwt.sign(openid, salt);
	const newOpenId = jwt.verify(token, salt);
	// console.log(openid,newOpenId)
	ctx.body=token
})

// 2.将服务器应用实例运行到某个指定端口上,并监听该端口
app.listen("3002",(error)=>{
	if(error){
		console.log('服务器启动失败,'+ error)
	}else{
		console.log('服务器启动成功,地址为http://localhost:3002')
	}
})