# Promise相关疑问总结
####导语
>promise在前端开发的一步操作方面发挥着很大的作用，很多同学在做异步请求的时候都会用到这个对象，但是这个对象到底是怎么工作，估计不是所有的人都很清楚。本文猎户了几个我遇到的疑问。

##一、如何区分resolve和reject
Promise对象的状态改变，只有两种可能：从Pending变为Fulfiled和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 Resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

##二、reject和catch的关系
*1, catch和then的第二个参数一样，用来指定reject的回调，如果在then中指定了reject的操作函数，则catch不再执行，当没有指定reject的函数时，会执行catch;
*2, 另外，catch操作还会捕捉resolve方法中的异常。用法是这样：

```
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

