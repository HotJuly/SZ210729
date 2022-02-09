function filterAsyncRoutes(routeNames, asyncRoutes) {
    // 最终需要返回一个当前账号能访问的完整的路由数组
    
    return asyncRoutes.filter((routeObj) => {

        if(routeObj.children?.length){
            routeObj.children = filterAsyncRoutes(routeNames, routeObj.children)
        }

        return routeNames.includes(routeObj.name)
    })
}

export default filterAsyncRoutes;