---
title: 前端随笔——Form的原生部件
date: 2019-06-02 21:43:00
tags:
  - HTML
categories:
  - 总结
toc: true
---

# 前言
最近在学Chrome的扩展，在写单选框的时候突然忘了 radio 怎么合并成一个组。。。组件库用多了基本的HTML标签都忘了。
然后就去MDN上查。发现了两个个没见过的标签`<fieldset>` `<legend>`。

看了下文档，原来`<fieldset>`用于对`<form>`中的控制元素分组，`<legend>`用于表示其父元素内容的标题。

###### 用法如下
```html
<!-- 使用 fieldset, legend, and label 的表单 -->
<form action="" method="post">
  <fieldset form="options" name="selectArea">
        <legend>选择区域</legend>
            <label><input name="open" type="radio" checked value="1">开启</label>
            <label><input name="open" type="radio" value="0">关闭</label>
        </fieldset>
</form>
```
###### 效果如下
 <fieldset form="options" name="selectArea">
    <legend>选择区域</legend>
    <label><input name="open" type="radio" checked value="1">开启</label>
    <label><input name="open" type="radio" value="0">关闭</label>
</fieldset>

mmp，看得我十分郁闷。想当年要实现这样的边框效果，得在外面套个`<div>`再搞个`<span>`设置绝对定位.这一个`<fieldset>`套一个`<legend>`还不用css。
# 正文
## 原生部件
### input
#### type="text"
这个和`type="password"`应该是最常用到的，就不用多说了.
#### type="email"
浏览器会对`type`设置为`email`的`<input>`标签进行检查，是否符合邮件地址的格式，在显示上于`type="text"`的input标签没有什么区别。
#### type="search"
`type`设置为`search`的`<input>`标签在输入值后会在右边显示一个`X`号用于清空内容。除此之外，在显示上于`type="text"`的input标签没有什么区别。

**tips: 在IE11, Chrome, EDGE会显示`X`号。而FireFox始终不会显示**
#### type="tel"
MDN的文档说因为世界范围内存在各种各样的电话号码格式，所以对type为tel的`<input>`不会做任何限制。在显示上于`type="text"`的input标签没有什么区别。

建议最好在需要的地方设置为`tel`，因为在移动设备上可能会出现专门用于输入电话号码的虚拟键盘，个人感觉能**显著提升用户体验**（九宫格的数字键盘好方便😂）。
#### type="url"
浏览器会对`type`设置为`url`的`<input>`标签进行检查，是否符合url的格式，在显示上于`type="text"`的input标签没有什么区别。
#### type="number"
浏览器会对`type`设置为`number`的`<input>`标签进行检查，只允许输入浮点树，右侧有按钮用来控制增加/减少值。
```html
<fieldset form="options" name="Number">
    <legend>Number</legend>
    <label><input type="number" name="age" id="age" step="2"></label>
</fieldset>
```
<fieldset form="options" name="Number">
    <legend>Number</legend>
    <label><input type="number" name="age" id="age" step="2"></label>
</fieldset>

#### type="range"
通过把`type`设置为`range`可以创建一个滑块。之后需要设置`max`，`min`，`step`三个属性，分别控制最大最小值和步长。
```html
<fieldset form="options" name="Range">
    <legend>Range</legend>
    <label><input type="range" name="beans" id="beans" min="0" max="500" step="10"></label>
</fieldset>
```
<fieldset form="options" name="Range">
    <legend>Range</legend>
    <label><input type="range" name="beans" id="beans" min="0" max="500" step="10"></label>
</fieldset>

顺便看一下各个浏览器对`range`的默认样式。

* 只有IE11提供了确切数字的显示。
* 微软的两款浏览器的默认样式明显好看一点
* Chrome对默认样式是最不上心的（所有部件的默认样式都这样。。。）
  ![](https://user-gold-cdn.xitu.io/2019/5/14/16ab427da35a6193?w=531&h=254&f=png&s=9159)

### type="datatime-local/month/time/week/data"
目前Chrome，Edge，Opera支持全部的日期选择器类型，`FireFox 66.0.3`支持`time`和`date`,IE系列全部不支持。

EDGE正是微软亲儿子，几乎所有部件EDGE的默认样式是最好看。😂
```html
<fieldset form="options" name="DateTime">
    <legend>DateTime</legend>
    <label><input type="datetime-local" name="datetime" id="datetime"></label>
    <label><input type="month" name="month" id="month"></label>
    <label><input type="time" name="time" id="time"></label>
    <label><input type="week" name="week" id="week"></label>
    <label><input type="date" name="date" id="date"></label>
</fieldset>
```
<fieldset form="options" name="DateTime">
    <legend>DateTime</legend>
    <label><input type="datetime-local" name="datetime" id="datetime"></label>
    <label><input type="month" name="month" id="month"></label>
    <label><input type="time" name="time" id="time"></label>
    <label><input type="week" name="week" id="week"></label>
    <label><input type="date" name="date" id="date"></label>
</fieldset>

#### type="color"
拾色器，这个除了IE其他浏览器都支持了，不用兼容IE的话可以用一下。
```html
<fieldset form="options" name="Color">
    <legend>Color</legend>
    <label><input type="color" name="color" id="color"></label>
</fieldset>
```
<fieldset form="options" name="Color">
    <legend>Color</legend>
    <label><input type="color" name="color" id="color"></label>
</fieldset>

附上EDGE美图一张，其他浏览器都是调用windows内置的拾色器，只有EDGE是内置在浏览器里的。
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab43efadad56a0?w=302&h=294&f=png&s=6158)
#### type="file"
不多说，都用过吧。
#### type="image"
这属性真的是看得我一脸懵逼。设置为`image`并把`src`设置为图片路径，然后点击图片会发送点击位置相对于左上角的坐标。我真的不知道这是做什么用的。
```html
<fieldset form="options" name="Image">
    <legend>Image</legend>
    <label><input type="image" alt="Click me!" src="images/icon.png" width="80" height="30" /></label>
</fieldset>
```
<fieldset form="options" name="Image">
    <legend>Image</legend>
    <label><input type="image" alt="Click me!" src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" width="80" height="30" /></label>
