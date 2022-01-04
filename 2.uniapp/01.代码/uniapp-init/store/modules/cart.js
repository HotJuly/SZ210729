import {
	ADDSHOPITEMCOUNTMUTATION,
	CHANGESHOPITEMCOUNTMUTATION,
	CHANGESHOPITEMSELECTEDMUTATION,
	CHANGEALLSELECTEDMUTATION
} from '../mutation-types.js';
const state = {
	cartList: [{
			"selected": false,
			"count": 2,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1535004,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1535004,
			"sellVolume": 4001,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101761748,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575893634989,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "男式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1636062,
			"displaySkuId": 1636056,
			"productPlace": "",
			"itemSizeTableFlag": false
		},
		{
			"selected": true,
			"count": 6,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1536001,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1536001,
			"sellVolume": 3634,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101896296,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575894115275,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "女式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1634105,
			"displaySkuId": 1634104,
			"productPlace": "",
			"itemSizeTableFlag": false
		}
	]
}

const mutations = {
	[ADDSHOPITEMCOUNTMUTATION](state, goodInfo) {
		// console.log('ADDSHOPITEMCOUNTMUTATION')
		/*
			需求:当用户点击加入购物车时,需要执行对应操作
				1.如果当前商品在购物车中不存在,就将当前商品添加到购物车中
				2.如果当前商品在购物车中已经存在,将当前商品数量+1即可
		*/
		const shopItem = state.cartList.find((shopItem) => {
			return shopItem.id === goodInfo.id
		})
		if (shopItem) {
			shopItem.count += 1;
		 console.log("+1", shopItem)
		} else {
			// 因为count属性不是一个响应式属性,所以后续对他的修改页面不会重新渲染
			// goodInfo.count=1;
			// console.log(this)
			this._vm.$set(goodInfo, 'count', 1)
			state.cartList.push(goodInfo);
			console.log("=1", goodInfo)
		}
	},
	[CHANGESHOPITEMCOUNTMUTATION](state, {
		type,
		index
	}) {
		// console.log('CHANGESHOPITEMCOUNTMUTATION',type,index)
		/*
			需求:当用户点击+/-号时,从购物车中找到该商品,并做出对应操作
				1.将对应商品数量+1
				2.如果对应商品数量>1,将对应商品数量-1
					如果对应商品数量=1,将对应商品从购物车中移除
				
		*/
		const shopItem = state.cartList[index];
		if (type) {
			shopItem.count += 1
		} else {
			if (shopItem.count > 1) {
				shopItem.count -= 1
			} else {
				// state.cartList[index]=null;
				state.cartList.splice(index, 1);
			}
		}

	},
	[CHANGESHOPITEMSELECTEDMUTATION](state,index) {
		// console.log('CHANGESHOPITEMSELECTEDMUTATION',index)
		const shopItem =  state.cartList[index];
		shopItem.selected = !shopItem.selected;
	},
	[CHANGEALLSELECTEDMUTATION](state,selected) {
		// console.log('CHANGEALLSELECTEDMUTATION',selected)
		state.cartList.forEach((shopItem)=>{
			shopItem.selected=selected;
		})
	}
}

const actions = {}

const getters = {
	isSelectedAll(state){
		/*
			需求:
				如果当前购物车中所有商品都是选中状态,当前全选按钮就应该是选中状态
				如果当前购物车中有一个及以上商品是未选中状态,当前全选按钮就应该是未选中状态
				如果当前购物车中没有商品,当前全选按钮就应该是未选中状态
				返回值类型:布尔值
		*/
	   const cartList = state.cartList;
	   
	   if(!cartList.length)return false;
	   
	   const result = cartList.every((shopItem)=>{
		return shopItem.selected
	   })
	   
	   return result;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
