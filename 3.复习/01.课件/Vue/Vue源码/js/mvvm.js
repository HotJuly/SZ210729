function MVVM(options) {
    /*
        options->
            {
                el: "#app",
                data: {
                    msg: "hello mvvm",
                    person:{
                        name:"xiaoming",
                        msg:"123"
                    },
                }
            }
        
        this->vm实例对象
    */

    this.$options = options;

    // 此处的this._data其实就是Vue2中的this.$data
    var data = this._data = this.$options.data;
    // var data = this._data = this.$options.data;
    // var data = (this._data = this.$options.data);

    // me=vm
    var me = this; 

    /*
        环节一:数据代理
        代理:当开发者找代理读取数据,代理会找源对象获取数据来返回给开发者
                也就是说代理其实是个中间商,他身上没有数据,真正拥有数据的是源对象

        目的:
            数据代理会根据data中的所有属性给vm对象也添加一份相同的属性,
            当开发者需要修改/读取data中的数据时,开发者可以通过this.属性名的形式获取到data中对应的属性值

            总结:为了开发者更加方便读取data的属性值

        代理次数:2(data对象所有直系属性名的个数)
        
        其实数据代理并不是响应式原理中必不可少的一部分
            
    
    */
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });

    // Object.keys(data)可以获取到data对象身上所有直系属性名组成的数组
    // ["msg","person"].forEach(function(key) {
        // key->"msg"
    //     vm._proxy("msg");
    // });

    /*
        响应式
        需求:当某个属性的值被修改时,页面会自动展示出最新数据
        拆解:
            1.当某个属性的值被修改时
                问题:如何知道某个属性是否被修改了?
                解决:通过defineProperty可以定义访问描述符,通过访问描述符可以监视开发者对某个属性的修改

            2.页面会自动展示出最新数据
                问题:如何在页面上展示最新数据?
                解决:肯定会修改原生DOM显示的内容
                    此处需要使用到dep和watcher之间的映射关系,来控制页面更新

        准备工作:
            1.每个插值表达式都会创建一个wacther对象
            2.在创建watcher对象的时候,会实现对dep以及watcher两者之间的映射关系收集
                -watcher的get方法中,将Dep.target赋值为当前watcher
                -watcher获取当前最新的表达式结果的时候,会触发对应的响应式属性的get方法
                -在get方法中,由于当前Dep.target中存着watcher对象,所以开始执行dep.depend方法
                -在dep.depend方法中,会触发watcher的addDep方法,用于收集与当前watcher相关的所有dep对象
                -同时触发dep的addSub方法,用于收集与当前dep相关的所有watcher对象

        响应式流程:
            1.当开发者执行vm.msg=123时,会触发Vue的数据代理的set方法
            2.数据代理的set方法会触发数据劫持的set方法
            3.数据劫持的set方法会触发dep.notify方法,通知视图进行更新
            4.notify方法中,遍历dep的subs数组,并调用数组中所有的watcher对象的update方法
            5.update方法中,调用watcher对象的cb回调函数
            6.cb回调函数中调用对应节点的更新函数,实现节点更新

        
        Vue1.0更新页面的最小单位:标签
        Vue2.0更新页面的最小单位:组件

        Vue1.0每个插值语法都会具有一个对应的watcher对象
        Vue2.0每个组件都会具有一个对应的watcher对象

        从更新的精准度来说,感觉Vue1.0的更新更加精准,Vue2.0很可能产生误杀的情况
        其实,Vue1.0的模式适合小型项目,Vue2.0的模式更适合中型项目
        而且Vue2.0具有diff算法和虚拟DOM,二次提高了渲染的效率(解决了误杀的情况)
    
    */

    /*
        环节二:数据劫持
        劫持:绑架某个人,强迫这个做他不想做的事情,限制他的人生自由

        目的:
            用于实现响应式功能中的1功能,用来将data中所有的属性都变成响应式属性,实现对开发者修改属性值操作的监视效果
            当开发者修改某个响应式属性的值时,会通知Vue更新视图

        次数:4(data对象中直系/间接属性的个数)

        流程:
            1.调用observe方法,开始进行数据劫持
            2.observe方法中会判断当前传入的数据是不是一个对象,如果是一个对象,对其进行数据劫持
            3.创建ob实例对象,并调用ob的walk方法
            4.在walk方法中会对data对象所有的直系属性进行遍历操作,并调用defineReactive
            5.在defineReactive中
                -会生成对应的dep对象(对首次渲染没有任何作用)
                -会将当前准备进行数据劫持的属性的值传入observe方法中,如果value值是个对象就会继续进行深度遍历回到流程1
                -重写data对象身上的当前属性,变成访问描述符(将原先的value属性替换成get/set方法)
                    如果有人读取该属性的值会返回当前属性的原属性值(此处通过闭包来实现对原属性值的保留)
                    如果有人设置该属性
                        -如果设置的新属性值等于原先的属性值,那么此次设置会被无视(类似于函数节流)
                        -如果设置的新属性值是一个对象,会对该对象内部所有的属性进行深度数据劫持
                        -最终,通知视图进行更新

        问题:请问数组是不是对象?
        回答:是(数组的属性名是下标->所谓的数字)

        问题:数组的下标能不能被进行数据劫持?
        回答:能被进行数据劫持
            Vue1.0中会劫持数组的下标变为响应式
            Vue2.0中不会劫持数组的下标,所以Vue2.0中数组的下标不是响应式的

        问题:Vue2.0中,为什么不劫持数组的下标,将其变成响应式属性
        回答:尤大大认为,开发者放入数组的数据一般体积非常庞大,但是开发者一般不会频繁修改下标对应的结果
            但是为了防止用户可能出现某些特定需要,需要修改数组的下标内容,
            所以Vue2.0中将数组的7种可以操作数组排列顺序的方法进行了重写
                例如:push,pop,shift,unshift,splice,sort,reverse
                    当开发者调用这7个方法,Vue就会自动更新视图

                注意:其实Vue2是将data对象中所有的数组的隐式原型指向修改成了某个特殊的对象,该对象具有被重写之后的7种数组方法
                        该对象的隐式原型会指向Array的原型对象
                    也就是说,Vue2提供的7种数组的方法,只有data中的数组才能使用,对非data的数组没有效果

        问题:Vue2.0中,数组的下标不会被进行数据劫持,那么数组中的对象的属性会不会被数据劫持?
        回答:Vue2.0虽然不会对数组的下标进行数据劫持,但是他会对数组中的对象的属性进行深度数据劫持
    */
    
    observe(data, this);
    // observe(this._data, vm);

    /*
        环节三:模版解析
        目的:将模版中的Vue指令或者插值语法进行解析,得到对应效果
        流程(首次渲染):
            1.通过el属性在页面上进行查找,找到对应的模版元素($el)
            2.将$el元素中所有的直系子节点全部转移到文档碎片fragment中
            3.调用init方法,开始编译模版
            4.获取当前传入的元素进行判断
                -如果是元素节点,就获取他的所有标签属性,用于识别vue指令(例如:v-on:,v-if等)
                    如果元素节点中还具有子节点,开始深度递归,回到流程4
                -如果是文本节点,就获取他的文本内容,并判断是否具有插值语法存在
                    如果具有插值语法,就执行bind方法,对当前节点的文本内容进行替换,调换为data中对应的数据
                        在执行bind时,会生成对应的watcher对象(对于首次渲染没有任何作用)
            5.将解析完的文档碎片fragment插入到页面上,实现页面渲染(挂载)
                
    */
    this.$compile = new Compile(options.el || document.body, this)
    // this.$compile = new Compile("#app" || document.body, vm)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        //     vm._proxy("msg");
        // me = vm; key="msg"
        var me = this;

        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });

        // Object.defineProperty用于定义属性
        // value和get/set不能共存
        // 当开发者读取vm.msg属性时,会触发get函数   ->console.log(this.msg)
        // 当开发者设置vm.msg属性时,会触发set函数   ->this.msg=123

        // 此处在给vm对象身上添加属性msg
        // 如果一个属性具有get/set方法,我们称该属性为访问描述符
        // Object.defineProperty(vm, "msg", {
        //     configurable: false, //不能重复定义
        //     enumerable: true, //可以遍历
        //     get: function proxyGetter() {
        //         return vm._data["msg"];
        //     },
        //     set: function proxySetter(newVal) {
        //         vm._data["msg"] = newVal;
        //     }
        // });

        // var obj = {};
        // obj.name=123;
        // Object.defineProperty(obj, "name", {
        //     configurable: false, //不能重复定义
        //     enumerable: true, //可以遍历
        //     value:123
        // });
    }
};