</fieldset>

### select
关于select其实用的也是比较多的，就说一下`<optgroup>`。

`<optgroup>`用于给`<select>`内的`<option>`分组。
```html
<fieldset form="options" name="SelectGroups">
    <legend>SelectGroups</legend>
    <label for="groups"></label>
    <select id="groups" name="groups">
        <optgroup label="fruits">
            <option>Banana</option>
            <option selected>Cherry</option>
            <option>Lemon</option>
        </optgroup>
        <optgroup label="vegetables">
            <option>Carrot</option>
            <option>Eggplant</option>
            <option>Potato</option>
        </optgroup>
    </select>
</fieldset>
```
<fieldset form="options" name="SelectGroups">
    <legend>SelectGroups</legend>
    <label for="groups"></label>
    <select id="groups" name="groups">
        <optgroup label="fruits">
            <option>Banana</option>
            <option selected>Cherry</option>
            <option>Lemon</option>
        </optgroup>
        <optgroup label="vegetables">
            <option>Carrot</option>
            <option>Eggplant</option>
            <option>Potato</option>
        </optgroup>
    </select>
</fieldset>

### datalist
`<datalist>`这玩意根据MDN的介绍，作用应该类似浏览器的自动提示功能。比如在第一次登录网站之后浏览器会询问是否保存账号密码。之后再次登录的话，在点击输入框后，会出现下拉单，让你选择之前保存的账号密码。

`<datalist>`是可以用于任何需要用户输入文本的部件，比如`<input>`，`<textarea>`等。

**注意：IE10以下（不包括IE10），Safari 12.1以下（不包括12.1），不受支持**
```html
<fieldset form="options" name="DataList">
    <legend>DataList</legend>
    <label><input type="text" name="myFruit" id="myFruit" list="mySuggestion"></label>
    <datalist id="mySuggestion">
        <option>Apple</option>
        <option>Banana</option>
        <option>Blackberry</option>
        <option>Blueberry</option>
        <option>Lemon</option>
        <option>Lychee</option>
        <option>Peach</option>
        <option>Pear</option>
    </datalist>
</fieldset>
```
<fieldset form="options" name="DataList">
    <legend>DataList</legend>
    <label><input type="text" name="myFruit" id="myFruit" list="mySuggestion"></label>
    <datalist id="mySuggestion">
        <option>Apple</option>
        <option>Banana</option>
        <option>Blackberry</option>
        <option>Blueberry</option>
        <option>Lemon</option>
        <option>Lychee</option>
        <option>Peach</option>
        <option>Pear</option>
    </datalist>
</fieldset>

话说这跟单选框好像啊（挠头）。
### checkbox/radio
不多说了，应该都用过吧。
### button/input type="button"
从技术上讲，使用`<button>`元素或`<input>`元素定义的按钮几乎没有区别。唯一的区别在于`<button>`内部可以插入HTML内容而`<input type="button">`只能通过设置`value`属性插入纯文本内容。
```html
<fieldset>
<legend>Button & type="button"</legend>
<label for=“button”><label>
<button id="button" type="button">
    This an <br><strong>anonymous button</strong>
</button>

<label for=“typeButton”><label>
<input id="typeButton" type="button" value="This is an anonymous button">
</fieldset>
```
<fieldset>
<legend>Button & type="button"</legend>
<label for=“button”><label>
<button id="button" type="button">
    This an <strong>anonymous button</strong>
</button>

<label for=“typeButton”><label>
<input id="typeButton" type="button" value="This is an anonymous button">
</fieldset>

### progress
进度条
```html
<fieldset form="options" name="Progress">
    <legend>Progress</legend>
    <progress max="100" value="75">75/100</progress>
</fieldset>
```
<fieldset form="options" name="Progress">
    <legend>Progress</legend>
    <progress max="100" value="75">75/100</progress>
</fieldset>

### meter
仪表，大概作用类似于压力表之类的东西，可以通过设置最优值，然后于当前值比较，高于当前值就是红色报警什么的。

需要先设置`min`，`max`，`low`，`high`，`optimun`，`min`，`max`就是最大最小值，主要是`low`，`high`这两个值，他们把范围划分成三部分。较低范围，中等范围，较高范围。

当`optimum`的值分别在这三个范围内的情况如下，

`min < value && value < low`颜色为绿色，`low < value && value < high`颜色为黄色，`high < value && value < max`颜色为红色。
后面两张图展示了`optimun`在中等范围和较高范围时的策略。
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab457101333bd7?w=721&h=151&f=png&s=10063)
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab458408a8ed0b?w=731&h=146&f=png&s=9855)
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab459303aff264?w=718&h=148&f=png&s=9793)

**除了IE系列浏览器，其他浏览器都支持**
