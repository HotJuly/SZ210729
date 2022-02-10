const {resolve} = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    /*
        面试题:请问loader和plugin的区别?
            webpack认识哪些类型的文件?
                webpack其实只认得js和json文件

                loader是用于帮助webpack解析其他无法识别的类型文件
                    例如使用less以及less-loader来解析less文件,
                        其中less才是真正具有解析能力的包,而less-loader并不具有解析能力,他只是中间的桥梁
                plugins是用来实现某些特定功能(不是用来解析某些文件的)
                
                loader中的use数组,使用loader的顺序是从下往上
    */
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
           path:"./public/index.html"
       })
   ],
   mode:"development",   //开发环境development,生产环境production,
   devServer:{
       port:9000,
       proxy:{
           "/api":{
               target:"http://www.baidu.com",
               changeOrigin:true,
               pathRewrite:{
                    "^/api":""
               }
           }
       }
   },
   resolve:{
       alias:{
           "@":resolve(__dirname,'./src')
       },
       extensions:[".js",".json",'.vue','.css']
   }
}