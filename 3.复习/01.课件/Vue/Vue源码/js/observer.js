function Observer(data) {
    // data->this._data
    // this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // data->vm._data
        // this->ob对象

        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", this._data["msg"]);
        //     ob.convert("msg", "hello mvvm");


        //     ob.convert("person", {name:"xiaoming",msg:"123"});
        // });

        
        // Object.keys({name:"xiaoming",msg:"123"}).forEach(function(key) {
        // ["name","msg"].forEach(function(key) {
        //     me.convert("name", "xiaoming");
        // });
        
    },
    convert: function(key, val) { 
        //     ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 

        // this.defineReactive(vm._data, "person", {name:"xiaoming",msg:"123"}); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 

        // this.defineReactive(vm._data, "person", {name:"xiaoming",msg:"123"}); 

        /* 小总结:
                1.每次调用defineReactive都会生成一个dep对象
                2.data中每有一个属性就会生成一个dep对象
        */
        var dep = new Dep();  

        // 如果某个属性的属性值是对象数据类型,就会继续递归该对象中所有的属性
        // 此处在进行深度数据劫持
        var childObj = observe(val);
        // var childObj = observe({name:"xiaoming",msg:"123"});
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 其实_data对象身上本来就有msg属性,但是此处在重写msg属性,会导致原先的value值丢失
        // 虽然value值会因为get/set方法导致丢失,但是Vue通过闭包的形式将原先的value值保存下来了
        // get/set与value无法共存
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {

        //          如果设置的新值等于之前的旧值,那么就不会触发后续代码
        //         if (newVal === val) {
        //             return;
        //         }

        //          将闭包中的旧值抛弃,换成新值
        //         val = newVal;

        //          如果新值的数据类型是一个对象,那么就会对该对象内部所有的属性进行深度数据劫持
        //          被数据劫持过的属性都成为响应式属性
        //         childObj = observe(newVal);
                
        //          用来通知视图进行更新
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    // observe(this._data, vm);

    // value-> {name:"xiaoming",msg:"123"}

    // !value->用于检测当前value值是否为空
    // typeof value !== 'object' -> 用于判断value是不是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);
        this.subs.push(sub);
        // 此步操作实现了dep收集到所有与之相关的watcher
        // 当前响应式属性收集到了使用到他的所有插值表达式
        // dep.subs.push(watcher);

    },

    depend: function() {
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;