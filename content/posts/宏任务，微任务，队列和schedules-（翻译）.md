---
title: 宏任务，微任务，队列和schedules （翻译）
date: 2019-09-02 17:28:45
tags:
  - 深入理解JS
categories:
  - 深入理解JS
toc: true
---

[原文地址](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

如果你更喜欢看视频，[Philip Roberts](https://twitter.com/philip_roberts) 有一个视频《[great talk at JSConf on the event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ) - microtasks aren't covered》。

## 尝试一下
下面有一些JavaScript代码：
```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```
请问打印的日志会以什么顺序出现？

正确的答案：`script start`，`script end`, `promise1`, `promise2`, `setTimerout`，但是并不是所有的浏览器都会有同样的行为。

Microsoft Edge, Firefox 40, iOS Safari和desktop Safari 8.0.8会在`promise1`和`promise2`之前打印`setTimeout`。这真的很奇怪，
因为Firefox 39和Safari 8.0.7的打印顺序是正确的。

## 这为什么会发生

在理解这些之前，你需要知道事件循环如何处理任务和微任务。

每个`线程（thread）`拥有他们自己的**事件循环**，所以每个`web worker`同样拥有自己的事件循环，因此`web worker`能够独立的运行。
而同一个源下的所有窗口共享一个事件循环，因此这些窗口能够同步的进行通信。

事件循环不断的运行，它会执行任务队列里的所有任务。一个事件循环有多个任务源，事件循环会确保源内的任务的执行顺序（某些规范定义了自己的任务源，比如[`IndexedDB`](https://w3c.github.io/IndexedDB/#database-access-task-source)）,
但是在每次事件循环中由浏览器决定从哪个源中获取任务。这允许浏览器优先考虑性能敏感的任务，比如用户点击事件。

**任务**由浏览器进行安排，这有利于浏览器进入 `JavaScript/DOM` 域的内部确保这些任务有序的执行。在不同的任务执行之间，浏览器*可能*更新页面。
从一个鼠标单击到单击事件的回调需要调度一个任务，解析HTML也是如此，在上面的示例中，`setTimeout`也需要调度任务。

`setTimeout`在一个给定的延时时间之后为它的回调函数调度一个新的任务。这就是`setTimeout`在`script end`之后打印的原因，打印`script end`是第一个任务的一部分，
但是打印`setTimeout`是在另一个任务中。

**Microtasks**通常用于安排**在当前执行的脚本完成之后**要做的事情。比如对一系列动作做出响应，或者需要进行异步操作但不想负担生成一个新任务的性能损耗的情况。
在每个任务结束后，并且没有JavaScript正在执行，微任务队列就会在回调后开始执行。在微任务排队期间新添加的微任务都会被添加到微任务队列的末尾并执行。
**微任务**包括 `Mutation Observer` 回调，以及在上面的示例中的 `promise` 回调。

每当一个承诺 `promise` 完成或者它已经完成，它就会为它的回调添加一个微任务。这可以保证即使承诺立即完成，它的回调也是异步的。所以在一个已完成的 `promise` 上调用 `.then(yey, nay)` 会立即向队列里加入一个微任务。
这就是为什么 `promise1` 和 `promise2` 在 `script end` 之后打印出来，因为微任务队列必须在当前运行的脚本完成之后才会执行。同样的， `promise1` 和 `promise2` 在 `setTimeout` 之前打印是因为微任务总是在下一个任务之前被执行。

下面是一个示例可以一步一步地进行调试。
见[原文](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

### 不同地浏览器地行为有何不同？

某些浏览器执行上面的JavaScript的打印顺序是：`script start`，`script end`，`setTimeout`，`promise1`，`promise2`。这些浏览器运行 `promise` 回调在 `setTimeout` 之后。
它们的行为就像将 `promise` 回调作为一个新任务的一部分而不是一个微任务。

这是情有可原的，因为 `promise` 这个概念是来自 ECMAScript 而不是 HTML。ECMAScript 有一个类似于微任务的概念 "jobs" ，但是除了在[邮件列表](https://esdiscuss.org/topic/the-initialization-steps-for-web-browsers#content-16)中的讨论，它们的关系并不明确。
然而，普遍的共识是 `promise` 应该属于微任务队列的一部分，这有充足的理由。

将 `promise` 做为任务会导致性能问题，因为 `promise` 回调可能会因为于任务相关的事件被不必要的延迟，比如说页面渲染。它也会因为于其他任务源的相互作用而产生不确定性，而且还会破坏于其他API的交互。下面还有其他理由。

Edge浏览器将 `promise` 的回调视为微任务，WebKit 也是如此，所以我认为 Safari 最后也会将 `promise` 的回调视为微任务，而且 Firefox 43 似乎已经修复了它的行为。

## 如何判断某些东西使用的是任务还是微任务

我们可以通过观察它打印的日志相对于`Promise`和`setTimeout`的日志在控制台打印的顺序来判断，但使用这种方法的前提是浏览器的实现正确。

另一种方法是**看文档**，举个例子，[`setTimeout`的第14步](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timer-initialisation-steps)将其加入任务队列中，
而[`mutation record`排队的第5步](https://dom.spec.whatwg.org/#queue-a-mutation-record)将其加入微任务队列中。

如上所述，在 ECMAScript 规范中，微任务被称为 "jobs"，在[PerformPromiseThen的第8步](https://www.ecma-international.org/ecma-262/6.0/#sec-performpromisethen)中， `EnqueueJob` 被调用时会为一个微任务排队。

下面是一个更复杂的例子

在写这篇文章之前，我也搞不清楚这个，下面是一点html代码：
```html
<div class="outer">
  <div class="inner"></div>
</div>
``` 

给出下面的js代码，点击 `div.inner` 控制台会打印出什么？

```javascript
// 首先获取这些元素
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// 监听outer元素的属性改变的事件
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// 定义点击触发的方法
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// 添加点击事件
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```

现在给出你的答案

**提示：log可以触发多次**

示例见[原文](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

