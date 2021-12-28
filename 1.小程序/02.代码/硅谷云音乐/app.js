// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
App({
    onLaunch(){
      const PageFn = Page;
      Page = function(config){
        config.myAxios = myAxios;
        config.hasPermission = hasPermission;
        return PageFn(config)
      }
    }
})

