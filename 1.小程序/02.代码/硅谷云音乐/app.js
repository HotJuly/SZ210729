// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
App({
    onLaunch(){
      const PageFn = Page;
      Page = function(config){
        config.myAxios = myAxios;
        config.hasPermission = hasPermission;

        // console.log(config.onShow)

        const onShow= config.onShow;
        config.onShow = function(){
          // if(!hasPermission())return;
          onShow.apply(this,arguments)
        }
        return PageFn(config)
      }
    }
})

