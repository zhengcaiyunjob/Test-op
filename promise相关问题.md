---
typora-copy-images-to: ipic
---

# Promise相关疑问总结
#### 导语
> promise 在前端开发的一步操作方面发挥着很大的作用，很多同学在做异步请求的时候都会用到这个对象，但是这个对象到底是怎么工作，估计不是所有的人都很清楚。本文列举了几个我遇到的疑问。

## 一、如何区分 resolve 和 reject
Promise 对象的状态改变，只有两种可能：从 Pending 变为 Fulfiled 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 Resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 二、reject 和 catch 的关系
1. catch 和 then 的第二个参数一样，用来指定 reject 的回调，如果在then 中指定了 reject 的操作函数，则 catch 不再执行，当没有指定reject的函数时，会执行 catch;
2. 另外，catch 操作还会捕捉所有 resolve 方法中和reject方法中的异常。用法是这样：


```
function getNumber(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            console.log('随机生成的数字是：', num);
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;
};
getNumber()
.then(function(data){
    console.log('resolved');
    console.log(data);
})
.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});
```

3. 当存在多个then的时候，后面一个then的reject函数会捕获到前一个then的resolve或者reject的异常，一直到最后一个then的异常会被catch捕获到，下面的例子可以说明：

   ```
   getNumber()
       .then(function(data){
           console.log('第一次执行回调resolve', data);
           throw '第一次在resolve中抛出错误';
       },function(data){
           console.log('第一次执行回调reject', data);//此时resolve方法里面有异常，会触发catch;
           throw '第一次在reject中抛出错误'
       }).then(function(data){
           console.log('第二次执行回调resolve', data);
           throw '第二次在resolve中抛出错误';
       },function(data){
           console.log('第二次执行回调reject', data);//此时resolve方法里面有异常，会触发catch;
           throw '第二次在reject中抛出错误';
       })
       .catch(function(err){
           console.log('catch捕获的错误', err);
       });
   ```

   执行结果为

   ![81D9C3B4-A6F6-4E0F-BAC6-BA2C261B5800](https://ws2.sinaimg.cn/large/006tNc79ly1fiftvnkjarj30i003w759.jpg)

### 三、Promise 的 all 函数

Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。

···

```
function runAsync1(){
    console.log('runAsync1');
    return 'runAsync1';
};
function runAsync2(){
    setTimeout(function(){
        console.log('runAsync2');
    }, 1000)
    // return 'runAsync2';
};
function runAsync3(){
    console.log('runAsync3');
    return 'runAsync3';
};

var promise = Promise.all([runAsync1(), runAsync2(), runAsync3()])
    .then(function(data){
        console.log('第一次回调: ', data);
})
```

···

执行结果为： 

![186BBCED-0119-4C84-A18A-96408D3A224B](https://ws4.sinaimg.cn/large/006tNc79ly1fifueb2f6vj30lw05k3z3.jpg)



### 四、 Promise的race函数

race函数表示若有一个函数成功执行即可执行回调，但是在实际的场景中并不是当有且仅有一个成功时候就会执行回调，有的时候会执行两个或者多个才会执行回调。在race传入的所有参数列表中若有一个函数抛出异常，则不再继续往下执行。

···

```
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = 'xxxxxx';
        resolve('完成图片渲染');
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
    .race([requestImg(), timeout()])
    .then(function(results){
        console.log('resolve',results);
        console.log(results);
    })
    .catch(function(reason){
        console.log('reject', reason);
        console.log(reason);
    });
```

···

执行结果：

![DF468358-A5E7-4FC0-9605-7B44A02CC91B](https://ws1.sinaimg.cn/large/006tNc79ly1fifv0twanzj3050017t8n.jpg)

## 总结

promise的内容还远远不止这些，后续会慢慢补充...欢迎大家提出宝贵的意见；