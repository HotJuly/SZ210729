/*
    node轮训机制
        node代码执行流程
            主线程代码执行结束->清空微任务队列->执行宏任务(事件轮询)
        node的事件轮询分为六个阶段,对应着6个宏任务队列
            起点:1号阶段->timers阶段
            休息区:4号阶段->poll轮询阶段(茶水间)

            注意:如果出现了中途在4号阶段休息的情况,那么当I/O操作结束之后,会先执行5号阶段中的宏任务,再回到1号阶段

            重点阶段:
                1.timers定时器阶段
                4.poll轮询阶段
                5.check查阶段


*/
// const fs = require('fs');

// 定时器的延迟时间不存在0毫秒,如果传入0毫秒,默认值会变为1毫秒
// 打印1,2是正常操作,打印2,1是因为主线程代码过少,执行时间少于1毫秒,所以到达定时器阶段的时候,该定时器还没有满足条件
// setTimeout(()=>{
//     console.log(1,'setTimeout')
// },0)

// fs.readFile('./01.原型与原型链.html',()=>{
//     console.log(3,'readFile')

//     setTimeout(()=>{
//         console.log(4,'setTimeout')
//     },0)

//     setImmediate(()=>{
//         console.log(5,'setImmediate')
//     })

// })

// setImmediate(()=>{
//     console.log(2,'setImmediate')
// })

// for (let index = 0; index < 100000; index++) {
// }


/*
    微任务
        node具有两种微任务
            1.nextTick
            2.then

        注意点:
            1.node中具有两个微任务队列,一个专属于nextTick,一个属于then
            2.在执行某个微任务队列的时候,必须清空当前微任务队列中,所有的任务,才能离开当前队列

    本身微任务在事件轮询中已经是VIP级别的存在,nextTick相当于是SVIP
    如果同时存在nextTick和then,那么优先执行所有的nextTick
*/

// Promise.resolve().then(()=>{
//     console.log('then1')
// })

// process.nextTick(()=>{
//     console.log('nextTick1')
// })

// Promise.resolve().then(()=>{
//     console.log('then2')
// })

// process.nextTick(()=>{
//     console.log('nextTick2')
// })


// Promise.resolve().then(()=>{
//     console.log('1')
    
//     Promise.resolve().then(()=>{
//         console.log('2')
//     })

//     process.nextTick(()=>{
//         console.log('3')
//     })
    
//     Promise.resolve().then(()=>{
//         console.log('4')
//     })
// })


process.nextTick(()=>{
    console.log('1')

    Promise.resolve().then(()=>{
        console.log('2')
    })

    Promise.resolve().then(()=>{
        console.log('3')
    })

    process.nextTick(()=>{
        console.log('4')
    })

})