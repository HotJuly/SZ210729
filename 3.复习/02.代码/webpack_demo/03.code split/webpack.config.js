const {resolve} = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    code split(代码切割)
    多入口文件打包
        目的:将多个文件共同依赖的代码单独拆解为一个文件,减小项目体积

        问题:a入口文件和b入口文件同时依赖于c文件,结果打包结束的时候,发现a和b文件中,都具有一份完整的c文件代码
            明明可以所有文件共享一份c文件代码,但是由于当前现象,会导致项目体积变大,加载时间变长,最终导致项目白屏时间更久
        
        配置:设置optimization.splitChunks.chunks="all"的话,
            webpack在编译多入口文件的情况下,就会将多个文件共同依赖的文件代码,单独切割为一份js文件

            有可能出现文件体积过小,没有被切割出来的情况,如何解决?
            将optimization.splitChunks.minSize进行合理设置,就可以对大于某些大小的文件进行切割

    单入口文件代码切割(代码懒加载,俗称组件懒加载)
        使用import函数引入某个文件,该文件就会被webpack单独打包

    面试题:如何自定义chunk名称
        在import函数引入文件的路径之前,添加注释,注释内容为webpackChunkName:"文件名称"

    Vue路由组件懒加载

    早期:
        import Home from './Home.vue'
        new VueRouter({
            routes:[
                {
                    path:"/home",
                    component:Home
                }
            ]
        })

    后期:
        new VueRouter({
            routes:[
                {
                    path:"/home",
                    component:()=>import('./Home.vue')
                }
            ]
        })
*/

module.exports={
    entry:{
        main:"./src/main.js",
        // home:"./src/home.js"
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
   module:{
       rules:[
        {
            test:/.less$/,
            use:[
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        },
        
        {
            test:/.css$/,
            use:[
                "style-loader",
                "css-loader"
            ]
        }
       ]
   },
   plugins:[
       new HTMLWebpackPlugin({
           template:"./public/index.html"
       })
   ],
   mode:"development",   //开发环境development,生产环境production,
   resolve:{
       alias:{
           "@":resolve(__dirname,'./src')
       },
       extensions:[".js",".json",'.vue','.css']
   },
   optimization:{
       splitChunks:{
           chunks:"all",
           minSize:1
       }
   }
}