---
title: Vue响应式踩坑
date: 2019-08-17 21:28:26
tags:
  - Vue
categories:
  - Vue
toc: true
---

# Vue响应式原理
Vue实现的响应式系统是基于`Object.definedProperty()`（还有一个类似的方法`Object.definedProperty()`，可以同时定义多个属性）的。

`Object.definedProperty()`方法可以对一个对象中的属性定义`set`和`get`方法。
1. `get`方法在访问该属性时触发，返回值即访问该属性得到的值
2. `set`方法在修改该属性值时触发

Vue的实现方法是用`Object.definedProperty`将作为Vue中data选项的JavaScript对象里面定义的所有属性都**转化**为`getter/setter`。
我们可以把它当作在原来的JS对象里定义的所有属性外面包了一层壳（是属性外面不是JS对象外面），这层壳可以监听到外部对对象属性的访问（get）和设置（set）。

###### 关于`getter/setter`
在mdn文档中对其的解释如下：
> 一个`getter`是一个获取某个特定属性的值的方法。一个`setter`是一个设定某个属性的值的方法。
> 你可以为预定义的或用户定义的对象定义`getter`和`setter`以支持新增的属性。
> 定义`getter`和`setter`的语法采用对象字面量语法。

需要注意的是，如果在一个对象里已经用`get`关键字定义了一个`getter`那么在同一个对象里就不能再出现同名的属性，
同名的属性和`getter/setter`无法共存。
```javascript
// 错误写法
let obj = {
  getterr: 'getter',  // 同名属性
  get getterr() {     // 同名getter
    return 'getter'; 
  }
};
```

从不能有同名的属性和`getter/setter`这个特性我们可以看出上文的**转化**这个词的必要性，当然这Vue文档中的原文。
通过**转化**我们大致可以想象出Vue对响应式JS对象的处理过程。
1. 将data选项中的原始JS对象里面的所有属性重命名。将其转化为内部属性，比如`inner` -> `_inner`。
2. 定义同属性名的`getter`和`setter`，因为之前的属性已经重命名了，所以这一步不会产生属性名的冲突。

示例代码：
```javascript
// 对一个对象简单的转化
// 将inner属性转化为`getter/setter`
let obj = {
  inner: true
};

let keys = Object.keys(obj);
for (let i = 0, len = keys.length; i < len; i++) {
  let v = obj[keys[i]];
  obj['_' + keys[i]] = v;
  Object.defineProperty(obj, keys[i], {
    get: () => {
      return this._inner;
    },
    set: (newV) => {
      this._inner = newV;
    }
})
}
```

### Vue用`Object.definedPropoty()`实现响应式系统存在的问题
> `Object.definedPropoty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

这个方法只能操作JS对象里的属性，对其修改或创建。同样的，我们也只能将其已定义的属性转化为上文提到的`getter/setter`。

换句话说，我们只能观测已定义的属性的改变，无法观测到JS对象里是否添加或删除里某个属性。这一点也在Vue的文档中提到了。
并且也给出了[解决方案](https://cn.vuejs.org/v2/guide/reactivity.html)。所以Vue也建议开发者将需要用到的属性预先定义在`data`选项中，
即使是先将值定义为空。

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
console.log(Vue);
</script>
