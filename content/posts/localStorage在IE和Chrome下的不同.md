---
title: localStorage在IE和Chrome下的不同
date: 2019-08-10 15:03:36
tags:
  - IE兼容
categories:
  - 兼容
toc: true
---

# localStorage在IE和Chrome下的不同

## 前言
目前要求是兼容到IE10,还算好,IE8+都可以支持local/sessionStorage.

## 在localStorage上重定义setItem
这个需求貌似很频繁,下面是网上流传的一段代码.
>   ```javascript
>   var orignalSetItem = localStorage.setItem;
>   localStorage.setItem = function(key,newValue){
>         var setItemEvent = new Event("setItemEvent");
>         setItemEvent.newValue = newValue;
>         window.dispatchEvent(setItemEvent);
>         orignalSetItem.apply(this,arguments);
>   }
>   ```
>
>   (很明显original拼错了)

在Chrome上(准确的说在非IE上),这是没问题的,通过重写setItem方法来监听localStorage的变化.

但是在IE上,它会将`setItem`当做key,把重写的方法的字符串形式当做值写入localStorage中.
结果就变成这样了.
```
localStorage: {
    'setItem': 'function(key,newValue){var setItemEvent = new Event("setItemEvent")...}'
}
```
之后如果你调用`localStorage.setItem()`IE会报错.

当然IE是肯定会报错的,因为你已经覆盖了localStorage的setItem方法,但是setItem这个属性的值却是一个字符串.把字符串当做函数执行怎么可能不报错.

### IE11的解决方法
如果对js的原型有点了解,又把localStorage用console打印出来看过.就知道setItem方法其实是绑定在localStorage的原型上的.那么我们只要覆盖原型上的setItem就行了.很简单加个__proto__就行了.

实例如下.
```javascript
var originalSetItem = localStorage.setItem;
localStorage.__proto__.setItem = function(key,newValue){
      var setItemEvent = new Event("setItemEvent");
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      originalSetItem.apply(this,arguments);
}
```

但是这只是IE11的方案,在IE10及以下,是没有__proto__这个属性的,那么上面的方法就完全不可行了.

### 兼容IE8+的方案

目前能想到且能实现的有两种方案.
1. 在localStorage对象外包裹一层,隐藏localStorage原生方法.
2. 将setItem方法以字符串形式存入localStorage中,使用时用eval()方法转换为可执行的方法然后再执行.
