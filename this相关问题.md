# This相关问题

> 在js编程过程中，this的指向变化太多，给开发人员的工作带来了很多的困惑，本文总结了集中JavaScript中js经常变动的情况，可供大家参考。

### 一、this存在的场合

1. 全局作用于下。

全局环境下this指向window；

···

```
this === window // true

function f() {
  console.log(this === window); // true
}
```

···

2. 构造函数中。

* 【嵌套时】构造函数中，this指向构造函数的实例对象，但是当构造函数中存在嵌套的方法时候，这时 `this`只是指向当前一层的对象，而不会继承更上面的层，看例子：

···

```
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this);
    }
  }
};

a.b.m() // object m,也就是指向的是function m;
```

···

* 【计算时】当实例的函数参与计算后，其this也会发生指向，看例子：

···

```
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj
```

···

···

```
// 情况一
(obj.foo = obj.foo)() // window

// 情况二
(false || obj.foo)() // window

// 情况三
(1, obj.foo)() // window
```

···

可以这样理解，在 JavaScript 引擎内部，`obj`和`obj.foo`储存在两个内存地址，简称为`M1`和`M2`。只有`obj.foo()`这样调用时，是从`M1`调用`M2`，因此`this`指向`obj`。但是，上面三种情况，都是直接取出`M2`进行运算，然后就在全局环境执行运算结果（还是`M2`），因此`this`指向全局环境。

* 【赋值时】当实例的函数直接被赋值给其他变量时候也会发生这种情况，看例子：

···

```
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined
```

···

### 二、如何尽量避免出现这种情况？

1. 避免多层this指向

2. 避免数组处理中的this指向；

3. 避免回调函数中的this指向；

4. 利用call, apply进行this绑定；

   > 参考链接：http://javascript.ruanyifeng.com/oop/this.html

   ​

   ​

