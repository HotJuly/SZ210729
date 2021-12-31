import {SETINDEXDATAMUTATION} from '../mutation-types.js'

const state = {
	initData:"我是初始化数据",
	indexData:{}
}

const mutations={
	[SETINDEXDATAMUTATION](state,data){
		state.indexData = data
	}
}

const actions={
	async getIndexData(context){
		// 此处this是store对象,this._vm是组件实例对象
		// console.log('getIndexData this',this._vm.myAxios)
		const result = await this._vm.myAxios("/getIndexData");
		// console.log('result',context)
		
		// 从此处证明,action具有直接修改state的能力,但是千万别这么做
		// context.state.indexData = result
		
		context.commit(SETINDEXDATAMUTATION,result);
	}
}

const getters={
	
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}