const {resolve} = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    tree shaking(树摇)
    问题:当前a文件引入b文件的代码,a文件只用到了b文件中的一小段代码,但是在最终打包的时候,b文件的代码会全部被带上
        最终会导致,当前项目体积变大,解析速度变慢,占用太宽更多,白屏时间更久
    解决:树摇可以将多余的无用代码进行剔除,减小项目体积
    流程:
        1.想使用树摇,文件的模块化语法必须是ES6模块化语法才行
        2.在optimization.minimizer中配置TerserPlugin

*/

module.exports={
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
   module:{
       rules:[
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
           path:"./public/index.html"
       })
   ],
   mode:"development",   //开发环境development,生产环境production,
   resolve:{
       alias:{
           "@":resolve(__dirname,'./src')
       },
       extensions:[".js",".json",'.vue','.css']
   }
}