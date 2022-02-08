function Compile(el, vm) {
    // "#app" || document.body, vm
    // this->com对象
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);

        /* 此处是beforeMount生命周期的执行时机 */

        // 模版编译入口
        this.init();

        // debugger
        // 这里将文档碎片中所解析结束的节点,都插入到页面中,进行显示
        // 此步操作成为挂载
        this.$el.appendChild(this.$fragment);
        // debugger

        /* 此处是mounted生命周期的执行时机 */
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 此处在把el中所有的元素都转移到文档碎片中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        // this->com对象
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->文档碎片
        // this->com对象

        // childNodes中存储这当前元素中所有的子节点组成的伪数组
        // childNodes=[text节点,p节点,text节点]

        // 第二次进入:
        //         com.compileElement(p元素);
        // childNodes=>[text节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [text节点,p节点,text节点].forEach(function(node) {
        //      第一次进入:node->p节点
        //      text->"{{msg}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(p节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (p元素.childNodes && p元素.childNodes.length) {
        //         com.compileElement(p元素);
        //     }
        // });
    },

    compile: function(node) {
        //         com.compile(p节点);
        // node.attributes返回的是当前p节点身上所有的标签属性节点组成的伪数组
        var nodeAttrs = node.attributes,
            me = this;

        // console.log('nodeAttrs',nodeAttrs);

        [].slice.call(nodeAttrs).forEach(function(attr) {
            // attrName->v-on:click
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                // exp->"handleClick"
                var exp = attr.value;
                // dir->on:click
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // compileUtil.eventHandler(p节点,vm, "handleClick", "on:click");
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
//         com.compileText(text节点, "msg");
        compileUtil.text(node, this.$vm, exp);

        // compileUtil.text(text节点, vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm, "msg");
        this.bind(node, vm, exp, 'text');

        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // 小总结:模版中每具有一个插值表达式,就会执行一次bind函数
        // this.bind(text节点, vm, "msg", "text");
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        /* 小总结:
            1.每次执行bind都会生成一个watcher对象
            2.模版中每具有一个插值表达式,就会生成一个对应的watcher对象
        */ 
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
            // this->vm, "hello atguigu", "hello mvvm"
        //     textUpdater && textUpdater(text节点, "hello atguigu", "hello mvvm");
        // });
        
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // compileUtil.eventHandler(p节点,vm, "handleClick", "on:click");
        // eventType->"click"
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // com._getVMVal(vm, "msg")
        // 假设exp=person.msg
        var val = vm._data;

        // exp = ["person","msg"];
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
            // 此处会触发数据劫持
            // val = vm._data["person"];
            // val = person["msg"];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // text节点, "hello mvvm"
        // 这里使用了原生DOM操作,将对应的文本节点的插值语法替换成对应的data数据

        // text节点, "hello atguigu", "hello mvvm"
        debugger
        node.textContent = typeof value == 'undefined' ? '' : value;
        debugger
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};