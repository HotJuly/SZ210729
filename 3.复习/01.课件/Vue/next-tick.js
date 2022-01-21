//callbacks数组中存储着我们传入的回调函数
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  // 将callbacks数组中的所有函数都浅拷贝一份
  const copies = callbacks.slice(0)

  //将callbacks中的内容全部清空
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    // 此处在开启微任务,无论多少个$nextTick,只会执行一次该代码
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点:
    1.多次执行nextTick,只会开启一个.then微任务
    2.nextTick通过callbacks数组,来收集所有的nextTick传入的回调函数,最终在微任务中一次性遍历执行

  响应式更新流程:
    1.开发者修改响应式属性的值
    2.触发该响应式属性的数据代理和数据劫持
    3.在数据劫持中会触发dep.notify(用于通知视图更新)
    4.dep.notify会触发wacther的update方法(用于实现视图更新)
    5.update方法中会调用queueWatcher方法
    6.queueWatcher方法中会调用nextTick方法,并将更新视图的函数做为实参传递给nextTick
*/
