/**
 * Created by zhengcaiyun on 2017/8/11.
 */
/*
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
        console.log('第一次执行回调resolve', data);
        throw '第一次在resolve中抛出错误';
    }).then(function(data){
        console.log('第二次执行回调resolve', data);
        throw '第二次在resolve中抛出错误';
    })
    .catch(function(err){
        console.log('catch捕获的错误', err);
    });*/
/*

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

var promise = Promise.race([runAsync1(), runAsync2(), runAsync3()])
    .then(function(data){
        console.log('第一次回调: ', data);
        return 'pp';
});
console.log('promise', promise);
*/

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
