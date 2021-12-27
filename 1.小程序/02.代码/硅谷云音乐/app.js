// app.js
import myAxios from './utils/myAxios';
Page.prototype.$myAxios = myAxios;
App({
    onLaunch(){
    }
})
console.log(Page.prototype.$myAxios)
